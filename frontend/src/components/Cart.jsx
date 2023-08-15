/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  decrease1ProductInCart,
  getToTalPrices,
  increase1ProductInCart,
  removeAllCart,
  removeFromCart,
} from "../features/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayButton from "./PayButton";
import { loadUser } from "../features/authSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CartItems = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const handleRemoveFromCart = (card) => {
    dispatch(removeFromCart(card));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllCart());
  };

  const handleIncreaseOne = (Item) => {
    dispatch(increase1ProductInCart(Item));
    // dispatch(getToTalPrices());
  };
  const handleDecreaseOne = (Item) => {
    dispatch(decrease1ProductInCart(Item));
    // dispatch(getToTalPrices());
  };
  var Total = 0;
  useEffect(() => {
    dispatch(getToTalPrices());
  }, [CartItems]);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const TruncateText = (text) => {
    if (text.length < 50) {
      return text;
    }
    return text.substring(0, 50) + "...";
  };

  return (
    <>
      <div className="cart-container md:ml-50 min-w-[40%]">
        <h2>TRANG GIỎ HÀNG</h2>
        {CartItems.cartItems.length == 0 ? (
          <div className="cart-empty">
            <p>GIỎ HÀNG CỦA BẠN KHÔNG CÓ GÌ HẾT</p>
            <div className="start-shopping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
              <Link to="/">Quay về Mua sắm</Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="title">
              <h3 className="product-title">Tên sản phẩm</h3>
              <h3 className="price">Giá Tiền</h3>
              <h3 className="quantity">Số Lượng</h3>
              <h3 className="total">Tổng Tiền</h3>
            </div>
            <div className="cart-items">
              {CartItems.cartItems?.map((card) => (
                <div className="cart-item" key={card._id} id="cart-item">
                  <div className="cart-product flex flex-col md:flex-row items-center md:items-start">
                    <img
                      src={card.image.url}
                      className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] mr-[30px]"
                      alt={card.name}
                    />
                    <div className="mr-[10px]">
                      <h3>{card.name}</h3>
                      <p>{TruncateText(card.desc)}</p>
                      <button onClick={() => handleRemoveFromCart(card)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fillRule="currentColor"
                          className="bi bi-x-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${card.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseOne(card)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fillRule="currentColor"
                        className="bi bi-dash-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg>
                    </button>
                    <span className="count">{card.cart1ProductQuantity}</span>
                    <button onClick={() => handleIncreaseOne(card)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fillRule="currentColor"
                        className="bi bi-plus-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    ${card.price * card.cart1ProductQuantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-cart" onClick={() => handleRemoveAll()}>
                Xoá TẤT CẢ
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Tổng Giá Tiền</span>
                  <span className="amount">
                    ${CartItems?.cartTotalAmountPrice}
                  </span>
                </div>
                <p> Tính toán thuế và phí vận chuyển tại trang thanh toán</p>
                {auth?._id ? (
                  <PayButton cardItems={CartItems.cartItems} />
                ) : (
                  <button
                    className="cart-login"
                    onClick={() => navigate("/login")}
                  >
                    Đăng Nhập để thanh toán
                  </button>
                )}
                <div className="start-shopping">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fillRule="currentColor"
                    className="bi bi-arrow-left-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                  </svg>
                  <Link to="/">Tiếp Tục Mua sắm</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
