import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast } from "../../../helper/FormHelper";
import MasterLayout from "../../../components/Frontend/MasterLayout/MasterLayout";
import { ToastContainer } from "react-toastify";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseURL}/news/all`, AxiosHeader);
        if (response.status === 200) {
          setNewsData(response.data.data);
        }
      } catch (error) {
        ErrorToast("Failed to fetch news data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <MasterLayout>
        <ToastContainer />
        <div className="container mx-auto p-6">
          {/* <h2 className="text-3xl font-semibold text-orange-600 mb-6">
            News Feed
          </h2> */}

          {loading ? (
            <div className="text-center py-6">
              <div className="spinner-border animate-spin h-12 w-12 border-4 border-t-4 border-yellow-500 rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData?.map((newsItem) => (
                <div
                  key={newsItem._id}
                  className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-400"
                >
                  {/* News Image */}
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={newsItem.picture}
                      alt={newsItem.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* News Title */}
                  <h3 className="text-2xl font-semibold text-orange-600 mb-3">
                    {newsItem.title}
                  </h3>

                  {/* News Description - Fixed length */}
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {newsItem.description}
                  </p>

                  {/* Read More Link */}
                  <a
                    href={newsItem.read_more_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-orange-800 font-semibold underline"
                  >
                    Read More
                  </a>

                  {/* Card Footer - Created By & Date */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaUser className="text-gray-600 mr-1" />
                      <span>{newsItem.created_by?.full_name}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-600 mr-1" />
                      <span>
                        {new Date(newsItem.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MasterLayout>
    </div>
  );
}
