import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../actions/bookingActions";
import { saveBookingInfo } from "../../slices/bookingSlice";
import CheckoutSteps from "./CheckoutSteps";

const toISO = (val) => {
  const date = new Date(val);
  return !isNaN(date) ? date.toISOString() : null;
};

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

  const submitHandler = async (e) => {
    e.preventDefault();

    const payBtn = document.querySelector("#pay_btn");
    payBtn.disabled = true;

    if (!stripe || !elements) {
      toast("Stripe is not loaded yet.", { type: "error", position: "top-center" });
      payBtn.disabled = false;
      return;
    }

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
        payBtn.disabled = false;
      } else if (result.paymentIntent.status === "succeeded") {
        toast("Payment Success!", {
          type: "success",
          position: "top-center",
        });

        if (user && user._id) {
          localStorage.setItem("userId", user._id);
          sessionStorage.setItem("userId", user._id);
        }

        const finalBooking = {
          name: user.name,
          email: user.email,
          contact: bookingInfo.phone,
          address: bookingInfo.address,
          location: bookingInfo.city,
          station: selectedService.name,
          serviceMode: selectedService.category,
          vehicleInfo: bookingInfo.vehicle,
          appointmentDate: toISO(bookingInfo.date),
          time: bookingInfo.time,
          bookServices: [
            {
              name: selectedService.name,
              price: bookInfo.price,
              service: selectedService._id || null,
            },
          ],
          amount: bookInfo.price,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          },
          paidAt: toISO(Date.now()),
        };

        dispatch(saveBookingInfo(finalBooking));
        dispatch(createBooking(finalBooking));
        localStorage.setItem("lastBooking", JSON.stringify(finalBooking));
        sessionStorage.setItem("bookingConfirmation", JSON.stringify(finalBooking));

        navigate("/booking/success");
      } else {
        toast("Payment could not be processed. Please try again.", {
          type: "warning",
          position: "top-center",
        });
        payBtn.disabled = false;
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast("Payment failed. Please try again.", {
        type: "error",
        position: "top-center",
      });
      payBtn.disabled = false;
    }
  };

  return (
    <div className="container py-4">
      {/* Add padding here */}
      <CheckoutSteps activeStep={3} />

      <div className="row wrapper mt-4">
        <div className="col-10 col-lg-5 mx-auto">
          <form onSubmit={submitHandler} className="shadow-lg p-4 rounded">
            <h1 className="mb-4">Card Info</h1>

            <div className="form-group mb-3">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                id="card_num_field"
                className="form-control"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                id="card_exp_field"
                className="form-control"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                id="card_cvc_field"
                className="form-control"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="btn btn-primary btn-block py-3"
            >
              Pay - LKR {bookInfo?.price}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
