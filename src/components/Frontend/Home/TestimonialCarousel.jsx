import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ErrorToast } from "../../../helper/FormHelper";
import axios from "axios";
import { AxiosHeader, baseURL } from "../../../API/config";

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3); // Default: Show 3 items
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTestimonial = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/testimonials/all`,
        AxiosHeader
      );
      setTestimonials(response.data.data);
    } catch (error) {
      ErrorToast("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const totalItems = testimonials.length;

  // Adjust visible items based on screen width
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 items
      } else {
        setVisibleItems(3); // Desktop: 3 items
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - visibleItems : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === totalItems - visibleItems ? 0 : prevIndex + 1
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000); // Change slides every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index, totalItems]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-[#49b403] mb-6 border-b-4 border-[#49b403] inline-block">
            Testimonial
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="carousel-container overflow-hidden">
            <div
              className="carousel flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${index * (100 / visibleItems)}%)`,
              }}
            >
              {/* Render Testimonials */}
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="loader"></div>
                  <span>Loading Testimonials...</span>
                </div>
              ) : (
                testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`carousel-item px-4 min-w-[100%] sm:min-w-[50%] lg:min-w-[33.3333%] mb-6`}
                  >
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl mx-auto min-h-[350px] border-b-4 border-[#49b403]">
                      <p className="text-lg sm:text-xl text-gray-700 mb-4 italic">
                        &quot;{testimonial.message}&quot;
                      </p>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.picture}
                          alt={`Client ${idx + 1}`}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-[#49b403]"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.degisnation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {/* End of Testimonials */}
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-4">
              <button
                onClick={prevTestimonial}
                className="bg-[#49b403] text-white p-3 rounded-full shadow-md hover:bg-[#368402] focus:outline-none transform hover:scale-110 transition-all absolute left-0 -translate-x-8 sm:-translate-x-12"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-[#49b403] text-white p-3 rounded-full shadow-md hover:bg-[#368402] focus:outline-none transform hover:scale-110 transition-all absolute right-0 translate-x-8 sm:translate-x-12"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
