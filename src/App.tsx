import { useState } from "react";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
          console.log(userData);
        });
      }
    } else {
      setUser(null);
    }
  });

  return <div className="app">{user ? <Home role={user.role} /> : <Login />}</div>;
}

export default App;
