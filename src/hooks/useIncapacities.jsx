import { useEffect, useState } from "react";
import { useStore } from "../store";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../firebase/credentials";

const firestore = getFirestore(firebaseApp);

const useIncapacities = () => {

  const [loadingData, setLoadingData] = useState(true)
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

    setTimeout(() => {
      setLoadingData(false)
    }, 1500);
  }, []);
  return {
    allIncapacities,
    loadingData
  };
};

export default useIncapacities;
