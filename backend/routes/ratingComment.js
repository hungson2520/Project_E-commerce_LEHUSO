const { ratingComment } = require("../models/ratingComment");
const express = require("express");
const { isAdmin, auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  const { productId, customerId, star, textComment } = req.body;
  try {
    const comment = new ratingComment({
      productId,
      customerId,
      star,
      textComment,
    });

    const newComment = await comment.save();
    return res.status(200).send(newComment);
  } catch (error) {
    console.log("tạo Comment bị lỗi ", error);
    return res.status(400).send(error);
  }
});

router.get("/:productIdFind", async (req, res) => {
  const productId = req.params.productIdFind;

  try {
    const comments = await ratingComment
      .find({ productId })
      .sort({ createdAt: -1 });
    return res.status(200).send(comments);
  } catch (error) {
    console.log("Lỗi khi lấy comment", error);
    return res.status(400).send(error);
  }
});
module.exports = router;
