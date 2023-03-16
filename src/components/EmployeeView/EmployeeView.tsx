import Header from "../Header/Header";
import { Props } from "../../types";

const EmployeeView = ({ role, uid }: Props) => {
  return (
    <div>
      <Header uid={uid} />
    </div>
  );
};

export default EmployeeView;
