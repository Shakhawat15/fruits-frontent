import FarmerList from "../../../components/Backend/BackendFarmer/FarmerList";
import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <FarmerList />
      </div>
    </MasterLayout>
  );
}
