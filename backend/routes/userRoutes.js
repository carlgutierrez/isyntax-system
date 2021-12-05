import express from 'express';
import validateMiddleware from '../middleware/validate.js';
import { User, validateUser } from '../models/userModel.js';

const router = express.Router();

// OK
// READ ALL USERS
router.get('/', async (req, res) => {
  const users = await User.find().select('-__v');
  res.send(users);
});

// carlg6445@gmail.com
// FIND USER BY EMAIL
router.get('/:email', async (req, res) => {
  const user = await User.find({
    email: req.params.email.toLowerCase(),
  }).select('-__v');
  res.send(user);
});

// OK
// ADD NEW USER
router.post('/', validateMiddleware(validateUser), async (req, res) => {
  // VALIDATE IF EMAIL IS UNIQUE
  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) return res.status(400).send('User already registered.');

  const indexOfAt = req.body.email.indexOf('@');
  const username = req.body.email.slice(0, indexOfAt).toLowerCase();
  user = new User({
    name: req.body.name,
    username,
    email: req.body.email.toLowerCase(),
    picture: req.body.picture,
  });

  await user.save();

  // res.send({
  //   name: user.name,
  //   username: req.body.username,
  //   email: user.email,
  //   picture: user.picture,
  //   _id: user._id,
  //   isAdmin: user.isAdmin,
  //   totalScore: user.totalScore,
  // });
  res.send(user);
});

export default router;
