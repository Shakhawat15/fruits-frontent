import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import PdfList from "../../../components/Backend/Pdf/PdfList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <PdfList />
      </div>
    </MasterLayout>
  );
}
