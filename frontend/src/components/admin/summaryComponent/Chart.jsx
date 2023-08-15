/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { url, setHeaders } from "../../../features/api";
/**
 *LineChart: Đây là thành phần cơ bản để tạo một biểu đồ đường (line chart).
  Nó là một container để định nghĩa biểu đồ chung và chứa các thành phần khác như các đường đồ thị, trục, lưới, và các phần tử khác cần thiết.

Line: Đây là thành phần sẽ tạo các đường đồ thị trong biểu đồ đường. 
Bạn có thể truyền vào dữ liệu và định nghĩa cách dữ liệu này sẽ được biểu diễn trên đồ thị.

XAxis: Thành phần này đại diện cho trục x của biểu đồ, nơi dữ liệu số liệu sẽ được hiển thị. 
Trục x thường đại diện cho biến độc lập, ví dụ: thời gian, ngày, hoặc các phân loại.

YAxis: Thành phần này đại diện cho trục y của biểu đồ, nơi giá trị số liệu sẽ được hiển thị. 
rục y thường đại diện cho biến phụ thuộc, ví dụ: giá trị của dữ liệu.

CartesianGrid: Đây là thành phần dùng để hiển thị các lưới đứng và ngang trong biểu đồ.
 Lưới này giúp người đọc dễ dàng đọc giá trị của dữ liệu trên biểu đồ.

Tooltip: Thành phần này tạo ra một popup thông báo khi di chuột qua các điểm trên biểu đồ. 
Thông báo này hiển thị các giá trị dữ liệu tại điểm đó, giúp người dùng dễ dàng theo dõi các giá trị dữ liệu cụ thể.

Legend: Thành phần này hiển thị các chú thích (legend) cho các đường đồ thị trên biểu đồ. 
Chú thích này giúp người dùng hiểu rõ hơn về ý nghĩa của từng dòng dữ liệu.

ResponsiveContainer: Đây là một container có thể tự động điều chỉnh kích thước của biểu đồ dựa vào kích thước của phần tử cha. 
Điều này giúp biểu đồ tự thích nghi với các kích thước màn hình khác nhau, đảm bảo biểu đồ hiển thị đẹp trên các thiết bị và kích thước màn hình khác nhau.
 *
 */

const Chart = () => {
  const [sale, setSale] = useState(0);
  const [loading, setLoading] = useState(false);

  function Compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(`${url}/order/week-sale`, setHeaders());
      res.data.sort(Compare);
      const newData = res.data.map((item, index) => {
        const DAY = [
          "Chủ Nhật",
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
        ];

        return {
          Day: DAY[item._id - 1],
          Amount: item.total,
        };
      });

      console.log("newData", newData);
      setSale(newData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledChart>
      <h3>Doanh Số 7 Ngày Vừa Qua</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sale}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledChart>
  );
};

export default Chart;

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 30px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  h3 {
    margin-bottom: 10px;
  }
`;

const loader = styled.div`
  margin-top: 20px;
`;
