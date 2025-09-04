import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosHeader, baseURL } from "../../../API/config";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import Loader from "../BackendMasterLayout/Loader";

const TABLE_HEAD = [
  "S.No",
  "Customer",
  "Items",
  "Total Amount",
  "Payment Type",
  "Payment Status",
  "Order Status",
  "Created At",
];

// ✅ define allowed statuses
const paymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];
const orderStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/orders/all`, AxiosHeader);
      setOrders(res.data.data || []);
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update payment status
  const updatePaymentStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `${baseURL}/orders/update/${orderId}/payment-status`,
        { payment_status: status },
        AxiosHeader
      );

      SuccessToast("Payment status updated!");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, payment_status: status } : order
        )
      );
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to update status");
    }
  };

  // ✅ Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `${baseURL}/orders/update/${orderId}/order-status`,
        { status },
        AxiosHeader
      );

      SuccessToast("Order status updated!");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to update status");
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
    else if (direction === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
  };

  const currentTableData = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none p-5 bg-gray-100 border-b border-gray-200"
      >
        <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-semibold"
            >
              Order List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See all orders with details
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-hidden px-0 pt-0">
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left border-separate border-spacing-0">
              <thead className="bg-gray-200 border-b border-gray-300 sticky top-0 z-10">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="p-4 border-b border-gray-300 bg-gray-100 text-gray-700 font-medium"
                    >
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        {head}
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4 text-gray-500"
                        />
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentTableData.map((order, index) => {
                  const isLast = index === currentTableData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200";

                  return (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className={classes}>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className={classes}>
                        {order.address?.fullname || "—"}
                        <br />
                        <span className="text-xs text-gray-500">
                          {order.address?.email}
                        </span>
                      </td>
                      <td className={classes}>
                        {order.items?.map((item) => (
                          <div key={item._id} className="mb-1">
                            {item.product_title} x {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className={classes}>
                        ৳{order.total_amount.toFixed(2)}
                      </td>
                      <td className={classes}>
                        {order.payment_type.toUpperCase()}
                      </td>

                      {/* Payment Status */}
                      <td className={classes}>
                        <select
                          value={order.payment_status}
                          onChange={(e) =>
                            updatePaymentStatus(order._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded text-sm font-medium cursor-pointer 
      ${
        order.payment_status === "Paid"
          ? "bg-green-100 text-green-700"
          : order.payment_status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : order.payment_status === "Failed"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"
      }`}
                        >
                          {paymentStatuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className={`${
                                status === "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : status === "Failed"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Order Status */}
                      <td className={classes}>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded text-sm font-medium cursor-pointer 
      ${
        order.status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "Processing"
          ? "bg-blue-100 text-blue-700"
          : order.status === "Completed"
          ? "bg-green-100 text-green-700"
          : order.status === "Cancelled"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"
      }`}
                        >
                          {orderStatuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className={`${
                                status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : status === "Processing"
                                  ? "bg-blue-100 text-blue-700"
                                  : status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : status === "Cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className={classes}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
        <Typography variant="small" color="gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
