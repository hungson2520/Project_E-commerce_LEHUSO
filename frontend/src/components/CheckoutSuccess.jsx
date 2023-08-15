import { styled } from "styled-components";
import { removeAllCart, getToTalPrices } from "../features/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(removeAllCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getToTalPrices());
  }, [cart, dispatch]);
  return (
    <Container>
      <h2> Thanh Toán Thành Công!</h2>
      <p>Đơn Hàng của bạn sẽ sớm được vận chuyển thôi.</p>
      <p>Kiểm tra trạng thái đơn hàng của bạn thường xuyên để nhận hàng nhé</p>
      <p>
        Trong Trường hợp bạn cần liên hệ để cần tư vấn hãy liên hệ{" "}
        <strong>hungson2520@gmail.com</strong>
      </p>
      <p>
        Trân Trọng Cảm ơn và hy vọng bạn hài lòng với dịch vụ của chúng tôi!
      </p>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  background-color: grey;

  min-height: 600px;
  max-width: 800px;
  width: 100%;
  height: auto;
  display: flex;
  margin-left: 300px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h2 {
    margin-bottom: 10px;
    color: green;
  }
  margin: auto;
`;
