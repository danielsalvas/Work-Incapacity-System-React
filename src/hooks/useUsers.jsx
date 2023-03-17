import { useEffect } from "react";
import { useStore } from "../store";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../firebase/credentials";

const firestore = getFirestore(firebaseApp);

const useUsers = () => {
  const { allUsers } = useStore((state) => ({
    allUsers: state.allUsers,
  }));
  const { setAllUsers } = useStore();

  //Get all documents of all USERS in the company and store in the state

  useEffect(() => {
    const queryCollection = collection(firestore, "users");
    getDocs(queryCollection).then((res) =>
      setAllUsers(
        res.docs.map((user) => ({ ...user.data() }))
      )
    );
  }, []);
  return {
    allUsers,
  };
};

export default useUsers;
