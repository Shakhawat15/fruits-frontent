import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import OrderList from "../../../components/Backend/Order/OrderList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <OrderList />
      </div>
    </MasterLayout>
  );
}
