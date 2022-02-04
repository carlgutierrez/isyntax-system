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

  // high res google image
  let picture = req.body.picture;
  if (picture.includes('https://lh3.googleusercontent.com'))
    picture = picture.replace('s96-c', 's500-c');

  user = new User({
    name: req.body.name,
    username,
    email: req.body.email.toLowerCase(),
    picture,
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

// UPDATE USER PROFILE
router.put('/:id', validateMiddleware(validateUser), async (req, res) => {
  const activity = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      picture: req.body.picture,
      role: req.body.role,
      totalScore: req.body.totalScore,
    },
    { new: true }
  );

  if (!activity)
    return res
      .status(404)
      .send('The activity with the given ID was not found.');
  res.send(activity);
});

export default router;
