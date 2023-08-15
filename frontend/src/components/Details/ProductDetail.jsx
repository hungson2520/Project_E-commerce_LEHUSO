import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url, setHeaders } from "../../features/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import RatingComponent from "../RatingCoponent";
import Footer from "../Footer";
import CommentProduct from "../CommentProduct";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { userFetch } from "../../features/userSlice";
import CommentPagination from "../CommentPagination";
import Pagination from "@mui/material/Pagination";
const ProductDetail = () => {
  // Lấy id của Product trên thanh Url
  const { id } = useParams();
  const CommentRef = useRef();
  const [product, setProduct] = useState("");
  const [listComment, setListComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Product là", product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const auth = useSelector((state) => state.auth);
  console.log("ID auth trong product Detail là", auth._id);
  //const { ListUser } = useSelector((state) => state.users);
  const { ListUser } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(userFetch());
  }, [dispatch]);
  console.log("ListUser là ", ListUser);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/product/find/${id}`, setHeaders());

        setProduct(res.data);
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    }
    async function fetchComment() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/ratingComment/${id}`, setHeaders());

        setListComment(res.data);
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    }
    fetchData();
    fetchComment();
  }, [id]);

  console.log("ListComment", listComment);
  const totalStars = listComment.reduce(
    (total, comment) => total + comment.star,
    0
  );
  let averageStars = totalStars / listComment.length;
  const AVARAGESTARS = averageStars.toFixed(1);

  console.log("Tổng số sao:", totalStars);
  console.log("Số sao trung bình:", AVARAGESTARS); // Làm tròn 1 chữ số thập phân
  const productId = id;
  const customerId = auth._id;
  const ListIDUserComment = listComment.map((item) => item.customerId);
  // hàm này chỉ lọc ra các giá trị ID Duy Nhất
  const uniqueListIDUserComment = [...new Set(ListIDUserComment)];
  console.log(" Các ID Đã Comment là ", uniqueListIDUserComment);
  const getUserFullName = (customerId) => {
    const user = ListUser.find((user) => user._id == customerId);
    return user ? user.name : "Không xác định";
  };

  //PAGINATION

  const AllofPage = listComment.length;
  console.log("Tổng số bài viết comment là ", AllofPage);
  // 5: 5 comment trên 1 trang
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const comments = listComment?.slice(startIndex, endIndex);
  const changePage = (e, p) => {
    setPage(p);
  };
  return (
    <>
      <StyledProduct>
        <ProductContainer className="w-full h-full justify-between">
          {isLoading ? (
            <p>Đang Tải Dữ Liệu Sản Phẩm</p>
          ) : (
            <>
              <ImageContainer className="w-auto sm:my-auto sm:align-bottom">
                <img
                  className="sm:mt-20 sm:align-middle "
                  src={product.image?.url}
                  alt={product.name}
                />
              </ImageContainer>
              <ProductInformation className="gap-5 mt-5">
                <h3 className="text-3xl font-medium text-slate-700 mt-5">
                  {product.name}
                </h3>
                <p className="mt-5 md:text-3xl font-medium text-slate-700">
                  <span>Hãng :</span>
                  {product.brand}
                </p>

                <p className="mt-5 md:text-3xl font-medium text-slate-700">
                  <span>Loại Sản Phẩm :</span>
                  {product.typeproduct}
                </p>

                {/* <p className="mt-5 md:text-3xl font-medium text-slate-700">
                  <span>Đánh Giá :</span>
                  <> {AVARAGESTARS >0 &&  
                    <>
                    <Stack spacing={1}>
              <Rating
                name={`rating-${comment._id}`}
                value={comment.star}
                precision={1}
                readOnly
              /> </> }</>
                </p> */}

                <p className="mt-5 md:text-3xl font-medium text-slate-700">
                  <span>Đánh Giá :</span>
                  {AVARAGESTARS > 0 && (
                    <Stack spacing={1}>
                      <Rating
                        name="average-rating"
                        value={AVARAGESTARS} // Điều chỉnh AVARAGESTARS thành biến bạn đã tính toán
                        precision={0.1} // Số chữ số thập phân
                        readOnly
                      />{" "}
                    </Stack>
                  )}
                </p>

                <p className="mt-5 md:text-3xl font-medium text-slate-700">
                  <span>Mô Tả :</span>
                  {product.desc}
                </p>
                <Price className="mt-5 md:text-3xl font-medium text-slate-700">
                  Giá: ${product.price}
                </Price>

                <button
                  className="product-add-cart mt-7"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </ProductInformation>
            </>
          )}
        </ProductContainer>
      </StyledProduct>
      <div className="mx-[100px] bg-gray-100">
        <h2 className="text-xl">Danh sách bình luận</h2>

        {/* TÔI MỚI PAGINATION Ở ĐÂY */}
        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="comment-item border-gray-200 border-[1px] rounded-sm "
          >
            <p>Người gửi: {getUserFullName(comment.customerId)}</p>
            <p>
              Ngày gửi:{" "}
              {moment(comment.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </p>

            <Stack spacing={1}>
              <Rating
                name={`rating-${comment._id}`}
                value={comment.star}
                precision={1}
                readOnly
              />
            </Stack>
            <p>Nội dung bình luận:</p>
            {/* <textarea
              className="resize-none w-[100%] "
              value={comment.textComment}
              readOnly
            /> */}
            <p>{comment.textComment}</p>
          </div>
        ))}
        {/* <Pagination
          count={Math.ceil(listComment.length / itemsPerPage)}
          color="primary"
          onChange={changePage}
        /> */}
        {Math.ceil(listComment.length / itemsPerPage) > 0 && (
          <Pagination
            count={Math.ceil(listComment.length / itemsPerPage)}
            color="primary"
            onChange={changePage}
          />
        )}
      </div>
      );
      <CommentProduct
        ref={CommentRef}
        productId={productId}
        customerId={customerId}
      />
      <Footer />
    </>
  );
};

export default ProductDetail;

const StyledProduct = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  //max-width: 550px;
  /* height: 600px; */
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 110, 0.3) 2px 5px 20px 2px;
  border-radius: 5px;
  padding: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const ProductInformation = styled.div`
  flex: 2;
  margin-left: 20px;
  h3 {
    //font-size: 30px;
  }
  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 10px 0;
  font-family: 700;
  font-size: 35px;
`;
