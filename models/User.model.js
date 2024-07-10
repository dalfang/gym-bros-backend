const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      // ensures that any whitespace characters at the beginning and end of the string 
      //are removed before saving the data to the database.
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userImage: {
      type: String,
      // default img if user does not provide profile photo
      default: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
    },
  }, 
  {
    // adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("UserModel", userSchema);

module.exports = UserModel;
