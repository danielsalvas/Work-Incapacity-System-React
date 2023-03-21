import HrSpecialistView from "../../components/HrSpecialistView/HrSpecialistView";
import EmployeeView from "../../components/EmployeeView/EmployeeView";
import styles from './home.module.css'
import { Props } from "../../types";

const Home = ({ role, uid }: Props) => {
  
  return (
    <div className={styles.container__home}>
      {role === "hrspecialist" ? (
        <HrSpecialistView uid={uid} role={role} />
      ) : (
        <EmployeeView uid={uid} role={role} />
      )}
    </div>
  );
};

export default Home;
