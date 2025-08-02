import FarmerForm from "../../../components/Backend/BackendFarmer/AddFarmer";
import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";

export default function add() {
  return (
    <MasterLayout>
      <div className="p-4">
        <FarmerForm />
      </div>
    </MasterLayout>
  );
}
