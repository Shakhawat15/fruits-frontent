import TestimonialCarousel from "../../../components/Frontend/Home/TestimonialCarousel";
import MasterLayout from "../../../components/Frontend/MasterLayout/MasterLayout";

export default function AboutPage() {
  return (
    <MasterLayout>
      <section className="bg-[#f8f8f8] py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* About Us Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
              {/* Left Content */}
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#49b403] mb-6 border-b-4 border-[#49b403] inline-block uppercase">
                  About Us
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Bangladesh&apos;s 8th five-year plan emphasizes safe crop
                  production and expansion of commercial agriculture. The
                  Ministry of Agriculture has approved the Good Agricultural
                  Practices Policy, 2020, aiming to enhance the production and
                  export of high-quality crops. Various initiatives have also
                  been taken to expand agricultural exports.
                </p>
              </div>

              {/* Right Image */}
              <div className="md:w-1/2">
                <img
                  src="/1690079408_fx.jpeg"
                  alt="Agriculture Development"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24 border-t-4 border-[#49b403]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Objective of the Project (Image Right) */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-16">
            <div className="md:w-1/2">
              <img
                src="/1690079654_increase.jpeg"
                alt="Mango Production"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-[#49b403] mb-6 border-b-4 border-[#49b403] inline-block uppercase">
                Objective of the Project
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To increase the production of quality mango by 5% from the
                current status through good agricultural practices; increasing
                farmers&apos; income through exportable mango production,
                creating employment, boosting export earnings, and improving the
                rural economy.
              </p>
            </div>
          </div>

          {/* Output of the Project (Image Left) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="md:w-1/2">
              <img
                src="/1690791312_output.jpeg"
                alt="Farmers Training"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-[#49b403] mb-6 border-b-4 border-[#49b403] inline-block uppercase">
                Output of the Project
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Increased Production: Farmers will be trained in modern mango
                cultivation techniques such as bagging, pruning, training, and
                GAP production. With post-harvest techniques, mango production
                will increase by 5-10%.
                <br />
                <strong>Income Generation and Employment</strong>
              </p>
            </div>
          </div>

          {/* Other Activities (Image Right) */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-16">
            <div className="md:w-1/2">
              <img
                src="/1690079654_meeting.jpeg"
                alt="Agricultural Research"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-[#49b403] mb-6 border-b-4 border-[#49b403] inline-block uppercase">
                Other Activities
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, generates Lorem Ipsum text that looks
                reasonable and natural. This generated text is free from
                repetition, injected humor, or irrelevant words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#f0f0f0] py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel />
        </div>
      </section>
    </MasterLayout>
  );
}
