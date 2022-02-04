import mongoose from 'mongoose';
import Joi from 'joi';

const Badge = mongoose.model(
  'Badge',
  new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    badges: {
      type: Array,
      required: true,
    },
  })
);

// JOI VALIDATION
function validateBadge(badge) {
  const schema = Joi.object({
    userEmail: Joi.string().required().email(),
    badges: Joi.array().required(),
  });

  return schema.validate(badge);
}

export { Badge, validateBadge };
