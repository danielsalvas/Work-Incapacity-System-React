import { useState } from "react";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "./types";
import "./App.css";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function App() {
  const [user, setUser] = useState<any>(null);

  //Get the role function

  async function getRole(uid: string) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuQuery = await getDoc(docuRef);

    const role = docuQuery.data()?.role;
    return role;
  }

  //This function verifies the initial session by user ID

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        //It prevents an infinite
        getRole(userFirebase.uid).then((role) => {
          const userData = {
            uid: userFirebase.uid,
            email: userFirebase.email,
            role: role,
          };
          setUser(userData);
        });
      }
    } else {
      setUser(null);
    }
  });

  return <div>
    <div className="app"> {user ? <Home role={user.role} uid={user.uid} /> : <Login />}</div>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
  </div>;
}

export default App;
