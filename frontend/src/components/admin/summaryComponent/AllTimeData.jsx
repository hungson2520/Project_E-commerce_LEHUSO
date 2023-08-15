import { styled } from "styled-components";
import { UseSelector, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userFetch } from "../../../features/userSlice";
import { useEffect } from "react";
import { orderFetch } from "../../../features/orderSlice";
const AllTimeData = () => {
  // items là List Products
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const { ListUser } = useSelector((state) => state.users);
  const { ListOrder } = useSelector((state) => state.orders);
  console.log("LIST ORDER LÀ ::", ListOrder);
  useEffect(() => {
    dispatch(userFetch());
    dispatch(orderFetch());
  }, []);
  const totalSum = ListOrder.reduce((acc, order) => acc + order.total, 0);
  return (
    <Main>
      <h3>Tổng doanh số tích lũy</h3>
      <Info>
        <Title>Users</Title>
        <Data>{ListUser?.length}</Data>
      </Info>
      <Info>
        <Title>Products</Title>
        <Data>{items?.length}</Data>
      </Info>
      <Info>
        <Title>Orders</Title>
        <Data>{ListOrder?.length}</Data>
      </Info>
      <Info>
        <Title>Earning</Title>
        <Data>{totalSum}</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.7);
  margin-top: 15px;
  border-radius: 5px;
  padding: 10px;
  font-size: 15px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 3px;
  border-radius: 3px;
  background-color: rgba(38, 138, 240, 0.2);
  &:nth-child(even) {
    background-color: rgba(100, 100, 255, 0.2);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
