import dotenv from 'dotenv';
import users from './data/users.js';
import badges from './data/badges.js';
import activities from './data/activities.js';
import subjects from './data/subjects.js';
import { User } from './models/userModel.js';
import { Badge } from './models/badgeModel.js';
import { Activity } from './models/activityModel.js';
import { Subject } from './models/subjectModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    // await Badge.deleteMany();
    await Activity.deleteMany();
    await Subject.deleteMany();

    const createdUsers = await User.insertMany(users);

    // const adminUser = createdUsers[0]._id;
    // const notAdminUser = createdUsers[1]._id;

    // const adminBadge = badges[0].map(badge => {
    //   return { ...badge, user: adminUser };
    // });

    // const userBadge = badges[1].map(badge => {
    //   return { ...badge, user: notAdminUser };
    // });

    // await Badge.insertMany(adminBadge);
    // await Badge.insertMany(userBadge);
    await Activity.insertMany(activities);
    await Subject.insertMany(subjects);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Badge.deleteMany();
    await Activity.deleteMany();
    await Subject.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
