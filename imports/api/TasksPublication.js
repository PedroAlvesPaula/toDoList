import { Meteor } from "meteor/meteor";
import { TasksCollections } from "./TasksCollections";

Meteor.publish("tasks", function () {
    const userId = this.userId;
    if (!userId){
        return this.ready();
    }
    return TasksCollections.find({ userId });
});