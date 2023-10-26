const Product = require("../../models/ecommerce/product.models");

const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

//add product

const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    console.log("its product:-", product);
    if (product) {
      return sendSuccessResponse(res, { message: "Product Added", product });
    }
    console.log("its product:-", product);
  } catch (error) {
    console.log("Error in add product:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

//get product
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    console.log("products:-", products);

    if (!products || products.length == 0) {
      return sendErrorResponse(res, {
        message: "not found any products",
      });
    }
    return sendSuccessResponse(res, {
      message: "Products Founded",
      data: products,
    });
  } catch (error) {
    console.error("geting product error:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

//get specific product

const getProductInfo = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const product = await Product.find({ _id });
    if (!product || product.length == 0) {
      return sendErrorResponse(res, { message: "Product not found" });
    }
    console.log("founded product :-", product);

    return sendSuccessResponse(res, {
      message: "product detail get it",
      data: product,
    });
  } catch (error) {
    console.error("update product error:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

// update product

const updateProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const productInfo = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!productInfo) {
      return sendErrorResponse(res, {
        message: "not found any products",
      });
    }

    console.log("update product :-", productInfo);
    return sendSuccessResponse(res, {
      message: "Product updated",
      data: productInfo,
    });
  } catch (error) {
    console.error("update product error:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

//remove the product

const removeProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const productInfo = await Product.findByIdAndDelete({ _id });
    if (!productInfo) {
      return sendErrorResponse(res, { message: "product not found it" });
    }
    console.log("removed product :-", productInfo);
    return sendSuccessResponse(res, {
      message: "Product Sucessfully Removed",
    });
  } catch (error) {
    console.error("remove product error:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductInfo,
  updateProduct,
  removeProduct,
};
