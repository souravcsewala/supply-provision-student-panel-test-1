import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Paymentstatus = () => {
  const [orders] = useState([
    {
      _id: "1",
      courseId: {
        title: "React Basics",
        image: "",
        price: 1000,
        discountprice: 800,
      },
      paymentStatus: "paid",
    },
    {
      _id: "2",
      courseId: {
        title: "Advanced JavaScript",
        image: "",
        price: 1200,
        discountprice: 1000,
      },
      paymentStatus: "failed",
    },
    {
      _id: "3",
      courseId: {
        title: "CSS for Beginners",
        image: "",
        price: 800,
        discountprice: 600,
      },
      paymentStatus: "pending",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="text-center p-6 bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white min-h-screen">
          <Helmet>
                <title>paymentStatus</title>
              </Helmet>
      <h1 className="text-2xl font-semibold">Payment Details</h1>

      {orders.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="orders-container mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card mb-6 p-4 bg-zinc-100 border border-zinc-400 rounded shadow w-full dark:bg-slate-800 dark:border-slate-600"
            >
              <h3 className="text-lg py-2 font-bold">{order.courseId.title}</h3>
              <img
                className="w-full h-[100px] my-3 rounded block"
                src={order.courseId.image}
                alt={order.courseId.title}
              />
              <p>
                <strong>Price:</strong> {order.courseId.price} INR
              </p>
              <p>
                <strong>Discounted Price:</strong> {order.courseId.discountprice} INR
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
             
              </p>
              <button
                className="mt-4 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => navigate(`/payment-details/${order._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paymentstatus;
