import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import SellerList from "../../../components/Backend/Seller/SellerList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <SellerList />
      </div>
    </MasterLayout>
  );
}
