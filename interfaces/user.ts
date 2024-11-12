import { Document } from "mongoose"

export interface User {
    name: string,
    lastname: string,
    birthdate: string,
    email: string,
    password: string,
    preferences?: Preferences,
    profile?: Profile,
    tasks?: Task[]
}

export interface UserDocument extends User, Document {}

export interface Preferences {
    reminder: boolean,
    reminderFrequency: string,
    dateFormat: string,
    timeFormat: string,
    taskPriority: string,
    uiMode: string,
    weekBegins: string,
}

interface Profile {
    avatar: string,
    bio: string,
    ocupation: string
}

export interface Task {
    taskName: string,
    taskDescription: string,
    deadLine: string,
    startTime: string,
    endTime: string,
    priority: string,
    status: string,
    tags?: Tags[],
    guests?: Guest[]
}

interface Tags {
    name: string
}

interface Guest {
    name: string,
    profilePic: string
}

export type UpdatePreferencesResponse = {
    preferences: Preferences;
};