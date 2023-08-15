import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { productFetch } from "../../features/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import Footer from "../Footer";
const CategorySmartwatch = () => {
  const { items, status } = useSelector((state) => state.products);
  console.log("items trong Category SmartPhone là", items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);
  const TruncateText = (text) => {
    if (text.length < 20) {
      return text;
    }
    return text.substring(0, 20) + "...";
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    navigate("/cart");
  };
  return (
    <>
      <div className="home-container">
        {items && (
          <>
            <h2>Danh Sách Đồng hồ thông minh Đang Bán</h2>
            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct == "Smartwatch" && (
                    <div key={p._id} className="product mt-10">
                      <h3 className="product-name">{p.name}</h3>
                      <Link to={`/product/${p._id}`}>
                        <img
                          className="product-image"
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
                  )
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategorySmartwatch;
