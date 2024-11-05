import { Schema, model } from "mongoose";
import { User } from "../interfaces/user";

const PreferencesSchema: Schema = new Schema({
    reminder: { type: Boolean, default: false },
    reminderFrequency: { type: String, default: '' },
    dateFormat: { type: String, default: '' },
    timeFormat: { type: String, default: '' },
    uiMode: { type: String, default: 'light' },
    weekBegins: { type: String, default: 'monday' }
}, {
    _id: false
});

const ProfileSchema: Schema = new Schema({
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    ocupation: { type: String, default: '' }
}, {
    _id: false
});

const TaskSchema: Schema = new Schema({
    taskName: {type: String, default: ''},
    taskDescription: { type: String, default: ''},
    deadLine: { type: String, default: ''},
    startTime: { type: String, default: ''},
    endTime: { type: String, default: ''},
    priority: { type: String, default: '' },
    status: { type: String, default: 'Pending' },
    tags: { type: Array, default: []},
    guests: { type: Array, default: [] }
})

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    birthdate: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    preferences: {type: PreferencesSchema, default: {}},
    profile: {type: ProfileSchema, default: {}},
    tasks: { type: [TaskSchema], default: [] }
}, {
    versionKey: false
});

export const UserModel = model<User>('User', UserSchema);