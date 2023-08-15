/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToTalPrices } from "../features/cartSlice";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { url } from "../features/api";
import { setHeaders } from "../features/api";
const NavBar = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchProduct(value);
  };
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("auth.userLoaded", auth?.userLoaded);
  const [showResults, setShowResults] = useState(false); // State để kiểm soát hiển thị danh sách kết quả
  const handleFindProduct = () => {
    if (searchProduct.trim().length <= 0) {
      return alert("Bạn chưa nhập thông tin sản phẩm cần tìm kiếm!");
    }
    console.log("Click vào biểu tượng svg");
    async function FindProductByName() {
      const res = await axios.get(
        `${url}/product/query?searchText=${searchProduct}`,
        setHeaders()
      );
      // console.log(`${url}/product/query?searchText=${searchProduct}`);
      // console.log("searchText", searchProduct);
      console.log("Danh sách product tìm được", res.data);
      setSearchResults(res.data);
      setShowResults(true);
    }
    FindProductByName();
  };
  const handleBlur = () => {
    setShowResults(false); // Ẩn danh sách kết quả khi không focus vào input
  };
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h3 className="bg-white-500 min-w-[100px] translate-x-[-40px] text-xs md:text-[15px] lg:text-xl">
          WEB LEHUSO
        </h3>
      </Link>
      <div className="flex relative items-center space-x-2 translate-x-[-35px]">
        <input
          type="text"
          placeholder=" Bạn Tìm Gì..."
          className="md:w-80 sm:w-60 h-10 "
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-search cursor-pointer"
          viewBox="0 0 16 16"
          onClick={() => {
            handleFindProduct();
          }}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        {showResults && searchResults.length > 0 && (
          <div className="mt-20 relative translate-y-5 translate-x-[-8px] ">
            <ul className="absolute left-0  z-9999 mt-15 translate-y-[-40px] lg:translate-x-[-330px] xl:translate-x-[-355px] translate-x-[-215px] min-w-[180px] bg-gray-200 md:max-h-[900px] md:w-80">
              {searchResults?.map((result) => (
                <div
                  className=" flex flex-row border  border-black border-solid border-2px md:w-85 md:h-14 cursor-pointer hover:bg-gray-300 justify-between "
                  onClick={() => {
                    navigate(`/product/${result._id}`);
                    handleBlur();
                  }}
                >
                  <li className="" key={result._id}>
                    {result.name}
                  </li>
                  <img src={result.image.url} alt="" className="w-14 h-14 " />
                </div>
              ))}
            </ul>
          </div>
        )}
        {showResults && searchResults.length == 0 && (
          <ul className="absolute mt-[50px] translate-y-1 translate-x-[-8px] bg-red-100 md:max-h-[900px] md:w-80">
            không tìm thấy sản phẩm phù hợp...!
          </ul>
        )}
      </div>

      <>
        {auth?.userLoaded && (
          <Link to="/cart">
            <div className="nav-bag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {/**bag-quantity dùng để chứa số lượng trong giỏ hàng, để
        show ra có bao nhiêu món đồ bên trong giỏ hàng */}
              <span className="bag-quantity">
                <span>{cartTotalQuantity}</span>
              </span>
            </div>
          </Link>
        )}
      </>
      {auth._id ? (
        <Links>
          <div>{auth.isAdmin && <Link to="admin">Admin</Link>}</div>
          <div style={{ marginRight: "30px" }}>
            {!auth.isAdmin && (
              <Link to={`/user/${auth._id}`}>{auth?.name}</Link>
            )}
          </div>
          <div>
            {!auth.isAdmin && (
              <Link to={`/order/findAllOrder/${auth._id}`}>
                Đơn Hàng Của Tôi
              </Link>
            )}
          </div>
          <Logout
            onClick={() => {
              dispatch(logoutUser());
              toast.warn("Bạn đã đăng xuất thành công", {
                position: "bottom-left",
                autoClose: 500,
              });
              navigate("/");
              localStorage.removeItem("cartItems");
            }}
          >
            Đăng Xuất
          </Logout>
        </Links>
      ) : (
        <AuthLink className="">
          <Link
            className="min-w-[70px]  md:p-5 text-[10px] md:text-[15px] lg:text-xl"
            to="/register"
          >
            Đăng Ký
          </Link>
          <Link
            className="min-w-[70px] translate-x-[-30px]  md:p-5 text-[10px] md:text-[15px] lg:text-xl"
            to="/login"
          >
            Đăng Nhập
          </Link>
        </AuthLink>
      )}
    </nav>
  );
};
const Logout = styled.div`
  color: white;
  cursor: pointer;
`;
const AuthLink = styled.div`
  color: white;
  display: flex;
  flex-direction: row;

  cursor: pointer;
  a {
    &:last-child {
      margin-left: 10px;
    }
    color: white;
  }
`;

const Links = styled.div`
  color: white;

  display: flex;
  div {
    cursor: pointer;
    &:last-child {
      margin-left: 10px;
    }
    color: white;
  }
`;

export default NavBar;
