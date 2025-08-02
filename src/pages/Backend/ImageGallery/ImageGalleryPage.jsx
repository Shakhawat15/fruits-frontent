import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import ImageGalleryList from "../../../components/Backend/ImageGallery/ImageGalleryList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <ImageGalleryList />
      </div>
    </MasterLayout>
  );
}
