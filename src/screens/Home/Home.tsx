import HrSpecialistView from "../../components/HrSpecialistView/HrSpecialistView";
import EmployeeView from "../../components/EmployeeView/EmployeeView";
import { Props } from "../../types";

const Home = ({ role, uid }: Props) => {
  return (
    <div>
      {role === "hrspecialist" ? (
        <HrSpecialistView uid={uid} role={role} />
      ) : (
        <EmployeeView uid={uid} role={role} />
      )}
    </div>
  );
};

export default Home;
