const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userImage: {
      type: String,
      // default if user doesnt provide the user photo
      default: "https://ibb.co/LPNCXMR"
    },
    //routines: { 
    //  type: Schema.ObjectId, 
    //  ref: 'Routine' },
    //meals: {
    //  type: Schema.ObjectId, 
    //  ref: 'Meal' },
  }, 
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("UserModel", userSchema);

module.exports = UserModel;
