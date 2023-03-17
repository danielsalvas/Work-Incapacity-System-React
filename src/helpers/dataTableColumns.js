export const columnsHr = [
    {
      name: "Employee",
      selector: (row) => row.employee,
    },
    {
      name: "Medical Diagnostic",
      selector: (row) => row.medical,
    },
    {
      name: "Application Date",
      selector: (row) => row.applicationDate,
    },
    {
      name: "Medical Unit",
      selector: (row) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row) => row.doctor,
    },
    {
      name: "Days of coverage",
      selector: (row) => row.coverageDays,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
    },
  ];

  export const columnsEmployee = [
    {
      name: "Employee",
      selector: (row) => row.employee,
    },
    {
      name: "Medical Diagnostic",
      selector: (row) => row.medical,
    },
    {
      name: "Application Date",
      selector: (row) => row.applicationDate,
    },
    {
      name: "Medical Unit",
      selector: (row) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row) => row.doctor,
    },
    {
      name: "Days of coverage",
      selector: (row) => row.coverageDays,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
    },
  ];

const now = new Date();
const day = now.getDate().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses comienzan en 0
const year = now.getFullYear().toString().slice(2);

export const formattedDate = `${day}/${month}/${year}`;
