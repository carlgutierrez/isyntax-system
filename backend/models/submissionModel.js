import mongoose from 'mongoose';
import Joi from 'joi';

const Submission = mongoose.model(
  'Submission',
  new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
    },
    activityID: {
      type: String,
      required: true,
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    code: {
      type: String,
      required: true,
    },
    testCasePassed: {
      type: Number,
      required: true,
    },
    rubricScore: {
      type: Array,
      required: true,
    },
    submissionResult: {
      type: Array,
      required: true,
    },
  })
);

// JOI VALIDATION
function validateSubmission(submission) {
  const schema = Joi.object({
    userEmail: Joi.string().required(),
    activityID: Joi.string().required(),
    code: Joi.string().required(),
    testCasePassed: Joi.number().required(),
    rubricScore: Joi.array().required(),
    submissionResult: Joi.array().required(),
  });

  return schema.validate(submission);
}

export { Submission, validateSubmission };
