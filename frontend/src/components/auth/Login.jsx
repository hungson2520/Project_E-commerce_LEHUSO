/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router-dom";
import { OTPInput } from "./ForgetAndResetPassword/OTPInput";
import { createContext } from "react";
export const ResetPassWordContext = createContext();

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [emailReset, setEmailReset] = useState("");
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  console.log("email Reset:", emailReset);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const Navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    if (auth._id) {
      Navigate("/cart");
    }
  }, [auth._id]);
  console.log("auth", auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  return (
    <ResetPassWordContext.Provider
      value={{ emailReset, setEmailReset, otp, setOTP }}
    >
      <StyledForm>
        <h2>Đăng Nhập Vào Ecommerce LEHUSO</h2>

        <input
          type="email"
          placeholder="Nhập vào email của bạn"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setEmailReset(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Nhập vào mật khẩu của bạn"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <div className="flex flex-row">
          <button onClick={handleSubmit}>
            {" "}
            {auth.loginStatus == "pending" ? "Đang Đăng Nhập" : "Đăng Nhập"}
          </button>
          <button
            className="text-center bg-yellow-300 text-red-400"
            onClick={() =>
              //Navigate(`/forgetPassword/otp?emailReset=${emailReset}`)
              Navigate("/forgetPassword/otp", { state: { emailReset } })
            }
          >
            {" "}
            Quên Mật Khẩu
          </button>
        </div>
        {auth.loginStatus == "rejected" ? <p>{auth.loginError}...</p> : null}
      </StyledForm>
    </ResetPassWordContext.Provider>
  );
};

export default Login;
