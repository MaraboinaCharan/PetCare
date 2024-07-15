import petDoctor from '../models/petDoctor.js';
import user from '../models/user.js';
import { createSendResponse, sendResponse, filterObj,getModelName,getSecretStringandExpiresIn} from '../utils/utils.js';


const updatePassword = async (req, res, next) => {
  try {
    const Model=getModelName(req.path);

    const user = await Model.findById(req.user._id).select('+password');
    if (!await user.comparePasswordInDb(req.body.currentPassword, user.password)) {
      return sendResponse(res, 401, 'Failed', 'The current password you provied is wrong', null);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return sendResponse(res, 401, 'Failed', 'password & confirmPassword didnot match', null);

    }
    user.password = req.body.password,
      user.confirmPassword = req.body.confirmPassword;
    await user.save();
    const {secret,expiresIn,cookieExpires,cookieName}=getSecretStringandExpiresIn(req.path);
    createSendResponse(user, 201, res,secret,expiresIn,cookieExpires,cookieName);
  }
  catch (err) {
    next(err);
  }

}



const updateUserData = async (req, res, next) => {
  try {
    const Model=getModelName(req.path);
    if (req.body.password || req.body.confirmPassword) {
      return sendResponse(res, 401, 'Failed', 'Cant update password here ,go to password change section', null);
    }

    const allowedFields = ['name', 'email', 'contactNumber', 'address', 'gender', 'profilePicture', 'emergencyContact','clinicName','clinicAddress','specialization','experince'];
    const filteredBody = filterObj(req.body, ...allowedFields);
    const user = await Model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    if (!user) {
      return sendResponse(res, 404, 'Failed', `${Model} not found with the given data`, null)
    }
    const {secret,expiresIn,cookieExpires,cookieName}=getSecretStringandExpiresIn(req.path)
    createSendResponse(user, 201, res,secret,expiresIn,cookieExpires,cookieName);
  }
  catch (err) {
    next(err);
  }
}


const deleteUser = async (req, res, next) => {
  try {
    const Model=getModelName(req.path)
       await Model.findByIdAndDelete(req.user._id)
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