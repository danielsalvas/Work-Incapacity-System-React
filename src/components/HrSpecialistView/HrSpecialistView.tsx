import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import DataTable from "../IncapacitiesTable/IncapacitiesTable";

type Props = {
  uid: string;
};

const HrSpecialistView = ({uid}: Props) => {
  return (
    <div>
      <Header uid={uid} />
      <Filters />
      <DataTable />
    </div>
  )
};

export default HrSpecialistView;
