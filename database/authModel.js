import { config } from 'dotenv';
config();

import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import debug from 'debug';

const log = debug('index:authModel');

const authSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
authSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, +process.env.SALT_ROUND);
  }
  next();
});
authSchema.methods.verifyPassword = async (plainText, hashedPassword) => {
  const result = await compare(plainText, hashedPassword);
  return result;
};

const User = model('User', authSchema);

export default User;
