import User from '../models/user.js';
import { createSendResponse, sendResponse, filterObj } from '../utils/utils.js';



const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (!await user.comparePasswordInDb(req.body.currentPassword, user.password)) {
      return sendResponse(res, 401, 'Failed', 'The current password you provied is wrong', null);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return sendResponse(res, 401, 'Failed', 'password & confirmPassword didnot match', null);

    }
    user.password = req.body.password,
      user.confirmPassword = req.body.confirmPassword;
    await user.save();
    createSendResponse(user, 201, res);
  }
  catch (err) {
    next(err);
  }

}



const updateUserData = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword) {
      return sendResponse(res, 401, 'Failed', 'Cant update password here ,go to password change section', null);
    }

    const allowedFields = ['name', 'email', 'contactNumber', 'address', 'gender', 'profilePicture', 'emergencyContact'];
    const filteredBody = filterObj(req.body, ...allowedFields);
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return sendResponse(res, 404, 'Failed', 'User not foumd with the given data', null)
    }
    createSendResponse(user, 201, res);
  }
  catch (err) {
    next(err);
  }
}


const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    return sendResponse(res, 204, 'Success', null, null);
  }
  catch (err) {
    next(err);
  }
}

const userController = {
  updatePassword, updateUserData, deleteUser
}
export default userController;