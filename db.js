const mongoose = require("mongoose");
const { Schema, connect, model } = mongoose;
try{
  connect(
    process.env.MONGO_URL
  );

} catch(err){
  console.log(err);
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const User = model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
