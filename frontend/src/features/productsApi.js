/* eslint-disable no-unused-vars */
/**createApi: Là một hàm trong Redux Toolkit Query,
 *  được sử dụng để tạo một API client. Hàm này nhận vào một object chứa các endpoint và options để xác định các truy vấn dựa trên mạng.
 * Endpoint là một địa chỉ (URL) xác định đích đến của một truy vấn dựa trên mạng. Trong ngữ cảnh của Redux Toolkit Query, endpoint là một phần của API client,
 * nó cho biết nơi bạn muốn gửi các yêu cầu HTTP như GET, POST, PUT, DELETE để lấy hoặc cập nhật dữ liệu từ server.
 * fetchBaseQuery: Là một function được cung cấp bởi Redux Toolkit Query, nó giúp thực hiện các truy vấn dựa trên mạng sử dụng fetch() API.
 * Bạn có thể cung cấp một URL endpoint và các tùy chọn cho việc thực hiện các truy vấn.
 * fetchBaseQuery sẽ xử lý các trạng thái của truy vấn (loading, success, error) và tự động quản lý chúng trong Redux store.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * một API client bằng cách sử dụng createApi từ Redux Toolkit Query.
 * Trong trường hợp này, bạn tạo một API client có tên productsApi.
 *  API client này được cấu hình bằng các options như reducerPath, baseQuery, và endpoints.
 */
export const productsApi = createApi({
  /**reducerPath không tham gia trực tiếp vào câu truy vấn khi bạn gửi yêu cầu HTTP.
   *  Thay vào đó, reducerPath chỉ là tên đường dẫn (path) của reducer được tạo bởi Redux Toolkit Query để quản lý trạng thái của các truy vấn dựa trên mạng.
   * reducerPath chỉ đơn giản là tên của reducer, và nó được sử dụng để xác định nơi lưu trữ trạng thái của các truy vấn trong Redux store.
   * Bạn cần đảm bảo rằng reducerPath là duy nhất và không trùng lặp với các tên khác trong ứng dụng của bạn.
   */
  reducerPath: "productsApi",

  /**
   * baseQuery được sử dụng để xác định URL của backend hoặc địa chỉ cơ sở (base URL) mà các truy vấn dựa trên mạng sẽ gửi đến.
   */
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),

  /**endpoints là một hàm callback được sử dụng để định nghĩa các endpoint (điểm cuối) của API và các truy vấn tương ứng cho mỗi endpoint
   *
   *builder: Đối tượng này chứa các phương thức để định nghĩa các endpoint và các truy vấn tương ứng cho API client của bạn.
   *
   */
  endpoints: (builder) => ({
    // Lấy ra tất cả sản phẩm
    /** Điều này có nghĩa là khi bạn gọi useGetAllProductsQuery()
     *  (khi sử dụng hook useGetAllProductsQuery),
     * truy vấn này sẽ gửi yêu cầu HTTP GET đến địa chỉ http://localhost:5000/products để lấy tất cả sản phẩm.
     *
     *
     *
     */
    getAllProducts: builder.query({
      query: () => "product",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
