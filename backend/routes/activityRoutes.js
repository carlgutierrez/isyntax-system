import express from 'express';
import _ from 'lodash';
import validateMiddleware from '../middleware/validate.js';
import validateObjectId from '../middleware/validateObjectId.js';
import { Activity, validateActivity } from '../models/activityModel.js';

const router = express.Router();

// OK
// READ ALL ACTIVITY
router.get('/', async (req, res) => {
  const activities = await Activity.find().select('-__v').sort({ _id: -1 });
  res.send(activities);
});

// OK
// FIND ACTIVITY BY _id
router.get('/:id', validateObjectId, async (req, res) => {
  const activity = await Activity.find({
    _id: req.params.id,
  }).select('-__v');
  res.send(activity);
});

// FIND TEACHER ACTIVITY BY EMAIL
router.get('/teacher/:email', async (req, res) => {
  const activity = await Activity.find({
    postedBy: req.params.email.toString(),
  }).select('-__v');
  res.send(activity);
});

// OK
// ADD NEW ACTIVITY
router.post('/', validateMiddleware(validateActivity), async (req, res) => {
  // const dueDate = new Date(req.body.dueDate);

  const activity = new Activity({
    title: req.body.title,
    items: req.body.items,
    dueDate: req.body.dueDate,
    subject: req.body.subject,
    status: req.body.status,
    postedBy: req.body.postedBy,
    postedByName: req.body.postedByName,
    instructions: req.body.instructions,
    testCases: req.body.testCases,
  });

  await activity.save();

  res.send(activity);
});

// OK
// UPDATE ACTIVITY
router.put('/:id', validateMiddleware(validateActivity), async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      items: req.body.items,
      dueDate: req.body.dueDate,
      subject: req.body.subject,
      status: req.body.status,
      postedBy: req.body.postedBy,
      instructions: req.body.instructions,
      testCases: req.body.testCases,
    },
    { new: true }
  );

  if (!activity)
    return res
      .status(404)
      .send('The activity with the given ID was not found.');
  res.send(activity);
});

// DELETE ACTIVITY
router.delete('/:id', validateObjectId, async (req, res) => {
  const activity = await Activity.findByIdAndRemove(req.params.id);

  if (!activity)
    return res.status(404).send('The activity with the given ID was not found');

  res.send(activity);
});

export default router;
