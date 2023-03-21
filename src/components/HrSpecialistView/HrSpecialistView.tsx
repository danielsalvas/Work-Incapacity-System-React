import Header from "../Header/Header";
import IncapacitiesTable from "../IncapacitiesTable/IncapacitiesTable";
import { useStore } from "../../store";
import styles from "./hrspecialistview.module.css";

type Props = {
  uid: string;
  role: string;
};

const HrSpecialistView = ({ uid, role }: Props) => {
  const { modal } = useStore((state) => ({
    modal: state.modal,
  }));
  
  return (
    <div className={`${modal ? styles["fixed"] : ""}`}>
      <Header uid={uid} role={role} />
      <IncapacitiesTable uid={uid} role={role} />
    </div>
  );
};

export default HrSpecialistView;
