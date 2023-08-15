import styled from "styled-components";
import Widget from "./summaryComponent/Widget";
import { FaUser, FaChartBar, FaClipboard } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, setHeaders } from "../../features/api";
import Chart from "./summaryComponent/Chart";
import Transaction from "./summaryComponent/Transaction";
import AllTimeData from "./summaryComponent/AllTimeData";

/**
 *
 * FaUser (biểu tượng người dùng), FaChartBar (biểu tượng biểu đồ cột) và FaClipboard (biểu tượng bảng sao chép).
 */

const Summary = () => {
  function Compare(a, b) {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  }
  const [user, setUser] = useState([]);
  const [userPercentage, setUserPercentage] = useState(0);
  const [order, setOrder] = useState([]);
  const [orderPercentage, setOrderPercentage] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePercentage, setIncomePercentage] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${url}/user/statistics`, setHeaders());
      const resOrder = await axios.get(`${url}/order/statistics`, setHeaders());
      const resIncome = await axios.get(
        `${url}/order/income/statistics`,
        setHeaders()
      );
      console.log("statictics", res?.data);
      console.log("statictics ORDER", resOrder?.data);
      console.log("statictics INCOME", resIncome?.data);
      res.data.sort(Compare);
      resOrder.data.sort(Compare);
      resIncome.data.sort(Compare);
      setIncome(resIncome?.data);
      setUser(res?.data);
      setOrder(resOrder?.data);
      setUserPercentage(
        ((res?.data[1]?.total - res?.data[0]?.total) / res?.data[0]?.total) *
          100
      );
      setOrderPercentage(
        ((resOrder?.data[1]?.total - resOrder?.data[0]?.total) /
          resOrder?.data[0]?.total) *
          100
      );
      setIncomePercentage(
        ((resIncome?.data[1]?.total - resIncome?.data[0]?.total) /
          resIncome?.data[0]?.total) *
          100
      );
      console.log(
        "resIncome 1-0 ",
        resIncome?.data[1]?.total - resIncome?.data[0]?.total
      );
      console.log("resIncome 0", resIncome?.data[0]?.total);

      try {
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  const data = [
    {
      icon: <FaUser />,
      digits: user[1]?.total,
      isMoney: false,
      title: "User",
      color: "red",
      bgColor: "black",
      percentage: userPercentage,
    },
    {
      icon: <FaClipboard />,
      digits: order[1]?.total,
      isMoney: false,
      title: "Orders",
      color: "violet",
      bgColor: "white",
      percentage: orderPercentage,
    },
    {
      icon: <FaChartBar />,
      digits: income[1]?.total,
      isMoney: true,
      title: "Earning",
      color: "yellow",
      bgColor: "green",
      percentage: incomePercentage,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>So sánh số liệu tháng này và tháng trước</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats>
        <Transaction />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

/**
 * Mainstats (hoặc Main Statistics) có thể là một thuật ngữ được sử dụng trong lĩnh vực dữ liệu, số liệu thống kê, hoặc phân tích.
 *  Đây là các thông số chính hay dữ liệu thống kê quan trọng liên quan đến một hệ thống, quy trình, sản phẩm, dự án, hoặc một khía cạnh quan trọng nào đó.
 */

/**
 * Thuộc tính flex có hai giá trị quan trọng là flex-grow và flex-shrink.
 * flex: 2; được viết gọn từ hai thuộc tính flex-grow: 2; và flex-shrink: 1;.
 * 
flex-grow xác định tỷ lệ tăng kích thước của flex item so với các flex item khác trong cùng container. Trong trường hợp này, 
flex-grow: 2; có nghĩa là phần tử này sẽ mở rộng gấp đôi (2 lần) so với các flex item khác cùng trong container. Nó chiếm một phần lớn hơn của không gian trống.
flex-shrink xác định tỷ lệ co lại của flex item khi không gian không đủ để chứa nó và các flex item khác trong cùng container.
 Trong trường hợp này, flex-shrink: 1; có nghĩa là phần tử này sẽ co lại 1 lần khi cần.
Kết hợp cả hai thuộc tính, thuộc tính flex trong đoạn mã của bạn cho phép phần tử MainStats mở rộng lên gấp đôi
 kích thước so với các phần tử khác trong cùng container và co lại khi cần để vừa với không gian hiện có.
 */

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 15px;
    color: yellow;
  }
`;

const Overview = styled.div`
  background-color: gray;
  opacity: 0.9;
  color: yellow;
  width: 100%;
  padding: 20px;
  height: 180px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 100%;
`;
