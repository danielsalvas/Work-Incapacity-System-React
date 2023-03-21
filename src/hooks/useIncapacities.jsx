import { useEffect, useState } from "react";
import { useStore } from "../store";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../firebase/credentials";

const firestore = getFirestore(firebaseApp);

const useIncapacities = () => {
  const [loadingData, setLoadingData] = useState(true);
  const { allIncapacities, searchData } = useStore((state) => ({
    allIncapacities: state.allIncapacities,
    searchData: state.searchData,
  }));
  const { setAllIncapacities, setSearchData } = useStore();

  //Get all documents of work incapacities in the company and store in the state
  useEffect(() => {
    const queryCollection = collection(firestore, "workIncapacities");
    getDocs(queryCollection).then((res) => {
      const data = res.docs.map((incapacity) => ({ ...incapacity.data() }));
      setAllIncapacities(data);
      setSearchData(data);
    });
  
    setTimeout(() => {
      setLoadingData(false);
    }, 2000);
    
  }, []);
  
  return {
    allIncapacities,
    loadingData,
    searchData,
  };
};

export default useIncapacities;
