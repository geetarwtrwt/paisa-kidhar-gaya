import  { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImg: {
      type: String,
      required: [true, "Profile image is required"],
    },
  },
  { timestamps: true }
);

// hash before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// password match method
userSchema.methods.comparePassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

export const User = models.User || model("User", userSchema);
