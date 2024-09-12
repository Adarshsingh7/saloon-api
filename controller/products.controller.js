const Product = require('../model/products.model');
const catchAsync = require('../utils/catchAsync');
const { imageUpload } = require('../utils/imageUpload');
const handlerFactory = require('./handlerFactory');

exports.createProduct = handlerFactory.createOne(Product);
exports.getProduct = handlerFactory.getOne(Product);
exports.getAllProducts = handlerFactory.getAll(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);

exports.updateProductImage = catchAsync(async (req, res) => {
  const product = req.body.productId;
  const productImage = req.files.productImage;

  const image = await imageUpload(
    productImage,
    process.env.FOLDER_NAME,
    1000,
    1000,
  );
  console.log(image.secure_url);

  const updatedProduct = await Product.findByIdAndUpdate(
    product,
    { image: image.secure_url },
    { new: true },
  );
  res.status(200).json({
    status: 'success',
    message: 'User Image updated successfully',
    data: updatedProduct,
  });
});
