import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import NewsList from "../../../components/Backend/News/NewsList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <NewsList />
      </div>
    </MasterLayout>
  );
}
