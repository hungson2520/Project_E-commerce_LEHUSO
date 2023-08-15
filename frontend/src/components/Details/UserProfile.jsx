import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { url } from "../../features/api";
import { setHeaders } from "../../features/api";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../Footer";
const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [updateing, setUpdating] = useState(false);
  console.log("user là", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT FORM");
    setUpdating(true);
    try {
      const res = await axios.put(
        `${url}/user/${id}`,
        { ...user },
        setHeaders()
      );
      setUser({ ...res, password: "" });
      toast.success("Cập nhật thông tin  người dùng thành công");
    } catch (error) {
      console.log("có lỗi rồi", error);
    }
    setUpdating(false);
  };
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/user/find/${id}`, setHeaders());
        console.log("Res là", res);
        setUser({ ...res.data, password: "" });
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [id]);
  return (
    <>
      <StyledProfile>
        <UserProfileContainer>
          {isLoading ? (
            <p>Đang tải dữ liệu người dùng</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Thông Tin Khách Hàng</h3>
              {user.isAdmin ? (
                <Admin>Admin</Admin>
              ) : (
                <Customer>Khách Hàng</Customer>
              )}
              <label htmlFor="name">Tên Người Dùng:</label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" value={user.email} readOnly />
              <label htmlFor="password">Mật Khẩu:</label>
              <input
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <button>THAY ĐỔI</button>
            </form>
          )}
        </UserProfileContainer>
      </StyledProfile>
      <Footer />
    </>
  );
};

export default UserProfile;

const StyledProfile = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
`;

const UserProfileContainer = styled.div`
  max-width: 650px;
  /* height: 600px; */
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 110, 0.3) 2px 5px 20px 2px;
  border-radius: 5px;
  padding: 20px;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-bottom: 5px;
    }
    label {
      margin-bottom: 5px;
      color: gray;
    }
    input {
      border: none;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.2);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  max-width: 150px;
  justify-content: center;
  text-align: center;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  max-width: 150px;
  justify-content: center;
  text-align: center;
`;
