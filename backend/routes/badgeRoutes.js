import express from 'express';
import validateMiddleware from '../middleware/validate.js';
import { Badge, validateBadge } from '../models/badgeModel.js';

const router = express.Router();

// OK
// READ ALL BADGES
router.get('/', async (req, res) => {
  const badges = await Badge.find().select('-__v').sort({ _id: -1 });
  res.send(badges);
});

// OK
// FIND BADGES BY email
router.get('/:email', async (req, res) => {
  let user = await Badge.findOne({
    userEmail: req.params.email.toLowerCase(),
  });
  if (!user) return res.status(200).send([]);

  let badges = {};
  badges = await Badge.find({
    userEmail: req.params.email.toLowerCase(),
  }).select('-__v');
  let userActivities = badges[0].badges;
  return res.send(userActivities);

  // res.send(badges);
});

// OK
// POST ACTIVITY BADGE
router.post('/', validateMiddleware(validateBadge), async (req, res) => {
  // VALIDATE IF EMAIL IS UNIQUE
  let user = await Badge.findOne({
    userEmail: req.body.userEmail.toLowerCase(),
  });
  if (user) return res.status(400).send('User already registered.');

  const badge = new Badge({
    userEmail: req.body.userEmail,
    badges: req.body.badges,
  });

  await badge.save();

  res.send(badge);
});

// OK
// UPDATE ACTIVITY
router.put('/:email', validateMiddleware(validateBadge), async (req, res) => {
  const badge = await Badge.findOneAndUpdate(
    { userEmail: req.params.email },
    {
      userEmail: req.params.email,
      badges: req.body.badges,
    },
    { new: true }
  );

  if (!badge) return res.status(200).send([]);

  res.send(badge);
});

// DELETE ACTIVITY
// router.delete('/:id', validateObjectId, async (req, res) => {
//   const activity = await Activity.findByIdAndRemove(req.params.id);

//   if (!activity)
//     return res.status(404).send('The activity with the given ID was not found');

//   res.send(activity);
// });

export default router;
