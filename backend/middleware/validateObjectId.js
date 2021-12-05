import mongoose from 'mongoose';

export default (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    // return res.status(400).send('Invalid ID.');
    return res.status(200).send([]);

  next();
};
