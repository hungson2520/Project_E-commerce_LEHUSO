// import { UseSelector, useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { productFetch } from "../../features/productsSlice";
// import { Link } from "react-router-dom";
// import { addToCart } from "../../features/cartSlice";
// import Footer from "../Footer";
// const CategoryTablet = () => {
//   const { items, status } = useSelector((state) => state.products);
//   console.log("items trong Category SmartPhone là", items);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(productFetch());
//   }, [dispatch]);
//   const TruncateText = (text) => {
//     if (text.length < 20) {
//       return text;
//     }
//     return text.substring(0, 20) + "...";
//   };
//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));

//     navigate("/cart");
//   };
//   return (
//     <>
//       <div className="home-container">
//         {items && (
//           <>
//             <h2>Danh Sách Máy Tính Bảng Đang Bán</h2>
//             <div className="products">
//               {items?.map(
//                 (p) =>
//                   p.typeproduct == "Tablet" && (
//                     <div key={p._id} className="product mt-10">
//                       <h3 className="product-name">{p.name}</h3>
//                       <Link to={`/product/${p._id}`}>
//                         <img
//                           className="product-image"
//                           width={200}
//                           height={200}
//                           src={p.image.url}
//                           alt={p.name}
//                         />
//                       </Link>

//                       <div className="details">
//                         <span>Mô tả : {TruncateText(p.desc)}</span>
//                         <br />
//                         <span className="price">Giá: ${p.price}</span>
//                       </div>
//                       <button onClick={() => handleAddToCart(p)}>
//                         Thêm Vào Giỏ Hàng
//                       </button>
//                     </div>
//                   )
//               )}
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CategoryTablet;

import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productFetch } from "../../features/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import Footer from "../Footer";
import FilterProducts from "../FilterProduct";
import { useRef } from "react";
const CategoryTablet = () => {
  const { items, status } = useSelector((state) => state.products);
  const filterRef = useRef(); // Tạo ref
  const handleChange = (selectedPrice) => {
    //dispatch(setSelectedPriceAction(selectedPrice)); // Dispatch action để cập nhật state
  };
  console.log("items trong Category SmartPhone là", items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  const [filterBrand, setFilterBrand] = useState("");

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
  const [queryBrand, setQueryBrand] = useState(false);

  console.log("queryBand", queryBrand);
  console.log("ref.current là", filterRef.current);
  let selectedPrice;
  let selectedBrand;
  const handleButtonClick = () => {
    if (filterRef?.current) {
      setQueryBrand(true);
      console.log("chui vô component cha là CATEGORY SMARTPHONE NÈ");
      selectedPrice = filterRef.current.selectedPriceRange;
      console.log("Selected Price in Parent:", selectedPrice);
      selectedBrand = filterRef.current.selectedBrand;
      console.log("Selected Price in Parent:", selectedBrand);
      setFilterBrand(selectedBrand);
    }
  };

  useEffect(() => {
    console.log("filter Brand trong useEffect", filterBrand);
    if (filterBrand === "All") {
      setQueryBrand(false);
    }
  }, [filterBrand]);
  console.log("selected Brand là", filterBrand);

  return (
    <>
      <div className="home-container">
        {items && !queryBrand && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách Máy Tính Bảng Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button onClick={handleButtonClick}>LỌC </button>

            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct == "Tablet" && (
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

        {items && queryBrand && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách Máy Tính Bảng {filterBrand} Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button onClick={handleButtonClick}>LỌC </button>

            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct == "Tablet" &&
                  p.brand == filterBrand && (
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

export default CategoryTablet;
