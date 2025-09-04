import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import ProductTypeList from "../../../components/Backend/ProductType/ProductTypeList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <ProductTypeList />
      </div>
    </MasterLayout>
  );
}
