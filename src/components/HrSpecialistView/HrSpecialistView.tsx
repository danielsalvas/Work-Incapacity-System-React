import Header from "../Header/Header";
import IncapacitiesTable from "../IncapacitiesTable/IncapacitiesTable";

type Props = {
  uid: string;
  role: string;
};

const HrSpecialistView = ({ uid, role }: Props) => {
  return (
    <div>
      <Header uid={uid} />
      <IncapacitiesTable uid={uid} role={role} />
    </div>
  );
};

export default HrSpecialistView;
