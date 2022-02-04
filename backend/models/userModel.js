import mongoose from 'mongoose';
import Joi from 'joi';

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'student',
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  })
);

// JOI VALIDATION
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    picture: Joi.string().required(),

    username: Joi.string(),
    role: Joi.string(),
    totalScore: Joi.number(),
  });
  return schema.validate(user);
}

export { User, validateUser };
