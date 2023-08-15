// const mongoose = require("mongoose");

// const ratingCommentSchema = new mongoose.Schema(
//   {
//     productID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     customerID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     star: { type: Number, required: true, min: 1, max: 5 },
//     textComment: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Rating_Comment = mongoose.model("Rating_Comment", ratingCommentSchema);

// exports.Rating_Comment = Rating_Comment;

const mongoose = require("mongoose");

const ratingCommentSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    customerId: {
      type: String,
      required: true,
    },
    star: { type: Number, required: true, min: 1, max: 5 },
    textComment: { type: String, required: true },
  },
  { timestamps: true }
);

const ratingComment = mongoose.model("ratingComment", ratingCommentSchema);

exports.ratingComment = ratingComment;
