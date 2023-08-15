//import styled from "@emotion/styled";
import styled from "styled-components";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDelete } from "../../../features/productsSlice";
import { useEffect } from "react";
import EditProduct from "../EditProduct";
import { orderFetch } from "../../../features/orderSlice";
import moment from "moment";
import { orderEdit } from "../../../features/orderSlice";
export default function OrderList() {
  const dispath = useDispatch();
  const { ListOrder, status } = useSelector((state) => state.orders);
  useEffect(() => {
    dispath(orderFetch());
  }, [dispath]);
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();

  console.log("List Order:::", ListOrder);
  const handleDelete = (id) => {
    dispath(productDelete(id));
    console.log(" ĐÃ XOÁ 1 PRODUCT");
  };

  const handleOrderDispatch = (id) => {
    console.log("hàm Dispatch");
    dispath(
      orderEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };
  const handleOrderDelivery = (id) => {
    console.log("hàm Delivery");
    dispath(
      orderEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };

  const rows =
    ListOrder &&
    ListOrder.map((item, index) => {
      return {
        id: item._id,
        name: item.shipping.name,

        amount: item.total,
        dstatus: item.delivery_status,
        date: moment(item.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Tên khách hàng", width: 130 },

    { field: "amount", headerName: "Tổng Tiền ($)", width: 130 },
    {
      field: "dstatus",
      headerName: "Trạng Thái Giao",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dstatus === "pending" ? (
              <Pending>Đang chờ gửi</Pending>
            ) : params.row.dstatus === "dispatched" ? (
              <Dispatched>Đang Giao</Dispatched>
            ) : params.row.dstatus === "delivered" ? (
              <Delivered>Đã Giao</Delivered>
            ) : (
              "Error"
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Ngày Đặt Hàng", width: 130 },

    {
      field: "Actions",
      headerName: "Thao Tác",
      width: 280,
      renderCell: (params) => {
        return (
          <Action>
            <DispatchButton onClick={() => handleOrderDispatch(params.row.id)}>
              DISPATCH
            </DispatchButton>
            <DeliveryButton onClick={() => handleOrderDelivery(params.row.id)}>
              DELIVERY
            </DeliveryButton>
            <ViewButton
              onClick={() => {
                navigate(`/order/${params.row.id}`);
              }}
            >
              XEM
            </ViewButton>
          </Action>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

const DispatchButton = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryButton = styled.button`
  background-color: rgb(102, 108, 255);
`;

const ViewButton = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.2);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 249);
  background-color: rgb(102, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    /**outline: none; là một thuộc tính dùng để xóa đường viền (outline) của một phần tử (element) khi nó được focus. */
    outline: none;
    padding: 3px 6px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.5;
  }
`;
