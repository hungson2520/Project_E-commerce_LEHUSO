/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
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
    dispatch(registerUser(user));
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Đăng Ký làm thành viên trang web TMĐT</h2>
        <input
          type="text"
          placeholder="Nhập vào tên của bạn"
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Nhập vào email của bạn"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Nhập vào mật khẩu của bạn"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        <button>
          {" "}
          {auth.registerStatus == "pending" ? "Đang Đăng Ký" : "Đăng Ký"}
        </button>

        {auth.registerStatus == "rejected" ? (
          <p>{auth.registerError}...</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;
