import {Meteor} from 'meteor/meteor'
import { TasksCollections } from './TasksCollections'

Meteor.methods({
    "tasks.insert"(doc) {
        return TasksCollections.insertAsync({...doc, userId: this.userId},);
    },

    "tasks.toggleChecked"({_id, isChecked}) {
        return TasksCollections.updateAsync(_id, {$set: {isChecked: !isChecked}});
    },

    "tasks.delete"({ _id }) {
        return TasksCollections.removeAsync(_id);
    },

    "tasks.setIsEditing"({_id, isEditing}) {
        return TasksCollections.updateAsync(_id, {$set: {isEditing: !isEditing}});
    },

    "tasks.updateText"([_id, text]) {
        return TasksCollections.updateAsync(_id, {$set: {text: text}});
    }
});