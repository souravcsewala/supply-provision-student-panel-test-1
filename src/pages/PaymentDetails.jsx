import React from "react";
import jsPDF from "jspdf";
import logo from "../assets/logo.png"
import { Helmet } from "react-helmet";
const PaymentDetails = () => {

  const order = {
    courseId: {
      title: "React Development Bootcamp",
      image: "https://via.placeholder.com/600x200", 
      price: 5000,
      discountprice: 3000,
    },
    paymentStatus: "Completed",
    transactionId: "TXN1234567890",
    orderId: "ORD9876543210",
    amount: 3000,
    currency: "INR",
    createdAt: new Date().toISOString(),
  };

  const downloadPDF = () => {
    //! first of all i set the page format 
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();


     //! I Set background color
  pdf.setFillColor(203, 188, 179); 
  pdf.rect(0, 0, pdfWidth, pdfHeight, "F"); //! "F" indicates fill
  
    //!I Set  Border margin
    const borderMargin = 10;
    pdf.setLineWidth(0.5);
    pdf.rect(borderMargin, borderMargin, pdfWidth - 2 * borderMargin, pdfHeight - 2 * borderMargin);
  
    //! set  Title and logo setup
    const text = "Supply-Provision";
    pdf.setFontSize(20);
    pdf.setTextColor(200, 0, 0);
    pdf.setFont("helvetica", "bold");
  
    const titleWidth = pdf.getTextWidth(text);
    const titleY = 25;
  
    // Logo setup
    const logoX = borderMargin + 55; // Position from the left
    const logoY = titleY - 8; // Align vertically with the title
    const logoWidth = 20; // Width of the logo
    const logoHeight = 20; // Height of the logo
  
    const titleX = logoX + logoWidth + 6; // Title starts after the logo
  
    // Add logo
    const logoImage = logo; // Assuming "logo" is already imported and is a valid base64 or URL image
    pdf.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
  
    // Add title
    pdf.text(text, titleX, titleY);
  
    // Content rendering (unchanged)
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "normal");
  
    const content = [
      `Course Title: ${order.courseId.title}`,
      `Price: ${order.courseId.price} INR`,
      `Discounted Price: ${order.courseId.discountprice} INR`,
      `Payment Status: ${order.paymentStatus}`,
      `Transaction ID: ${order.transactionId || "N/A"}`,
      `Order ID: ${order.orderId}`,
      `Amount Paid: ${order.amount} ${order.currency}`,
      `Date: ${new Date(order.createdAt).toLocaleString()}`,
    ];
  
    const lineHeight = 14;
    const startY = titleY + 30;
    let currentY = startY;
  
    content.forEach((line) => {
      const lineWidth = pdf.getTextWidth(line);
      const lineX = (pdfWidth - lineWidth) / 2;
      pdf.text(line, lineX, currentY);
      currentY += lineHeight;
    });
  
    // Signature and label (unchanged)
    const signatureImage =
      "https://static.vecteezy.com/system/resources/thumbnails/023/264/092/small/fake-hand-drawn-autographs-set-handwritten-signature-scribble-for-business-certificate-or-letter-isolated-illustration-vector.jpg";
    const signatureX = (pdfWidth - 150) / 2;
    const signatureY = pdfHeight - 130;
    pdf.addImage(signatureImage, "PNG", signatureX, signatureY, 50, 50);
  
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
  

  return (
    <div className="text-center p-6 bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white min-h-screen">
        <Helmet>
            <title>PaymentDetails</title>
        </Helmet>
      <h1 className="text-2xl font-semibold">Payment Details</h1>
      <div className="order-details mt-8 p-6 bg-zinc-100 border border-zinc-400 rounded shadow dark:bg-slate-800 dark:border-slate-600">
        <h2 className="text-xl font-bold mb-4">{order.courseId.title}</h2>
        <img
          className="w-full h-[200px] mb-6 rounded"
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
          <strong>Payment Status:</strong> {order.paymentStatus}
        </p>
        <p>
          <strong>Transaction ID:</strong> {order.transactionId || "N/A"}
        </p>
        <p>
          <strong>Order ID:</strong> {order.orderId}
        </p>
        <p>
          <strong>Amount Paid:</strong> {order.amount} {order.currency}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
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
