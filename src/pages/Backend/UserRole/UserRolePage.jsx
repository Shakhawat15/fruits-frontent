import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import UserRoleList from "../../../components/Backend/UserRole/UserRoleList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <UserRoleList />
      </div>
    </MasterLayout>
  );
}
