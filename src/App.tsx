import { useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";

const auth = getAuth(firebaseApp)


function App() {
  const [user, setUser] = useState<any>(null);

  onAuthStateChanged( auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
    } else {
      setUser(null)
    }
  })

  return(
    <div>{user ? <Home /> : <Login />}</div>
  )
}

export default App;
