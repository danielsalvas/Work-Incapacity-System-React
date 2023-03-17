import { useEffect } from "react";
import { useStore } from "../store";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../firebase/credentials";

const firestore = getFirestore(firebaseApp);

const useIncapacities = () => {
  const { allIncapacities } = useStore((state) => ({
    allIncapacities: state.allIncapacities,
  }));
  const { setAllIncapacities } = useStore();

  //Get all documents of work incapacities in the company and store in the state

  useEffect(() => {
    const queryCollection = collection(firestore, "workIncapacities");
    getDocs(queryCollection).then((res) =>
      setAllIncapacities(
        res.docs.map((incapacity) => ({ ...incapacity.data() }))
      )
    );
  }, []);
  return {
    allIncapacities,
  };
};

export default useIncapacities;
