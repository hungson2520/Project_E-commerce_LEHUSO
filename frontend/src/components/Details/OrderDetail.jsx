/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { url, setHeaders } from "../../features/api";
import moment from "moment";
import Footer from "../Footer";

const OrderDetail = () => {
  const params = useParams();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  console.log("token", token);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/order/find/${id}`, setHeaders());
        console.log("Res là", res);
        setOrder(res.data);
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  console.log("Order là:", order);
  return (
    <StyledOrder>
      <>
        {isLoading ? (
          <p>Đang Tải Dữ Liệu Sản Phẩm</p>
        ) : (
          <div className="flex flex-col ml-50">
            <OrderContainer>
              <h2>CHI TIẾT ĐƠN HÀNG</h2>
              <br />
              <p>
                Trạng Thái Đơn Hàng:
                {order.delivery_status === "pending" ? (
                  <Pending>Đang Chờ Gửi</Pending>
                ) : order.delivery_status === "dispatched" ? (
                  <Dispatched>Đang Giao</Dispatched>
                ) : order.delivery_status === "delivered" ? (
                  <Delivered>Đã Giao!</Delivered>
                ) : (
                  "ERROR..."
                )}
              </p>
              <h3>Danh sách món hàng</h3>
              <Items>
                {order?.products?.map((prod, index) => (
                  <Item key={index}>
                    <span> Tên Món Hàng :{prod.description}</span>
                    <span>Số Lượng :{prod.quantity}</span>
                    <span>Thành Tiền : ${prod.amount_total}</span>
                  </Item>
                ))}
                <div>
                  <h3>Tổng Tiền</h3>
                  <p>${order.total}</p>
                </div>
                <div>
                  <h3>Thông Tin Giao Nhận Hàng</h3>
                  <p>Khách Hàng:{order?.shipping?.name}</p>
                  <p>Địa Chỉ:{order.shipping?.address?.city}</p>
                  <p>Email:{order.shipping?.email}</p>
                  <p>
                    Ngày Đặt Hàng:
                    {moment(order?.createdAt).format("DD/MM/YYYY HH:mm")}{" "}
                  </p>
                  {order.delivery_status === "delivered" ? (
                    <div>
                      Ngày Nhận Hàng:
                      {moment(order?.updatedAt).format("DD/MM/YYYY HH:mm")}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Items>
            </OrderContainer>
            {/* <Footer /> */}
          </div>
        )}
      </>
    </StyledOrder>
  );
};

export default OrderDetail;
const StyledOrder = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  h3 {
    margin: 15px 0 5px 0;
  }
`;

const OrderContainer = styled.div`
  max-width: 650px;
  /* height: 600px; */
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 110, 0.3) 2px 5px 20px 2px;
  border-radius: 5px;
  padding: 20px;
  flex-direction: column;
`;

const Items = styled.div`
  span {
    margin-right: 15px;
  }
  &:first-child {
    font-weight: 600;
  }
`;

const Item = styled.div`
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.2);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  max-width: 150px;
  justify-content: center;
  text-align: center;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  max-width: 150px;
  justify-content: center;
  text-align: center;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 249);
  background-color: rgb(102, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  max-width: 150px;
  justify-content: center;
  text-align: center;
`;
