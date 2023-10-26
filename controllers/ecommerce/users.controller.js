const bcrypt = require("bcrypt");
const User = require("../../models/ecommerce/users.models");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");




//add new user

const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      return sendSuccessResponse(res, {
        message: "User Add Sucessfully",
        user,
      });
    }
  } catch (error) {
    console.error("get user error:-", error);
    return sendErrorResponse(res, error.message, 403);
    // return sendErrorResponse(res, "can not found this record.", 404);
  }
};


//get users

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    if (users) {
      return sendSuccessResponse(res, {
        message: "Users Data found it ",
        users,
      });
    }
  } catch (error) {
    console.error("get user error:-", error);
    return sendErrorResponse(res, error.message, 404);
  }
};

//get user by id

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await User.find({ _id: id });
    console.log(profile);
    if (profile) {
      return sendSuccessResponse(res, {
        message: "User Data found it ",
        profile,
      });
    }
  } catch (error) {
    console.error("get user error:-", error);
    return sendErrorResponse(res, error.message);
  }
};

//delete profile by id

const removeProfile = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const profile = await User.findByIdAndDelete({ _id });

    console.log("this id :=", profile);
    if (!profile) {
      return sendSuccessResponse(res, {
        message: "User Data not founded ",
      });
    }
  } catch (error) {
    console.error("get user error:-", error);
    return sendErrorResponse(res, error.message);
  }
};

// const updateProfile = async (req, res, next) => {
//   try {
//     const { _id } = req.params;
//     const newInfo = await User.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });

//     console.log("updated profile:-", newInfo);
//     if (!newInfo) {
//       return sendErrorResponse(res, {
//         message: "User Data not founded ",
//       });
//     }
//     console.log("update product :-", newInfo);
//     return sendSuccessResponse(res, {
//       message: "User updated",
//       data: newInfo,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return sendErrorResponse(res, error.message);
//   }
// };

const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { password, ...updateData } = req.body;

    if (password) {
      // If a new password is provided in the update, hash it
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw new Error(err);
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            throw new Error(err);
          }

          updateData.password = hash;

          const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
            new: true,
          });

          console.log("updated profile:-", updatedUser);

          if (!updatedUser) {
            return sendErrorResponse(res, {
              message: "User Data not found",
            });
          }

          return sendSuccessResponse(res, {
            message: "User updated",
            data: updatedUser,
          });
        });
      });
    } else {
      // If no new password is provided, update the user without hashing the password
      const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
        new: true,
      });

      console.log("updated profile:-", updatedUser);

      if (!updatedUser) {
        return sendErrorResponse(res, {
          message: "User Data not found",
        });
      }

      return sendSuccessResponse(res, {
        message: "User updated",
        data: updatedUser,
      });
    }
  } catch (error) {
    console.log(error.message);
    return sendErrorResponse(res, error.message);
  }
};

module.exports = {
  registerUser,
  getUser,
  getProfile,
  removeProfile,
  updateProfile,
};
