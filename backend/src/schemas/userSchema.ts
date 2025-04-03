import mongoose from "mongoose";
import { userType } from "../validators/userValidator.js";

const userSchema = new mongoose.Schema<userType>({
  name: { type: String, required: true, min: 2 },
  lastName: { type: String, required: true, min: 2 },
  email: { type: String, required: true },
  dateCreated: { type: Date },
  dateModified: Date,
  userId: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
