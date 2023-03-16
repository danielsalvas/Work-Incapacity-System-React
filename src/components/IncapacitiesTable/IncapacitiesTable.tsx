import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import DataTable from "react-data-table-component";
import { columnsHr, columnsEmployee } from "../../helpers/dataTableColumns";
import { Props } from "../../types";

const firestore = getFirestore(firebaseApp);

const IncapacitiesTable = ({ role }: Props) => {
  const [allIncapacities, setAllIncapacities] = useState<any>();

  //Get all documents of work incapacities in the company

  useEffect(() => {
    const queryCollection = collection(firestore, "workIncapacities");
    getDocs(queryCollection).then((res) =>
      setAllIncapacities(
        res.docs.map((incapacity) => ({ ...incapacity.data() }))
      )
    );
  }, []);

  return (
    <div>
      <DataTable
        columns={role === "hrspecialist" ? columnsHr : columnsEmployee}
        data={allIncapacities}
      ></DataTable>
    </div>
  );
};

export default IncapacitiesTable;
