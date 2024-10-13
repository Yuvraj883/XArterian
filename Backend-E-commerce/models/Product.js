const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  availabilityStatus: String,
  brand: String,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  discountPercentage: Number,
  images: [String],
  meta: {
    barcode: String,
    createdAt: Date,
    updatedAt: Date,
    qrCode: String
  },
  minimumOrderQuantity: Number,
  rating: Number,
  returnPolicy: String,
  reviews: [{
    reviewerName: String,
    reviewerEmail: String,
    rating: Number,
    comment: String,
    date: Date
  }],
  shippingInformation: String,
  sku: String,
  stock: Number,
  tags: [String],
  thumbnail: String,
  warrantyInformation: String,
  weight: Number
});

module.exports = mongoose.model('Product', ProductSchema);
