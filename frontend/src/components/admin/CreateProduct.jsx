/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminHeaders, PrimaryButton } from "./Commonstyled";
import { productCreate } from "../../features/productsSlice";
const CreateProduct = () => {
  const [productImage, setProductImage] = useState("");
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [brand, setProductBrand] = useState("");
  const [desc, setProductDesc] = useState("");
  const [typeproduct, setTypeProduct] = useState("");
  console.log("productImage", productImage);
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("file là", file);
    TransformFile(file);
  };
  const TransformFile = (file) => {
    /**
     * FileReader là một đối tượng có sẵn trong JavaScript, cho phép bạn đọc dữ liệu từ các tệp (file) được chọn bởi người dùng thông qua trình duyệt.
     *  Điều này hữu ích khi bạn muốn thực hiện các tác vụ liên quan đến tệp như xem nội dung của tệp, lưu dữ liệu vào cơ sở dữ liệu, hoặc hiển thị nó 
     * trực tiếp trên giao diện người dùng.

Khi bạn sử dụng FileReader, bạn có thể đọc dữ liệu từ tệp được chọn bằng cách gán một hàm xử lý sự kiện cho sự kiện onload của nó. 
Khi tệp đã được đọc hoàn tất, hàm xử lý sự kiện này sẽ được gọi và bạn có thể truy cập dữ liệu của tệp thông qua thuộc tính result của đối tượng FileReader.
     */
    const reader = new FileReader();

    if (file) {
      /**
       * reader.readAsDataURL(file);: Dùng phương thức readAsDataURL của FileReader để đọc dữ liệu của tệp dưới dạng URL dữ liệu (data URL).
       *  Data URL là một chuỗi đặc biệt bao gồm cả kiểu dữ liệu của tệp và dữ liệu thực tế của tệp.
       * Điều này cho phép chúng ta sử dụng URL dữ liệu để hiển thị hình ảnh trong một thẻ <img> hoặc thực hiện các tác vụ khác liên quan đến hình ảnh.
       */
      reader.readAsDataURL(file);
      /**
       * eader.onloadend = () => { ... }: Gán một hàm xử lý sự kiện cho sự kiện onloadend của đối tượng FileReader.
       *  Sự kiện onloadend sẽ được gọi khi quá trình đọc dữ liệu của tệp hoàn tất.
       */
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
    } else {
      setProductImage("");
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productCreate({
        name,
        brand,
        desc,
        price,
        image: productImage,
        typeproduct,
      })
    );
    setProductBrand("");
    setProductDesc("");
    setProductImage("");
    setProductName("");
    setProductPrice("");
  };
  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3> Thêm mới 1 sản phẩm</h3>
        <input
          type="file"
          //   accept="image/"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleProductImageUpload}
          required
        />
        <select onChange={(e) => setProductBrand(e.target.value)} required>
          <option value="">--Chọn Hãng--</option>
          <option value="Samsung">Samsung</option>
          <option value="Apple">Apple</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Dell">Dell</option>
          <option value="Other">Other</option>
        </select>
        <select onChange={(e) => setTypeProduct(e.target.value)} required>
          <option value="">--Chọn Loại Sản Phẩm--</option>
          <option value="Smartphone">Điện Thoại</option>
          <option value="Tablet">Máy Tính Bảng</option>
          <option value="Laptop">Laptop</option>
          <option value="Smartwatch">Đồng Hồ Thông Minh</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Nhập vào tên của sản phẩm"
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nhập vào giá của sản phẩm"
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nhập vào mô tả của sản phẩm"
          onChange={(e) => setProductDesc(e.target.value)}
          required
        />
        <PrimaryButton type="submit">Thêm Mới</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImage ? (
          <>
            <img src={productImage} alt="ảnh sản phẩm " />
          </>
        ) : (
          <p>Ảnh sẽ xuất hiện ở đây</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 300px;
  margin-top: 2rem;
  margin-left: 100px;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
  /* transform: translateX(-200px); */
  margin-top: 50px;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
