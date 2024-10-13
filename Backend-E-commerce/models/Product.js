const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  availabilityStatus: String,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  weight: Number,
  shippingInformation: String,
  returnPolicy: String,
  warrantyInformation: String,
  minimumOrderQuantity: Number,
  sku: String,
  tags: [String],
  meta: {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String
  },
  reviews: [{
    reviewer: String,
    reviewText: String,
    rating: Number
  }]
});

const product = mongoose.model('Product', productSchema);
module.exports = product;
