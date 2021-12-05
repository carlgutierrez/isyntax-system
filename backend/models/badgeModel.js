import mongoose from 'mongoose';
import Joi from 'joi';

const Badge = mongoose.model(
  'Badge',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    // star: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   default: 1,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  })
);

// JOI VALIDATION
function validateBadge(badge) {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.required(),
  });

  return schema.validate(badge);
}

export { Badge, validateBadge };
