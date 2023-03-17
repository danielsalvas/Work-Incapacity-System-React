import { useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../firebase/credentials";

const firestore = getFirestore(firebaseApp);

const useUsers = () => {
  const [infoUser, setInfoUser] = useState<any>();
  //Get the info User

  const getUser = async (id: string) => {
    const docuRef = doc(firestore, `users/${id}`);
    const query = await getDoc(docuRef);

    const infoDocu = query.data();
    setInfoUser(infoDocu);
  };
  return {
    infoUser,
    getUser,
  };
  
};

export default useUsers;
