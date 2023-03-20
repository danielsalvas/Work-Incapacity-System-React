import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { columnsHr, columnsEmployee } from "../../helpers/dataTableColumns";
import styles from "./incapacitiesTable.module.css";
import useIncapacities from "../../hooks/useIncapacities";
import { Props } from "../../types";
import { AllIncapacities } from "../../types";
import Spinner from "../Spinner/Spinner";

const IncapacitiesTable = ({ role }: Props) => {
  const { allIncapacities, loadingData } = useIncapacities();

  const [searchData, setSearchData] = useState<AllIncapacities[]>([]);

  console.log(searchData);
  useEffect(() => {
    setSearchData(allIncapacities);
  }, []);

  //Search Filter

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.toLowerCase();

    const newSearchData = allIncapacities.filter((row: AllIncapacities) => {
      return row.employee.toLowerCase().includes(searchValue);
    });

    setSearchData(newSearchData);
  }

  return (
    <div>
      <div className={styles.container__filters}>
        <div className={styles.container__input__search}>
          <input
            className={styles.input__search}
            type="text"
            placeholder=" Search"
            onChange={handleFilter}
          />
        </div>

        <div className={styles.date__filters}>
          <div className={styles.container__input__label}>
            <label htmlFor="">From</label>
            <input type="date" />
          </div>
          <div className={styles.container__input__label}>
            <label htmlFor="">To</label>
            <input type="date" />
          </div>
          <div className={styles.button__filter}>
            <button>Filter</button>
          </div>
        </div>
      </div>
      {loadingData ? (
        <div className={styles.container__spinner}>
          <Spinner />
        </div>
      ) : (
        <DataTable
          columns={role === "hrspecialist" ? columnsHr : columnsEmployee}
          data={searchData}
          pagination
          responsive
        ></DataTable>
      )}
    </div>
  );
};

export default IncapacitiesTable;
