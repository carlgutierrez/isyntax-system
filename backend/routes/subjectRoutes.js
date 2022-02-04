import express from 'express';
import _ from 'lodash';
import validateMiddleware from '../middleware/validate.js';
import validateObjectId from '../middleware/validateObjectId.js';
import { Subject, validateSubject } from '../models/subjectModel.js';

const router = express.Router();

// OK
// READ ALL SUBJECTS
router.get('/', async (req, res) => {
  const subjects = await Subject.find().select('-__v').sort({ _id: -1 });
  res.send(subjects);
});

// OK
// FIND SUBJECTS BY email
router.get('/:email', async (req, res) => {
  let user = await Subject.findOne({
    userEmail: req.params.email.toLowerCase(),
  });
  if (!user) return res.status(200).send([]);

  let subjects = {};
  subjects = await Subject.find({
    userEmail: req.params.email.toLowerCase(),
  }).select('-__v');
  let userActivities = subjects[0].subjects;
  return res.send(userActivities);

  // res.send(subjects);
});

// OK
// POST ACTIVITY SUBJECT
router.post('/', validateMiddleware(validateSubject), async (req, res) => {
  // VALIDATE IF EMAIL IS UNIQUE
  let user = await Subject.findOne({
    userEmail: req.body.userEmail.toLowerCase(),
  });
  if (user) return res.status(400).send('User already registered.');

  const subject = new Subject({
    userEmail: req.body.userEmail,
    subjects: req.body.subjects,
  });

  await subject.save();

  res.send(subject);
});

// OK
// UPDATE ACTIVITY
router.put('/:email', validateMiddleware(validateSubject), async (req, res) => {
  const subject = await Subject.findOneAndUpdate(
    { userEmail: req.params.email },
    {
      userEmail: req.params.email,
      subjects: req.body.subjects,
    },
    { new: true }
  );

  if (!subject) return res.status(200).send([]);

  res.send(subject);
});

// DELETE ACTIVITY
// router.delete('/:id', validateObjectId, async (req, res) => {
//   const activity = await Activity.findByIdAndRemove(req.params.id);

//   if (!activity)
//     return res.status(404).send('The activity with the given ID was not found');

//   res.send(activity);
// });

export default router;
