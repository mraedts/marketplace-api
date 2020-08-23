import mongoose from 'mongoose';
import UserSchema from './Schemas/User.js';
import ListingSchema from './Schemas/Listing.js';
import { v1 as uuidGen } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const creds = {
  dbName: process.env.DB_NAME,
  pw: process.env.DB_PASSWORD,
  user: process.env.USER,
};
const url = `mongodb+srv://${user}:${creds.pw}@cluster0.liytp.azure.mongodb.net/${creds.dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', UserSchema);
const Listing = mongoose.model('Listing', ListingSchema);

class DatabaseHandler {
  async createUser(email, passwordTxt, name, location, phone) {
    const user = new User({
      _id: uuidGen(),
      name: name,
      email: email,
      password: await this.genPassword(passwordTxt),
      dateCreated: new Date(),
      location: location,
      phone: phone,
    });
    user.save();
  }

  async deleteUser(userId) {
    //to do: - delete bids from other user documents
    //       - delete all listings
    User.deleteOne({ _id: userId });
  }

  async readListing(id) {
    return await Listing.findById(id);
  }

  async createListing(productName, userId, state, description, type, category) {
    const uuid = uuidGen();
    const listing = new Listing({
      _id: uuid,
      title: productName,
      user: userId,
      dateTime: new Date(),
      state: state,
      description: description,
      type: type,
      category: category,
    });
    listing.save();
    const user = await User.findById(userId);
    user.listings.push(uuid);
    user.save();
  }

  async genPassword() {
    const saltRounds = 10;
    const hash = await bcrypt.hash('1234sdjfh', saltRounds);
    console.log(hash);
    checkPassword('1234sdjfh', hash);
  }

  async checkPassword(plaintext, hash) {
    return await bcrypt.compare(plaintext, hash);
  }
}

export { DatabaseHandler };
