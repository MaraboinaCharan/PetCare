import bcrypt from 'bcrypt';

const userMiddleware = {
    hashPassword: async function (next) {
        if (!this.isModified('password')) {
            return next();
        }

        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
            this.confirmPassword = undefined;
            next();
        } catch (err) {
            next(err);
        }
    }
};

export default userMiddleware;
