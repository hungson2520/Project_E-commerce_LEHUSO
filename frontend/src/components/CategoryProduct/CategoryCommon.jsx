import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productFetch } from "../../features/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import Footer from "../Footer";
import FilterProducts from "../FilterProduct";
import { useRef } from "react";
import axios from "axios";
import { url, setHeaders } from "../../features/api";
import NavigateHeader from "../NavigateHeader";
import Pagination from "@mui/material/Pagination";

const CategoryCommon = ({ TYPEPRODUCT }) => {
  const { items, status } = useSelector((state) => state.products);
  const filterRef = useRef(); // Tạo ref
  const handleChange = (selectedPrice) => {
    //dispatch(setSelectedPriceAction(selectedPrice)); // Dispatch action để cập nhật state
  };
  //console.log("items trong Category SmartPhone là", items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  const [filterBrand, setFilterBrand] = useState("All");
  const [filterPrice, setFilterPrice] = useState("");

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
  const [queryPrice, setQueryPrice] = useState(false);
  const [listFilterPrice, setListFilterPrice] = useState([]);

  // console.log("queryBand", queryBrand);
  // console.log("ref.current là", filterRef.current);
  let selectedPrice;
  let selectedBrand;
  const handleButtonClick = () => {
    console.log("filter price", filterRef.current.selectedPriceRange);
    console.log("filter brand", filterRef?.current?.selectedBrand);
    if (
      // tức là đã chọn hãng
      filterRef?.current?.selectedBrand !== "All" &&
      filterRef?.current?.selectedPriceRange === ""
    ) {
      setQueryBrand(true);
      console.log("chui vô FILTER BRAND NÈ");
      setQueryPrice(false);

      selectedBrand = filterRef.current.selectedBrand;

      setFilterBrand(selectedBrand);

      setFilterPrice("");
    } else if (
      filterRef?.current?.selectedPriceRange !== "" &&
      filterRef?.current?.selectedBrand === "All"
    ) {
      setQueryPrice(true);
      setQueryBrand(false);
      setFilterPrice(filterRef.current.selectedPriceRange);
      console.log("chui vô FILTER PRICE NÈ");
    } else if (
      filterRef?.current?.selectedPriceRange !== "" &&
      filterRef?.current?.selectedBrand !== "All"
    ) {
      setQueryPrice(true);
      setQueryBrand(true);
      setFilterPrice(filterRef.current.selectedPriceRange);
      console.log("chui vô FILTER BRAND VA PRICE NÈ");
      selectedBrand = filterRef.current.selectedBrand;

      setFilterBrand(selectedBrand);
    } else if (
      filterRef?.current?.selectedPriceRange === "" &&
      filterRef?.current?.selectedBrand === "All"
    ) {
      setQueryPrice(false);
      setQueryBrand(false);
      setFilterPrice(filterRef.current.selectedPriceRange);
      console.log("chui vô FILTER BRAND VA PRICE NÈ");
      selectedBrand = filterRef.current.selectedBrand;

      setFilterBrand(selectedBrand);
    }
  };

  useEffect(() => {
    if (filterBrand === "All") {
      setQueryBrand(false);
    }
    //else {
    //   setQueryBrand(true);
    //   setFilterBrand(filterBrand);
    // }
  }, [filterBrand]);
  const filteredItems = items.filter((item) => item.typeproduct == TYPEPRODUCT);
  console.log("filteredItems", filteredItems);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const SP = filteredItems?.slice(startIndex, endIndex);
  const changePage = (e, p) => {
    setPage(p);
  };

  useEffect(() => {
    async function FilterPriceProduct() {
      const res = await axios.get(
        `${url}/product/filter?price=${filterPrice}`,
        setHeaders()
      );
      setListFilterPrice(res.data);
      console.log("res.data filter Price là", listFilterPrice);
      if (filterPrice === "") {
        setQueryPrice(false);
      }
    }
    FilterPriceProduct();
  }, [filterPrice]);

  useEffect(() => {
    if (filterBrand === "All" && filterPrice === "") {
      setQueryBrand(false);
      setQueryPrice(false);
    }
  }, [filterBrand, filterPrice]);

  console.log("queryPrice đây nè", queryPrice);
  const listFilterPriceIds = listFilterPrice.map((product) => product._id);

  return (
    <>
      <NavigateHeader />
      <div className="home-container">
        {/* Không có Brand và Price */}
        {items && !queryBrand && !queryPrice && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách {TYPEPRODUCT} Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button
              onClick={handleButtonClick}
              className="xl:ml-[600px] mt-[50px] bg-yellow-400 px-10 rounded-[5px] border-[1px] border-black p-5 hover:opacity-70
              sm:ml-[200px] md:ml-[300] lg:ml-[450] 
              "
            >
              LỌC{" "}
            </button>

            <div className="products">
              {SP?.map(
                (p) =>
                  p.typeproduct == TYPEPRODUCT &&
                  filterBrand === "All" &&
                  filterPrice == "" && (
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
            <Pagination
              count={Math.ceil(filteredItems.length / itemsPerPage)}
              color="primary"
              onChange={changePage}
            />
          </>
        )}
        {/* Có Branhd nhưng không có Price */}
        {items && queryBrand && !queryPrice && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách {TYPEPRODUCT} Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button
              className="ml-[600px] mt-[50px] bg-yellow-400 px-10 rounded-[5px] border-[1px] border-black p-5 hover:opacity-70"
              onClick={handleButtonClick}
            >
              LỌC{" "}
            </button>
            <div className="flex flex-row gap-5 lg:ml-[550px] mt-[30px]">
              <span className="border border-2px p-5 rounded-[10px]  bg-blue-200 block">
                {filterBrand}
              </span>
            </div>

            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct == TYPEPRODUCT &&
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

        {/* Có Price nhưng không có Brand */}
        {items && !queryBrand && queryPrice && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách SmartPhone Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button
              className="ml-[600px] mt-[50px] bg-yellow-400 px-10 rounded-[5px] border-[1px] border-black p-5 hover:opacity-70"
              onClick={handleButtonClick}
            >
              LỌC{" "}
            </button>
            <div className="flex flex-row gap-5 lg:ml-[550px] mt-[30px]">
              <span className="border border-2px p-5 rounded-[10px] bg-blue-200 block">
                {filterPrice}$
              </span>
            </div>

            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct == TYPEPRODUCT &&
                  listFilterPriceIds.includes(p._id) && (
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
        {/* CÓ CẢ PRICE VÀ BRAND */}
        {items && queryBrand && queryPrice && (
          <>
            <p className="lg:text-[30px] text-[15px] md:ml-[200px] lg:ml-[450px] md:text-xl">
              Danh Sách {TYPEPRODUCT} Đang Bán
            </p>

            <FilterProducts ref={filterRef} />
            <button
              className="ml-[600px] mt-[50px] bg-yellow-400 px-10 rounded-[5px] border-[1px] border-black p-5 hover:opacity-70"
              onClick={handleButtonClick}
            >
              LỌC{" "}
            </button>
            <div className="flex flex-row gap-5 lg:ml-[550px] mt-[30px]">
              <span className="border border-2px p-5 rounded-[10px] bg-blue-200 block">
                {filterPrice}$
              </span>
              <span className="border border-2px p-5 rounded-[10px]  bg-blue-200 block">
                {filterBrand}
              </span>
            </div>

            <div className="products">
              {items?.map(
                (p) =>
                  p.typeproduct === TYPEPRODUCT &&
                  listFilterPriceIds.includes(p._id) &&
                  p.brand === filterBrand && (
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

export default CategoryCommon;
