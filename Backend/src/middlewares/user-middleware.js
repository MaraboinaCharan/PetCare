import bcrypt from 'bcrypt';
import petHealth from '../models/PetHealth.js';
import petProfile from '../models/petProfile.js';

  const hashThePassword=async function(next){

    try {
        if (!this.isModified('password')) {
            return next();
        }
     
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;
            this.confirmPassword = undefined;
            next();
        } catch (err) {
            next(err);
        }
    }
    const deleteUserData=async function (next){
        try {
        const userId=this.getQuery()._id;
        const pets=await petProfile.find({owner:userId});
    
        for (const pet of pets) {
          await petHealth.deleteMany({pet:pet._id});
        }
    
        await petProfile.deleteMany({owner:userId});
    
        next();
      }
      catch(err)
      {
        next(err);
      }
    }

const userMiddleware={
    hashThePassword,
    deleteUserData
};

export default userMiddleware;
