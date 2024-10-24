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

interface Preferences {
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

interface Task {
    taskName: string,
    taskDescription: string,
    deadLine: string,
    priority: string,
    status: string,
    tags: Tags[],
    guests: Guest[]
}

interface Tags {
    name: string
}

interface Guest {
    name: string,
    profilePic: string
}