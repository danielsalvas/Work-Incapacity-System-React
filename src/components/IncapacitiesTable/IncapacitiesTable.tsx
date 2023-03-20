import { useState } from "react";
import DataTable from "react-data-table-component";
import { columnsHr, columnsEmployee } from "../../helpers/dataTableColumns";
import styles from "./incapacitiesTable.module.css";
import useIncapacities from "../../hooks/useIncapacities";
import { Props } from "../../types";
import { AllIncapacities } from "../../types";

const IncapacitiesTable = ({ role }: Props) => {
  const { allIncapacities } = useIncapacities();

  const [searchData, setSearchData] = useState(allIncapacities);

  //Search Filter

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.toLowerCase();

    const newSearchData = allIncapacities.filter((row: AllIncapacities) => {
      return row.employee.toLowerCase().includes(searchValue);
    });

    setSearchData(newSearchData)
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
