import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Payment = ({ submission, program }) => {
  async function handleToken(token) {
    const response = await axios.post(
      `https://localhost:8000/api/v1/submissions/payment/${submission._id}`,
      { token, program }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  //   console.log("Submission", submission);
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51JQSSAE3A5xlJ8z37GnGUwTZ2DC4XnObivDeNb4IxFYy70REE6L8zbbblANe8HLKWg2u3hRACtAvy5z75JNEwgDd00sZdyb0t5"
        token={handleToken}
        amount={100 * 100}
        billingAddress
        shippingAddress
        name={
          submission.researcherId.name.charAt(0).toUpperCase() +
          submission.researcherId.name.slice(1)
        }
      />
    </div>
  );
};

export default Payment;
