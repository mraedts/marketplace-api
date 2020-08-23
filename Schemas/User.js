import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String,
  email: String,
  password: String,
  name: String,
  dateCreated: Date,
  reviewCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: null },
  reviews: [{ text: String, rating: Number, listing: String, date: Date }],
  postCode: String,
  phone: String,
  listings: [String],
});

export default UserSchema;
