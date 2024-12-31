import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux"; 
import logo from "../../assets/logo.png"; 

const PaymentDetails = () => {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const {fullname,accesstoken} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/order/${orderId}`, {
          headers: {
            'x-auth-token': accesstoken, 
          },
        });
        setOrder(response.data.order);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const downloadPDF = () => {
    if (!order) return;
    //! first of all i set the pdf format
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  //! set the background color
    pdf.setFillColor(203, 188, 179);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
  //! set border margin 
    const borderMargin = 10;
    pdf.setLineWidth(0.5);
    pdf.rect(borderMargin, borderMargin, pdfWidth - 2 * borderMargin, pdfHeight - 2 * borderMargin);
    //! set the title and the logo
    const text = "Supply-Provision";
    pdf.setFontSize(20);
    pdf.setTextColor(200, 0, 0);
    pdf.setFont("helvetica", "bold");

    const titleWidth = pdf.getTextWidth(text);
    const titleY = 25;

    const logoX = borderMargin + 55;
    const logoY = titleY - 8;
    const logoWidth = 20;
    const logoHeight = 20;

    const titleX = logoX + logoWidth + 6;

    const logoImage = logo; 
    pdf.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
    pdf.text(text, titleX, titleY);
 //! set the content font size 
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "normal");
  //! here are the content get from backend 
    const content = [
      `Student Name: ${fullname}`, 
      `Course Title: ${order.courseId.title}`,
      `Price: ${order.courseId.price} INR`,
      `Discounted Price: ${order.courseId.discountprice} INR`,
      `Payment Status: ${order.paymentStatus}`,
      `Transaction ID: ${order.transactionId || "N/A"}`,
      `Order ID: ${order.orderId}`,
      `Amount Paid: ${order.amount} ${order.currency}`,
      `Date: ${new Date(order.createdAt).toLocaleString()}`,
    ];

    const lineHeight = 14; //! content line space 
    const startY = titleY + 30;
    let currentY = startY;

    content.forEach((line) => {
      const lineWidth = pdf.getTextWidth(line);
      const lineX = (pdfWidth - lineWidth) / 2;
      pdf.text(line, lineX, currentY);
      currentY += lineHeight;
    });
  //! set the signature-image here 
    const signatureImage =
      "https://static.vecteezy.com/system/resources/thumbnails/023/264/092/small/fake-hand-drawn-autographs-set-handwritten-signature-scribble-for-business-certificate-or-letter-isolated-illustration-vector.jpg";
    const signatureX = (pdfWidth - 150) / 2;
    const signatureY = pdfHeight - 130;
    pdf.addImage(signatureImage, "PNG", signatureX, signatureY, 50, 50);
  //! set the lable text 
    const labelText = "Instructor of Supply Provision";
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    const labelWidth = pdf.getTextWidth(labelText);
    const labelOffset = -35;
    const labelX = (pdfWidth - labelWidth) / 2 + labelOffset;
    const labelY = signatureY + 45;

    pdf.text(labelText, labelX, labelY);

    pdf.save(`PaymentDetails_${order.orderId}.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-center p-6 bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white min-h-screen">
      <Helmet>
        <title>Payment Details</title>
      </Helmet>
      <h1 className="text-2xl font-semibold">Payment Details</h1>
      <div className="order-details mt-8 p-6 bg-zinc-100 border border-zinc-400 rounded shadow dark:bg-slate-800 dark:border-slate-600">
        <h2 className="text-xl font-bold mb-4">{order.courseId.title}</h2>
        <img
          className="w-full h-[200px] mb-6 rounded"
          src={order.courseId.image}
          alt={order.courseId.title}
        />
        <p><strong>Price:</strong> {order.courseId.price} INR</p>
        <p><strong>Discounted Price:</strong> {order.courseId.discountprice} INR</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p><strong>Transaction ID:</strong> {order.transactionId || "N/A"}</p>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Amount Paid:</strong> {order.amount} {order.currency}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
        onClick={downloadPDF}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PaymentDetails;
