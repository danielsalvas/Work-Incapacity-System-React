import firebaseApp from "../../firebase/credentials";
import { getAuth, signOut } from "firebase/auth";
import { useStore } from "../../store";
import HrSpecialistView from "../../components/AdminView/HrSpecialistView";
import EmployeeView from "../../components/UserView/EmployeeView";

const auth = getAuth(firebaseApp);

type Props = {
  role: string;
};

const Home = ({ role }: Props) => {
  //Zustand
  const { setError } = useStore();

  //Functions

  const logOut = () => {
    signOut(auth);
    setError("");
  };

  return (
    <div>
      {role === "hrspecialist" ? <HrSpecialistView /> : <EmployeeView />}
      <button onClick={logOut}>Sign out</button>
    </div>
  );
};

export default Home;
