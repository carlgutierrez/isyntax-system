import mongoose from 'mongoose';
import Joi from 'joi';

const Activity = mongoose.model(
  'Activity',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Number,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
  })
);

// JOI VALIDATION
function validateActivity(activity) {
  const schema = Joi.object({
    title: Joi.string().required(),
    items: Joi.number().required(),
    dueDate: Joi.required(),
    subject: Joi.string().required(),
    // To be remove
    status: Joi.string().required(),
    postedBy: Joi.string().required(),
    instructions: Joi.string().required(),
  });

  return schema.validate(activity);
}

export { Activity, validateActivity };
