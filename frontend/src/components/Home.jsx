/**
 * Trong React Redux, useSelector là một hook được cung cấp bởi thư viện React Redux
 * để lấy các giá trị từ Redux store và sử dụng chúng trong các component của ứng dụng React.
 */
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart, getToTalPrices } from "../features/cartSlice";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HomeBanner from "./HomeBanner";
import NavigateHeader from "./NavigateHeader";
import { useState } from "react";
/**
 * useHistory là một hook được cung cấp bởi react-router-dom để lấy một đối tượng history.
 *  Đối tượng history cung cấp một số phương thức để thực hiện điều hướng (navigation) trong ứng dụng của bạn.
 */
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "../features/authSlice";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  /**
   * Khi gọi useGetAllProductsQuery(), nó sẽ trả về một object chứa các thuộc tính liên quan đến trạng thái của truy vấn và 
   * kết quả trả về từ server. Các thuộc tính này bao gồm:

data: Đây là thuộc tính chứa dữ liệu trả về từ server sau khi truy vấn hoàn thành thành công. Nó sẽ có giá trị undefined khi 
truy vấn đang trong trạng thái loading hoặc error, và sẽ chứa dữ liệu khi truy vấn hoàn thành thành công (success).

isLoading: Đây là một boolean cho biết trạng thái hiện tại của truy vấn. Nó sẽ có giá trị true khi truy vấn đang trong trạng thái loading, 
và false khi truy vấn hoàn thành hoặc xảy ra lỗi.

error: Đây là một đối tượng Error chứa thông tin về lỗi nếu truy vấn xảy ra lỗi. Nó sẽ có giá trị undefined khi truy vấn hoàn thành thành công
 hoặc đang trong trạng thái loading.

isSuccess: Đây cũng là một boolean, chỉ định xem truy vấn đã hoàn thành thành công hay không. Nó sẽ có giá trị true khi truy vấn hoàn thành thành công, 
và false trong các trạng thái khác (loading hoặc error).
   */
  /**
   * Hàm useSelector((state) => state.products) được sử dụng để lấy giá trị của trạng thái (state) products từ Redux store trong ứng dụng React.
   * trong trường hợp này là items và status
   * const { items, status } = useSelector((state) => state.products);
  console.log("data", items);
   */

  const { data, error, isLoading } = useGetAllProductsQuery();
  /**
   * Trong Redux và React Redux, useDispatch là một hook được cung cấp để lấy một hàm dispatch từ Redux store.
   * Hàm dispatch được sử dụng để gửi các action đến Redux store để thay đổi trạng thái (state) của ứng dụng.
   */
  const { items: products, status } = useSelector((state) => state.products);
  // const auth = useSelector((state) => state.auth);
  // console.log("auth", auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    /**
     * Khi bạn gọi history.push("/cart"), React Router sẽ thực hiện việc chuyển hướng đến trang có địa chỉ "/cart" và
     *  hiển thị nội dung của trang đó trong ứng dụng của bạn. Đồng thời, nó cũng thêm một mục mới vào lịch sử điều hướng,
     *  điều này có nghĩa là nếu người dùng nhấn nút "Back" trên trình duyệt, họ sẽ được chuyển đến trang trước đó mà không cần reload lại trang.
     */
    // dispatch(getToTalPrices());

    // history.push("/cart");
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const TruncateText = (text) => {
    if (text.length < 20) {
      return text;
    }
    return text.substring(0, 20) + "...";
  };

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const SP = data?.slice(startIndex, endIndex);
  const changePage = (e, p) => {
    setPage(p);
  };
  return (
    <>
      <NavigateHeader />
      <HomeBanner />
      <div className="home-container">
        {isLoading && <h2>Đang LOADING Dữ Liệu....</h2>}
        {error && <h2>CÓ LỖI RỒI ....</h2>}
        {data && (
          <>
            <h2 className="text-[15px] md:ml-[100px] lg:ml-[300px] md:text-[20px] lg:text-[25px]">
              Danh Sách Sản Phẩm Đang Bán
            </h2>
            <div className="products">
              {SP?.map((p) => (
                <div key={p._id} className="product mt-10">
                  <h3 className="product-name">{p.name}</h3>
                  <Link to={`product/${p._id}`}>
                    <img
                      className="product-image z-[-9]"
                      width={200}
                      height={200}
                      src={p.image.url}
                      alt={p.name}
                    />
                  </Link>

                  <div className="details">
                    <span>Mô tả : {TruncateText(p.desc)}</span>
                    <br />
                    <span className="price">Giá: ${p.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(p)}>
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
              ))}
            </div>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              color="primary"
              onChange={changePage}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
