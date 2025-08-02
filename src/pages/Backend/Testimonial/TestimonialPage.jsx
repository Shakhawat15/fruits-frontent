import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import TestimonialList from "../../../components/Backend/Testimonial/TestimonialList";

export default function index() {
  return (
    <MasterLayout>
      <div className="p-4">
        <TestimonialList />
      </div>
    </MasterLayout>
  );
}
