import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListingSchema = new Schema({
  _id: String,
  title: String,
  dateTime: Date,
  user: String,
  bidHistory: [{ user: String, amount: Number, dateTime: Date }],
  state: String,
  description: String,
  type: String,
  category: String,
});

export default ListingSchema;
