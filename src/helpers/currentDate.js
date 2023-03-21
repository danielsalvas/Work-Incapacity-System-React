const now = new Date();
const day = now.getDate().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses comienzan en 0
const year = now.getFullYear().toString().slice(2);

export const currentDate = `${day}/${month}/${year}`;
