import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import CommentList from "../../../components/Backend/Comment/CommentList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <CommentList />
      </div>
    </MasterLayout>
  );
}
