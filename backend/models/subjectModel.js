import mongoose from 'mongoose';
import Joi from 'joi';

const Subject = mongoose.model(
  'Subject',
  new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  })
);

// JOI VALIDATION
function validateSubject(subject) {
  const schema = Joi.object({
    userEmail: Joi.string().required().email(),
    subjects: Joi.array().required(),
  });

  return schema.validate(subject);
}

export { Subject, validateSubject };
