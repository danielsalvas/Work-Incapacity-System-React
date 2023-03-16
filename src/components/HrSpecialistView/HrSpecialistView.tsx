import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import IncapacitiesTable from "../IncapacitiesTable/IncapacitiesTable";

type Props = {
  uid: string;
  role: string;
};

const HrSpecialistView = ({ uid, role }: Props) => {
  return (
    <div>
      <Header uid={uid} />
      <Filters />
      <IncapacitiesTable uid={uid} role={role} />
    </div>
  );
};

export default HrSpecialistView;
