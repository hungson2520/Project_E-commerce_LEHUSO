import axios from "axios";
import { UseSelector, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { url } from "../features/api";
import authSlice from "../features/authSlice";
const PayButton = ({ cardItems }) => {
  const user = useSelector((state) => state.auth);
  const handleCheckOut = () => {
    // console.log("cardItem là:::", cardItems);
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cardItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.message));
    // if (response) {
    //   if (response.data.url) {
    //     return (window.location.href = response.data.url);
    //   }
    // }
    // return console.log(response);
  };
  return (
    <>
      <button onClick={() => handleCheckOut()}>Thanh Toán</button>
    </>
  );
};

export default PayButton;
