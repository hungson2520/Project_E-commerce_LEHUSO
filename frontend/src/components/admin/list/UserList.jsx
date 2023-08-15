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
import { userDelete, userFetch } from "../../../features/userSlice";
import EditProduct from "../EditProduct";
import { useEffect } from "react";

export default function UserList() {
  const dispath = useDispatch();
  const { items } = useSelector((state) => state.products);
  const { ListUser } = useSelector((state) => state.users);
  useEffect(() => {
    dispath(userFetch());
  }, [dispath]);
  console.log("ListUser", ListUser);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    //dispath(userDelete(id));
  };
  const rows =
    ListUser &&
    ListUser?.map((item, index) => {
      return {
        id: item._id,
        name: item.name,
        email: item.email,
        isAdmin: item.isAdmin,

        // imageUrl: item.image.url,
        // description: item.desc,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Têm Người Dùng", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "isAdmin",
      headerName: "Vai Trò",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Khách Hàng</Customer>
            )}
          </div>
        );
      },
    },

    {
      field: "Actions",
      headerName: "Thao Tác",
      width: 120,
      renderCell: (params) => {
        return (
          <Action>
            <ViewButton
              onClick={() => {
                navigate(`/user/${params.row.id}`);
              }}
            >
              Xem
            </ViewButton>

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

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.2);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
