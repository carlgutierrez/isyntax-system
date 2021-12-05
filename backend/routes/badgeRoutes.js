import express from 'express';
import validateMiddleware from '../middleware/validate.js';
import { Badge, validateBadge } from '../models/badgeModel.js';
import { User, validateUser } from '../models/userModel.js';

const router = express.Router();

// OK
// READ ALL BADGE
router.get('/', async (req, res) => {
  const badges = await Badge.find().select('-__v');
  res.send(badges);
});

// OK
// READ ALL BADGE OF A SPECIFIC USER
router.get('/me', async (req, res) => {
  const badges = await Badge.find({ user: req.body._id }).select('-_id -__v');
  res.send(badges);
});

// OK
// ADD BADGE USER
router.post('/', validateMiddleware(validateBadge), async (req, res) => {
  // VALIDATE USER EXIST
  const user = await User.findById(req.body.user);
  if (!user) return res.status(400).send('User do not exist.');

  // VALIDATE IF BADGE HAS NOT BEEN ACQUIRED
  let badge = await Badge.find().and([
    { user: req.body.user },
    { name: req.body.name },
  ]);
  if (badge.length === 1)
    return res.status(400).send('Badge already acquired.');

  badge = new Badge({
    name: req.body.name,
    user: req.body.user,
  });
  await badge.save();

  res.send(badge);
});

export default router;
