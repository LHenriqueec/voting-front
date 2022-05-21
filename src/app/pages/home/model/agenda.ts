import { Session } from "./session";

export interface Agenda {
    active: boolean;
    subject: String;
    session: Session;
}