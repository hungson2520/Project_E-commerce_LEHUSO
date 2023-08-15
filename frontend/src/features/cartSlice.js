import { createSlice } from "@reduxjs/toolkit";
/**
 * Đối tượng toast là một phần quan trọng trong thư viện react-toastify
 * và cung cấp các hàm để hiển thị các thông báo tạm thời (toasts) trên giao diện người dùng của ứng dụng.
 * toast.success(message, options)
 * toast.error(message, options)
 * toast.warning(message, options)
 * toast.info(message, options): Hiển thị thông báo thông tin với nội dung message. Bạn có thể tùy chỉnh các tùy chọn (options
 */
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  // Tổng số lượng món hàng bỏ trong giỏ hàng
  cartTotalQuantity: 0,
  // Tổng số tiền trong giỏ hàng
  cartTotalAmountPrice: 0,

  // SỐ MÓN HÀNG CỦA CÙNG 1 GIỎ HÀNG
  //   cart1ProductQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Kiểm tra xem chúng ta đã thêm món hàng này vào giỏ hàng chưa
      const CheckExistItemInCart = state.cartItems.findIndex(
        (items) => items._id === action.payload._id
      );
      // Món hàng đó đã có trong giỏ hàng rồi
      if (CheckExistItemInCart >= 0) {
        // cái cart1ProductQuantity là do ta thêm vào 1 object product món hàng cụ thể từng món
        state.cartItems[CheckExistItemInCart].cart1ProductQuantity += 1;
        toast.info(`Tăng số lượng  ${action.payload.name} thành công`, {
          position: "bottom-left",
          autoClose: 500,
        });
      }
      // TỨC LÀ ĐÂY LÀ LẦN ĐẦU TIÊN MÓN HÀNG ĐƯỢC PUSH VÔ
      else {
        const TempProduct = {
          ...action.payload,
          // cái cart1ProductQuantity này là do ta thêm vô để xác định giá tiền cho dễ á
          // do ta mới thêm vô giỏ hàng cho nên mặc định nó sẽ có giá trị là 1 á
          cart1ProductQuantity: 1,
        };

        state.cartItems.push(TempProduct);
        toast.success(`Thêm ${action.payload.name} vào giỏ  thành công`, {
          position: "bottom-left",
          autoClose: 500,
        });
      }

      state.cartTotalQuantity = state.cartTotalQuantity + 1;
      state.cartTotalAmountPrice =
        state.cartTotalAmountPrice + action.payload.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartItem = state.cartItems.filter(
        (item) => item._id != action.payload._id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.warn(`Xoá ${action.payload.name} ra khỏi giỏ  thành công`, {
        position: "bottom-left",
        autoClose: 500,
      });
    },
    removeAllCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`Xoá TẤT CẢ SẢN PHẨM ra khỏi giỏ  thành công`, {
        position: "bottom-left",
        autoClose: 500,
      });
    },

    // HÀM NÀY DÙNG ĐỂ GIẢM SỐ LƯỢNG MÓN HÀNG CỦA 1 MẶT HÀNG CỤ THỂ
    decrease1ProductInCart: (state, action) => {
      const Index = state.cartItems.findIndex(
        (item) => item._id == action.payload._id
      );

      if (state.cartItems[Index].cart1ProductQuantity <= 1) {
        // toast.warn(`Không thể giảm số lượng ${action.payload.name} `, {
        //   position: "bottom-left",
        //   autoClose: 500,
        // });
        const nextCartItem = state.cartItems.filter(
          (item) => item._id != action.payload._id
        );
        state.cartItems = nextCartItem;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.warn(`Xoá ${action.payload.name} ra khỏi giỏ  thành công`, {
          position: "bottom-left",
          autoClose: 500,
        });
      } else {
        state.cartItems[Index].cart1ProductQuantity =
          state.cartItems[Index].cart1ProductQuantity - 1;
        toast.info(`Giảm số lượng  ${action.payload.name} thành công`, {
          position: "bottom-left",
          autoClose: 500,
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increase1ProductInCart: (state, action) => {
      const Index = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      state.cartItems[Index].cart1ProductQuantity += 1;
      toast.info(`Tăng số lượng  ${action.payload.name} thành công`, {
        position: "bottom-left",
        autoClose: 500,
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getToTalPrices: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, CartItem) => {
          const { price, cart1ProductQuantity } = CartItem;
          cartTotal.total = cartTotal.total + price * cart1ProductQuantity;
          cartTotal.quantity += cart1ProductQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalAmountPrice = total;
      state.cartTotalQuantity = quantity;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  removeAllCart,
  decrease1ProductInCart,
  increase1ProductInCart,
  getToTalPrices,
} = CartSlice.actions;
export default CartSlice.reducer;
