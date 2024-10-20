export interface Task {
    id?: number,
    name: string,
    description: string,
    date: string,
    time: string,
    until: string,
    tags: string[],
    persons: string[]
}