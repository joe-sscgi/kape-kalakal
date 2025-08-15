import { Form, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Payment";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { CheckoutPaypalTest } from "../components";

export const loader = async ({ params }) => {
  try {
    const { orderId } = params;

    if (!orderId) {
      throw new Error("No orderId provided");
    }

    const { data } = await customFetch.get(
      `/dashboard/cart/checkout/payment-dashboard/${orderId}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return json({ error: error.message }, { status: 500 });
  }
};

const PaymentDashboard = () => {
  const { order } = useLoaderData();
  console.log("Order Data:", order);
  return (
    <Wrapper>
      <section id="payment" className="payment section payment-section">
        <div className="section-title">
          <h1>Payment Dashboard</h1>
        </div>

        <div className="payment-details">
          <CheckoutPaypalTest order={order} />
        </div>
      </section>
    </Wrapper>
  );
};

export default PaymentDashboard;
