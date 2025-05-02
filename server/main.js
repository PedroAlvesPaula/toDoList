import { Meteor } from 'meteor/meteor';
import { TasksCollections } from '/imports/api/TasksCollections';
import { Accounts } from 'meteor/accounts-base';
import { promisify } from 'utils'
import "../imports/api/TasksPublication"; 
import "../imports/api/TasksMethods"

const SEED_USERNAME = "pedro";
const SEED_PASSWORD = "123";

const insertTask = (taskText, isChecked, user) => {
  TasksCollections.insertAsync({ text : taskText, createdAt: new Date(), isChecked: isChecked, userId: user._id});
}

Meteor.startup( async () => {

  if(!(await Accounts.findUserByUsername(SEED_USERNAME))){

    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollections.find().countAsync()) === 0) {
    [
      {taskText: "task", isChecked: false}
    ].map(({ taskText, isChecked }) => {
      insertTask(taskText, isChecked, user);
    })
  }
})
