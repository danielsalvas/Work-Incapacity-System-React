import Header from "../Header/Header";
import IncapacitiesTable from "../IncapacitiesTable/IncapacitiesTable";
import { Props } from "../../types";

const EmployeeView = ({ role, uid }: Props) => {
  return (
    <div>
      <Header uid={uid} role={role} />
      <IncapacitiesTable uid={uid} role={role} />
    </div>
  );
};

export default EmployeeView;
