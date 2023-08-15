import { Outlet, Link, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./Commonstyled";
const Product = () => {
  const navigate = useNavigate();
  let isCreateUrl = false;
  if (window.location.pathname === "/admin/product/create") {
    isCreateUrl = true;
  }

  return (
    <>
      <AdminHeaders>
        <PrimaryButton
          onClick={() => navigate("/admin/product/create")}
          style={{ display: !isCreateUrl ? "block" : "none" }}
        >
          Create
        </PrimaryButton>
        <Outlet />
      </AdminHeaders>
    </>
  );
};

export default Product;
