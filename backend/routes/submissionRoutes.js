import express from 'express';
import _ from 'lodash';
import validateMiddleware from '../middleware/validate.js';
import validateObjectId from '../middleware/validateObjectId.js';
import { Submission, validateSubmission } from '../models/submissionModel.js';

const router = express.Router();

// OK
// READ ALL SUBMISSION
router.get('/', async (req, res) => {
  const submission = await Submission.find().select('-__v').sort({ _id: -1 });
  res.send(submission);
});

// OK
// FIND SUBMISSION BY activityID/userEmail
router.get('/:id/:userEmail', validateObjectId, async (req, res) => {
  const submission = await Submission.find({
    userEmail: req.params.userEmail,
    activityID: req.params.id,
  }).select('-__v');
  res.send(submission);
});

// OK
// GET ALL USER SUBMISSION (RETURN ARRAY)
router.get('/:email', async (req, res) => {
  const submission = await Submission.find({
    userEmail: req.params.email,
  }).select('-__v');

  let userSubmitted = [];
  for (let i = 0; i < submission.length; i++) {
    userSubmitted.push(submission[i].activityID);
  }
  res.send(userSubmitted);
});

// OK
// POST ACTIVITY SUBMISSION
router.post('/', validateMiddleware(validateSubmission), async (req, res) => {
  const submission = new Submission({
    userEmail: req.body.userEmail,
    activityID: req.body.activityID,
    code: req.body.code,
    testCasePassed: req.body.testCasePassed,
    rubricScore: req.body.rubricScore,
    submissionResult: req.body.submissionResult,
  });

  await submission.save();

  res.send(submission);
});

// OK
// UPDATE ACTIVITY
// router.put('/:id', validateMiddleware(validateActivity), async (req, res) => {
//   const activity = await Activity.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       items: req.body.items,
//       dueDate: req.body.dueDate,
//       subject: req.body.subject,
//       status: req.body.status,
//       postedBy: req.body.postedBy,
//       instructions: req.body.instructions,
//       testCases: req.body.testCases,
//     },
//     { new: true }
//   );

//   if (!activity)
//     return res
//       .status(404)
//       .send('The activity with the given ID was not found.');
//   res.send(activity);
// });

// DELETE ACTIVITY
// router.delete('/:id', validateObjectId, async (req, res) => {
//   const activity = await Activity.findByIdAndRemove(req.params.id);

//   if (!activity)
//     return res.status(404).send('The activity with the given ID was not found');

//   res.send(activity);
// });

export default router;
