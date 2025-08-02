import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import DemonstrationList from "../../../components/Backend/DemonstrationType/DemonstrationTypeList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <DemonstrationList />
      </div>
    </MasterLayout>
  );
}
