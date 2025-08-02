import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import VideoGalleryList from "../../../components/Backend/VideoGallery/VideoGalleryList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <VideoGalleryList />
      </div>
    </MasterLayout>
  );
}
