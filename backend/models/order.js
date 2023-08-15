const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    customerId: { type: String },
    paymentIntendId: { type: String },
    products: [],
    // subtotal là chưa có tiền ship với tiền thuế
    subtotal: { type: Number, require: true },
    // total : đã có tiền ship với tiền thuế
    total: { type: Number, require: true },
    // shipping ở đây là địa chỉ để ship hàng
    shipping: { type: Object, require: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;

/**
 * chỗ này là product nè
 *  {
        id: { type: String },
        name: { type: String },
        brand: { type: String },
        desc: { type: String },
        price: { type: String },
        image: { type: String },
        cart1ProductQuantity: { type: Number },
      },
 */
