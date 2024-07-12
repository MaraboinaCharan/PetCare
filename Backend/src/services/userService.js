import bcrypt from 'bcrypt';
import crypto from 'crypto';
// import User from '../models/User';

const userService = {
    comparePasswordInDb: async function (pass, passDb) {
        return await bcrypt.compare(pass, passDb);
    },

    isPasswordChanged: async function (JWTTimestamp) {
        if (this.passwordChangedAt) {
            const passwordChangeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
            return JWTTimestamp < passwordChangeTimestamp;
        }
        return false;
    },

    createResetPasswordToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
        return resetToken;
    }
};

export default userService;
