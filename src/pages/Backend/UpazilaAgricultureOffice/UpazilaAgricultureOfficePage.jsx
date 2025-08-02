import { lazy, Suspense } from "react";
import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import LazyLoader from "../../../components/Backend/BackendMasterLayout/LazyLoader";

const UpazilaAgricultureOfficeList = lazy(() =>
  import(
    "../../../components/Backend/UpazilaAgricultureOffice/UpazilaAgricultureOfficeList"
  )
);

export default function index() {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <div className="p-4">
          <UpazilaAgricultureOfficeList />
        </div>
      </Suspense>
    </MasterLayout>
  );
}
