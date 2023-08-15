import { useState, useEffect } from "react";
import axios from "axios";
import { url, setHeaders } from "../../../features/api";
import moment from "moment";

import styled from "styled-components";
const Transaction = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Order", order);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/order/?new=true`, setHeaders());
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledTransaction>
      {loading ? (
        <p>ĐANG TẢI Giao Dịch...</p>
      ) : (
        <>
          <h3>Các giao dịch gần đây</h3>
          {order?.map((oneOrder, index) => (
            <ONETransaction key={index}>
              <p>{oneOrder.shipping.name}</p>
              <p>${oneOrder.total}</p>
              <p>{moment(oneOrder.createdAt).fromNow()}</p>
            </ONETransaction>
          ))}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transaction;

const StyledTransaction = styled.div`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const ONETransaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
  background-color: violet;
  p {
    flex: 1;
  }
  &:nth-child(even) {
    background-color: green;
  }
`;
