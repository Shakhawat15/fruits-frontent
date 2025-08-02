import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import DistrictList from "../../../components/Backend/District/DistricList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <DistrictList />
      </div>
    </MasterLayout>
  );
}
