import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import DataTable from "react-data-table-component";
import { columnsHr, columnsEmployee } from "../../helpers/dataTableColumns";
import styles from "./incapacitiesTable.module.css";
import { Props } from "../../types";

const firestore = getFirestore(firebaseApp);

const IncapacitiesTable = ({ role }: Props) => {
  const { allIncapacities } = useStore((state) => ({
    allIncapacities: state.allIncapacities,
  }));

  const { setAllIncapacities } = useStore();
  const [searchData, setSearchData] = useState(allIncapacities);

  //Get all documents of work incapacities in the company and store in the state

  useEffect(() => {
    const queryCollection = collection(firestore, "workIncapacities");
    getDocs(queryCollection).then((res) =>
      setAllIncapacities(
        res.docs.map((incapacity) => ({ ...incapacity.data() }))
      )
    );
  }, []);

  //Search Filter

  function handleFilter(e: any) {
    const searchValue = e.target.value.toLowerCase();

    const newSearchData = allIncapacities.filter((row: any) => {
      return row.employee.toLowerCase().includes(searchValue);
    });

    setSearchData(searchValue.length > 0 ? newSearchData : allIncapacities);
  }

  return (
    <div>
      <div className={styles.container__filters}>
        <div>
          <input
            className={styles.search__input}
            type="text"
            placeholder=" Search"
            onChange={handleFilter}
          />
        </div>

        <div className={styles.filtro__fechas}>Filtro de fechas</div>
      </div>
      <DataTable
        columns={role === "hrspecialist" ? columnsHr : columnsEmployee}
        data={searchData}
        pagination
      ></DataTable>
    </div>
  );
};

export default IncapacitiesTable;
