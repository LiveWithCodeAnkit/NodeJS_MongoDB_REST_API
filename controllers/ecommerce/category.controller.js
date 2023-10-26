const Category = require("../../models/ecommerce/category.models");

const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

// add categrory
const addCategory = async (req, res, next) => {
  try {
    const categoryInfo = await Category.create(req.body);
    if (categoryInfo) {
      return sendSuccessResponse(res, {
        message: "Category Added ",
        categoryInfo,
      });
    }
  } catch (error) {
    console.error("Error in Add Category :-", error);
    return sendErrorResponse(res, error.message);
  }
};

//get category

const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    console.log("list of categories:-", categories);

    if (!categories || categories.length == 0) {
      return sendErrorResponse(res, {
        message: "not found any record !",
      });
    }

    return sendSuccessResponse(res, {
      message: "Categories List ",
      data: categories,
    });
  } catch (error) {
    console.error("Geting categories Error:-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

//delete categories

const removeCategory = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const category = await Category.findByIdAndDelete({ _id });
    return sendSuccessResponse(res, {
      message: "category deleted Sucessfully",
      data: category,
    });
  } catch (error) {
    console.error("Category Remove Error :-", error.message);
    return sendErrorResponse(res, error.message);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return sendErrorResponse(res, {
        message: "Category Not Found",
      });
    }
    return sendSuccessResponse(res, {
      message: "category Updated Sucessfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("update category error:-", error.message);
    return sendErrorResponse(res, {
      message: error.message,
    });
  }
};


module.exports = {
  addCategory,
  getCategory,
  removeCategory,
  updateCategory,
};
