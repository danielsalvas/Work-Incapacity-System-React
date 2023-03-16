import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import DataTable from "react-data-table-component";

const firestore = getFirestore(firebaseApp);

const IncapacitiesTable = () => {
  const [allIncapacities, setAllIncapacities] = useState<any>();

  const columns = [
    {
      name: "Employee",
      selector: (row: any) => row.employee,
    },
    {
      name: "Medical Diagnostic",
      selector: (row: any) => row.medical,
    },
    {
      name: "Application Date",
      selector: (row: any) => row.applicationDate,
    },
    {
      name: "Medical Unit",
      selector: (row: any) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row: any) => row.doctor,
    },
    {
      name: "Days of coverage",
      selector: (row: any) => row.coverageDays,
    },
    {
      name: "Start Date",
      selector: (row: any) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row: any) => row.endDate,
    },
  ];

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
      <DataTable columns={columns} data={allIncapacities}></DataTable>
    </div>
  );
};

export default IncapacitiesTable;
