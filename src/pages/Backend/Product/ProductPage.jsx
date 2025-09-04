import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import ProductList from "../../../components/Backend/Product/ProductList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <ProductList />
      </div>
    </MasterLayout>
  );
}
