import { User } from "./user";

export interface Session {
    id?: number
    endedAt: Date
    startedAt: Date
    users: [User]
    duration?: number
}