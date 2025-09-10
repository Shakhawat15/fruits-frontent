import { useEffect, useState } from "react";
import MasterLayout from "../../../components/Backend/BackendMasterLayout/MasterLayout";
import { getUser } from "../../../helper/SessionHelper";
import axios from "axios";
import {
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { AxiosHeader, baseURL } from "../../../API/config";

export default function Index() {
  const userRole = getUser()?.role_id;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/dashboard/dashboard-stats`,
          AxiosHeader
        );
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const isSeller = userRole === "68b8fb8bf143996efa66acaa";

  const statsConfig = isSeller
    ? [
        {
          name: "My Fruits Listed",
          value: stats.fruitsListed,
          icon: CubeIcon,
          color: "bg-green-500",
        },
        {
          name: "Orders Received",
          value: stats.ordersReceived,
          icon: ShoppingBagIcon,
          color: "bg-orange-500",
        },
        {
          name: "Revenue Earned",
          value: `৳${stats.revenue}`,
          icon: CurrencyDollarIcon,
          color: "bg-purple-500",
        },
        {
          name: "Pending Deliveries",
          value: stats.pendingDeliveries,
          icon: TruckIcon,
          color: "bg-red-500",
        },
      ]
    : [
        {
          name: "Total Seasonal Fruits",
          value: stats.totalFruits,
          icon: CubeIcon,
          color: "bg-green-500",
        },
        {
          name: "Total Sellers",
          value: stats.totalSellers,
          icon: UsersIcon,
          color: "bg-blue-500",
        },
        {
          name: "Total Orders",
          value: stats.totalOrders,
          icon: ShoppingBagIcon,
          color: "bg-orange-500",
        },
        {
          name: "Total Revenue",
          value: `৳${stats.totalRevenue}`,
          icon: CurrencyDollarIcon,
          color: "bg-purple-500",
        },
      ];

  return (
    <div>
      <MasterLayout>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isSeller ? "Seller Dashboard" : "Admin Dashboard"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsConfig.map((stat) => (
              <div
                key={stat.name}
                className="flex items-center p-5 bg-white shadow rounded-xl"
              >
                <div
                  className={`p-3 rounded-lg text-white ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-lg font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MasterLayout>
    </div>
  );
}
