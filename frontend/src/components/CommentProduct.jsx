import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { url, setHeaders } from "../features/api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CommentProduct = (props, ref) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [rating, setRating] = useState(2.5);
  const [comment, setComment] = useState("");
  console.log("props.productId:", props.productId);
  console.log("props.customerId:", props.customerId);
  const handleCommentToggle = () => {
    setIsAddingComment(!isAddingComment);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    async function WriteComment() {
      try {
        const res = await axios.post(
          `${url}/ratingComment`,
          {
            productId: props.productId,
            customerId: props.customerId,
            star: Number(rating),
            textComment: comment,
          },
          setHeaders()
        );
        console.log("Res là", res);
        toast.success("Thêm Bình Luận Thành Công!");
      } catch (error) {
        console.log("Error", error);
      }
    }
    WriteComment();
  };

  useImperativeHandle(
    ref,
    () => ({
      rating,
      comment,
    }),
    [rating, comment]
  );

  return (
    <>
      <div className="mt-[30px] bg-gray-100 h-[200px] mx-[100px] items-center float-center mb-[150px] ">
        <h2>Đánh giá và bình luận</h2>
        {/* <div className=" other-customer mb-[30px] w-[100%] bg-gray-400">
          <p>Tên Người Gửi</p>
          <textarea
            className="resize-none w-[30%]"
            placeholder="Nội dung bình luận"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p>Thời gian gửi</p>
        </div> */}
        <div className="this-customer bg-yellow-50 h-[200px]">
          <Stack spacing={1}>
            <Rating
              name="rating"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              precision={1}
              defaultValue={5}
            />
          </Stack>
          <button onClick={handleCommentToggle}>
            {isAddingComment ? "Ẩn bình luận" : "Viết bình luận"}
          </button>
          {isAddingComment && (
            <form className="bg-yellow h-[180px]">
              <div className="flex flex-col w-[100%] gap-[10px]">
                {/* <textarea
                  className="resize-none"
                  placeholder="Nội dung bình luận"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                /> */}
                <textarea
                  className="resize-none h-[100px] w-[100%]"
                  placeholder="Nội dung bình luận"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="bg-green-300" onClick={handleCommentSubmit}>
                  {props.customerId != "" ? (
                    "Gửi bình luận"
                  ) : (
                    <Link to="/login">Đăng Nhập để viết bình luận</Link>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default forwardRef(CommentProduct);
