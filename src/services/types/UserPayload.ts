import moment from "moment";

export interface UserPayload {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  birthDate: Date
}