import { useState, useEffect } from "react";
import { useStore } from "../../store";
import DataTable from "react-data-table-component";
import styles from "./incapacitiesTable.module.css";
import useIncapacities from "../../hooks/useIncapacities";
import { Props, AllIncapacities, Column } from "../../types";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";
import Swal from "sweetalert2";
import Spinner from "../Spinner/Spinner";

const firestore = getFirestore(firebaseApp);

const IncapacitiesTable = ({ role, uid }: Props) => {
  //Zustand, states and custom hooks
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { searchApplications, error } = useStore((state) => ({
    searchApplications: state.searchApplications,
    error: state.error,
  }));

  const { allIncapacities, loadingData, searchData } = useIncapacities();
  const { setSearchData, setSearchApplications, setError } = useStore();

  //Looking for employee applications with the session started

  const employeeApplications = allIncapacities.filter(
    (row: AllIncapacities) => {
      return row.employeeId?.includes(uid);
    }
  );

  useEffect(() => {
    setSearchApplications(employeeApplications);
  }, []);

  //Search Filter

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (role === "hrspecialist") {
      const searchValue = e.target.value.toLowerCase();

      const newSearchData = allIncapacities.filter((row: AllIncapacities) => {
        return row.employee?.toLowerCase().includes(searchValue);
      });
      setSearchData(newSearchData);
    } else {
      const searchValue = e.target.value.toLowerCase();

      const newSearchData = employeeApplications.filter(
        (row: AllIncapacities) => {
          return row.medical?.toLowerCase().includes(searchValue);
        }
      );
      setSearchApplications(newSearchData);
    }
  }

  //Date Filter

  function handleDateFilter() {
    if (!(toDate === "" || fromDate === "")) {
      if (role === "hrspecialist") {
          const newSearchData = allIncapacities.filter((row: AllIncapacities) => {
          const dateObject = new Date(`20${row.applicationDate.split("/").reverse().join("-")}`);
          return (
            dateObject >= new Date(fromDate) && dateObject <= new Date(toDate)
          );
        });
        setError("");
        setSearchData(newSearchData);
      } else {
          const newSearchData = employeeApplications.filter((row: AllIncapacities) => {
          const dateObject = new Date(`20${row.applicationDate.split("/").reverse().join("-")}`);
          return (
            dateObject >= new Date(fromDate) && dateObject <= new Date(toDate)
          );
          }
        );
        setError("");
        setSearchApplications(newSearchData);
      }
    } else {
      setError("You must enter both dates");
    }
  }

  //Delete an application in screen and database in firebase

  let newData: AllIncapacities[];

  function handleDelete(applicationId: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The application has been deleted.", "success");
        if (role === "hrspecialist") {
          newData = searchData.filter(
            (application: AllIncapacities) =>
              application.applicationId !== applicationId
          );
          setSearchData(newData);
        } else {
          newData = employeeApplications.filter(
            (application: AllIncapacities) =>
              application?.applicationId !== applicationId
          );
          setSearchApplications(newData);
        }
        deleteDoc(doc(firestore, "workIncapacities", applicationId));
      }
    });
  }

  //Data table component columns and rows

  const columnsEmployee = [
    {
      name: "Medical Diagnostic",
      selector: (row: AllIncapacities) => row.medical,
    },
    {
      name: "Application Date",
      selector: (row: AllIncapacities) => row.applicationDate,
    },
    {
      name: "Medical Unit",
      selector: (row: AllIncapacities) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row: AllIncapacities) => row.doctor,
    },
    {
      name: "Days of coverage",
      selector: (row: AllIncapacities) => row.coverageDays,
    },
    {
      name: "Start Date",
      selector: (row: AllIncapacities) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row: AllIncapacities) => row.endDate,
    },
    {
      cell: (row: AllIncapacities) => (
        <button
          onClick={() => handleDelete(row.applicationId)}
          className="delete__application"
        >
          <i className="fa-sharp fa-regular fa-trash-can"></i>
        </button>
      ),
    },
  ];

  //If role is hrspecialist add new column to the data table

  let columnsHr: Column[] = [];

  if (role === "hrspecialist") {
    columnsHr = [
      {
        name: "Employee",
        selector: (row: AllIncapacities) => row.employee,
      },
      ...columnsEmployee,
    ];
  }

  return (
    <div>
      <div className={styles.container__filters}>
        <div className={styles.container__input__search}>
          <input
            className={styles.input__search}
            type="text"
            placeholder={
              role === "hrspecialist"
                ? "Search by name"
                : "Search by Medical Diagnostic"
            }
            onChange={handleFilter}
          />
        </div>

        <div className={styles.date__filters}>
          <div className={styles.container__input__label}>
            <label htmlFor="">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
            <span className={styles.dates__filter__error}>{error}</span>
          </div>
          <div className={styles.container__input__label}>
            <label htmlFor="">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.button__filter}>
            <button onClick={() => handleDateFilter()}>Filter</button>
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
          data={role === "hrspecialist" ? searchData : searchApplications}
          pagination
          responsive
        ></DataTable>
      )}
    </div>
  );
};

export default IncapacitiesTable;
