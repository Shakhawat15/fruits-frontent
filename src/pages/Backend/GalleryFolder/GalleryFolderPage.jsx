import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import GalleryFolderList from "../../../components/Backend/GalleryFolder/GalleryFolderList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <GalleryFolderList />
      </div>
    </MasterLayout>
  );
}
