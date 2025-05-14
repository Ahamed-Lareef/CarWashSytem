import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../actions/bookingActions";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookInfo = JSON.parse(sessionStorage.getItem("info"));
  const { user } = useSelector((state) => state.authState);
  const { selectedService, bookingInfo } = useSelector(
    (state) => state.bookingState
  );

  const paymentData = {
    amount: bookInfo.price,
    bookingDetail: {
      name: user.name,
      addressDetail: {
        address: bookingInfo.address,
        city: bookingInfo.city,
      },
      phone: bookingInfo.phone,
    },
  };

  const book = {
    selectedService,
    bookingInfo,
    price: bookInfo.price,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: "top-center",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast("Payment Success!", {
            type: "success",
            position: "top-center",
          });

          // Attach payment info to booking and dispatch
          dispatch(
            createBooking({
              ...book,
              paymentInfo: {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              },
            })
          );

          navigate("/booking/success");
        } else {
          toast("Please try again!", {
            type: "warning",
            position: "top-center",
          });
        }
      }
    } catch (error) {
      toast("Payment failed. Try again.", {
        type: "error",
        position: "top-center",
      });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-4">Card Info</h1>

          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
            />
          </div>

          <button id="pay_btn" type="submit" className="btn btn-block py-3">
            Pay - LKR {bookInfo?.price}
          </button>
        </form>
      </div>
    </div>
  );
}
