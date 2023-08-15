import React, { useState } from "react";
import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
const FilterProducts = (props, ref) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const brands = ["Samsung", "Apple", "Xiaomi", "Dell", "Other"];

  const handlePriceRangeChange = (event) => {
    const range = event.target.value;
    setSelectedPriceRange(range);
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
  };
  // console.log("price được chọn", selectedPriceRange);
  // console.log("brand được chọn ", selectedBrand);
  // Sử dụng useImperativeHandle để định nghĩa những gì muốn truyền lên parent
  useImperativeHandle(
    ref,
    () => ({
      selectedPriceRange,
      selectedBrand,
    }),
    [selectedBrand, selectedPriceRange]
  );

  return (
    <div
      className="w-full lg:ml-[450px] gap-0 ml-0 h-[80px] md:ml-[150px] max-w-[500px] md:max-w-[520px] flex flex-row border border-1px  lg:max-w-[700px] border-solid mt-[40px] border-black shadow-md rounded-[20px]
    box-with-shadow p-4 ring ring-blue-300"
    >
      <p className="mx-[30px] text-xs md:text-[15px] lg:text-xl">
        Lọc Sản Phẩm
      </p>
      <div className="filter-section mx-[30px] ">
        <p className="text-xs md:text-[15px] lg:text-xl">Theo Giá</p>
        <select
          className="text-xs md:text-[15px] lg:text-xl"
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="">Chọn mức giá</option>
          <option value="<500" selected={selectedPriceRange === "<500"}>
            Dưới $500
          </option>
          <option value="500-700" selected={selectedPriceRange === "500-700"}>
            Từ $500 đến $700
          </option>
          <option value="700-1000" selected={selectedPriceRange === "700-1000"}>
            Từ $700 đến $1000
          </option>
          <option value=">1000" selected={selectedPriceRange === ">1000"}>
            Trên $1000
          </option>
        </select>
      </div>
      <div className="filter-section">
        <p className="text-xs md:text-[15px] lg:text-xl">Theo Hãng Sản Xuất</p>
        <select
          className="text-xs md:text-[15px] lg:text-xl"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <option value="All">Chọn hãng</option>
          {brands.map((brand, index) => (
            <option
              key={index}
              value={brand}
              selected={selectedBrand === brand}
            >
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default forwardRef(FilterProducts);
