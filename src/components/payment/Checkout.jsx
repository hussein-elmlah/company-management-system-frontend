import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosInstance } from "../../axios";

const Checkout = ({  }) => {
  const [token, setToken] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();

    try {


      const response = await axiosInstance.post(
        "/payment", 
        {
          amount: 2000, 
          currency: 'usd'
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      Swal.fire("Error!", "There was an issue during checkout. Please try again.", "error");
    }
  };



  return (
    <section>
      <form onSubmit={handleCheckout}>

        <button
          type="submit"
          className="bg-primary text-white w-full mt-2 py-2 rounded-md shadow-md hover:bg-primary-dark transition duration-300"
        >
          Checkout
        </button>
      </form>
    </section>
  );
};

export default Checkout;
