import HrSpecialistView from "../../components/HrSpecialistView/HrSpecialistView";
import EmployeeView from "../../components/EmployeeView/EmployeeView";

type Props = {
  role: string;
  uid: string;
};

const Home = ({ role, uid }: Props) => {
  return (
    <div>
      {role === "hrspecialist" ? <HrSpecialistView uid={uid} /> : <EmployeeView />}
    </div>
  );
};

export default Home;
