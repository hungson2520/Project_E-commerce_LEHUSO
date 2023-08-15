/**
 *
 * Xem THÊM chi tiết cách dùng table tại :https://mui.com/material-ui/react-table/#basic-table
 */
import styled from "styled-components";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDelete } from "../../../features/productsSlice";
import EditProduct from "../EditProduct";
export default function ProductList() {
  const dispath = useDispatch();
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispath(productDelete(id));
    console.log(" ĐÃ XOÁ 1 PRODUCT");
  };
  const rows =
    items &&
    items.map((item, index) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price.toLocaleString(),
        imageUrl: item.image.url,
        description: item.desc,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Têm Sản Phẩm", width: 130 },
    { field: "price", headerName: "Giá Sản Phẩm", width: 130 },
    { field: "description", headerName: "Mô Tả", width: 230 },
    {
      field: "imageUrl",
      headerName: "Ảnh",

      width: 90,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Thao Tác",
      width: 180,
      renderCell: (params) => {
        return (
          <Action>
            <ViewButton
              onClick={() => {
                navigate(`/product/${params.row.id}`);
              }}
            >
              Xem
            </ViewButton>
            <EditProduct productID={params.row.id}> SỬA</EditProduct>
            <DeleteButton onClick={() => handleDelete(params.row.id)}>
              Xoá
            </DeleteButton>
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

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
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

const DeleteButton = styled.button`
  background-color: red;
`;
const ViewButton = styled.button`
  background-color: green;
  opacity: 0.85;
`;
