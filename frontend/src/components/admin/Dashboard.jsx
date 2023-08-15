import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { UseSelector, useSelector } from "react-redux";
import {
  FaUser,
  FaChartBar,
  FaClipboard,
  FaStore,
  FaTachometerAlt,
} from "react-icons/fa";
const Dashboard = () => {
  const user = useSelector((state) => state.auth);
  if (!user.isAdmin) {
    return <h2> BẠN KHÔNG CÓ QUYỀN NÀY</h2>;
  }
  return (
    <StyledDashboard>
      <SideNav>
        <h3>Quick Link</h3>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "")}
          to="/admin/summary"
        >
          <FaTachometerAlt /> Summary
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "")}
          to="/admin/product"
        >
          <FaStore /> Product
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "")}
          to="/admin/order"
        >
          <FaClipboard /> Order
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "")}
          to="/admin/user"
        >
          <FaUser /> User
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    color: black;
    font-weight: 500;
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  a:hover {
    background-color: yellow;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
