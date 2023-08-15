const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");
const { isAdmin, auth } = require("../middleware/auth");

const router = express.Router();

// chỉ có admin mới được đụng vô chỗ CREATE PRODUCT THÔI !
router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, image, price, typeproduct } = req.body;
  try {
    if (image) {
      const response = await cloudinary.uploader.upload(image, {
        upload_preset: "web_thuong_mai_dien_tu",
      });
      if (response) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          typeproduct,
          image: response,
        });

        const newProduct = await product.save();
        return res.status(200).send(newProduct);
      }
    }
  } catch (error) {
    console.log("tạo product bị lỗi ", error);
    return res.status(400).send(error);
  }
});
// Lấy ra tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).send(product);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
});

// Lấy ra 1 sản phẩm từ id đã cho trước
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

/**
 * if (product.image.public_id) { ... }: Kiểm tra xem sản phẩm có thuộc tính image và thuộc tính này có một giá trị 
 * public_id không. Giả sử image là một đối tượng lưu thông tin về hình ảnh của sản phẩm, 
 * và public_id là một thuộc tính của hình ảnh trên Cloudinary (dịch vụ lưu trữ và xử lý hình ảnh).

const DestroyRes = await cloudinary.uploader.destroy(product.image.public_id);: Nếu sản phẩm có public_id,
 đoạn này sẽ gọi đến dịch vụ Cloudinary để xóa hình ảnh dựa trên public_id.
hàm destroy được gọi từ đối tượng cloudinary.uploader. 
Đây là một hàm được cung cấp bởi Cloudinary SDK để xóa một hình ảnh từ dịch vụ lưu trữ và xử lý hình ảnh của Cloudinary.
const DeleteProduct = await Product.findByIdAndDelete(req.params.id);: 
Sau khi xóa hình ảnh trên Cloudinary thành công, đoạn này sẽ tiến hành xóa sản phẩm khỏi cơ sở dữ liệu bằng cách sử dụng Product.findByIdAndDelete().

res.status(200).send(DeleteProduct);: Gửi phản hồi HTTP với mã trạng thái 200 (OK) và dữ liệu của sản phẩm đã bị xóa trả về trong phản hồi.

} else { ... }: Nếu không có public_id trong hình ảnh hoặc không thể xóa hình ảnh trên Cloudinary, in ra thông báo "Không thể xoá Image của sản phẩm".
 */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(204).send(" KHÔNG TỒN TẠI SẢN PHẨM CẦN XOÁ!");
    }
    if (product.image.public_id) {
      const DestroyRes = await cloudinary.uploader.destroy(
        product.image.public_id
      );
      if (DestroyRes) {
        const DeleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(DeleteProduct);
      }
    } else {
      console.log("Không thể xoá Image của sản phẩm");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Edit 1 product
router.put("/:id", isAdmin, async (req, res) => {
  try {
    // Nếu như có sửa hình ảnh trên cloudinary

    // bước 1 : Xoá tấm hình cũ của sản phẩm mà muốn edit Á Ở TRÊN CLOUDINARY
    if (req.body.productImage) {
      const DestroyRes = await cloudinary.uploader.destroy(
        req.body.product.image.public_id
      );
      // bước 2: upload tấm hình mới vô 1 sản phẩm đã có sẵn
      if (DestroyRes) {
        const uploadNewEditRes = await cloudinary.uploader.upload(
          req.body.productImage,
          { upload_preset: "web_thuong_mai_dien_tu" }
        );
        if (uploadNewEditRes) {
          const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image: uploadNewEditRes,
              },
            },
            { new: true }
          );

          res.status(200).send(updateProduct);
        }
      }
    }
    // ELSE NÀY LÀ ĐỂ KHI CHÚNG TA KHÔNG UPDATE HÌNH ẢNH MỚI
    else {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body.product,
          },
        },
        { new: true }
      );

      res.status(200).send(updateProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//http://localhost:5000/api/product/query?searchText=Iphone
router.get("/query", async (req, res) => {
  try {
    const searchText = req.query.searchText; // Lấy giá trị searchText từ query params

    const products = await Product.find({
      // Sử dụng $regex để tìm kiếm tên sản phẩm gần giống với searchText
      name: { $regex: searchText, $options: "i" }, // "i" để tìm kiếm không phân biệt chữ hoa chữ thường
    }).limit(5);

    res.status(200).send(products);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
});
// router.get("/filter", async (req, res) => {
//   try {
//     const { price } = req.query;

//     if (price) {
//       const products = await Product.find({
//         price: { $lte: parseFloat(price) },
//       });
//       res.status(200).json(products);
//     } else {
//       const products = await Product.find();
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json({ error: "An error occurred" });
//   }
// });

router.get("/filter", async (req, res) => {
  try {
    const { price } = req.query;

    if (price) {
      if (price.includes("-")) {
        const [minPrice, maxPrice] = price.split("-").map(parseFloat);
        const products = await Product.find({
          price: { $gte: minPrice, $lte: maxPrice },
        });
        res.status(200).send(products);
      } else if (price.includes("<")) {
        const products = await Product.find({
          price: { $lte: parseFloat(price.substring(1)) },
        });
        res.status(200).send(products);
      } else {
        const products = await Product.find({
          price: { $gte: parseFloat(price.substring(1)) },
        });
        res.status(200).send(products);
      }
    } else {
      const products = await Product.find();
      res.status(200).send(products);
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "An error occurred" });
  }
});

module.exports = router;
