import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";

export default function index() {
  return (
    <div>
      <MasterLayout>
        <div className="p-4">
          <h2 className="text-red-700">Dashboard</h2>
        </div>
      </MasterLayout>
    </div>
  );
}
