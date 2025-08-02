import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import UserList from "../../../components/Backend/User/UserList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <UserList />
      </div>
    </MasterLayout>
  );
}
