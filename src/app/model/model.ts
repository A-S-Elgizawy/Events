  export interface IApiRespons {
    "message": string,
    "result": boolean,
    "data": any
  }

  export interface IEvent {
  eventId: number
  eventName: string
  startDate: string
  startTime: string
  endDate: string
  organizerName: string
  userId: number
  price: number
  location: string
  imageUrl: string
  organizerId:number
  description:string
  endTime:string
  startmonthName?: number | string;
  startmonthNumber?: number;
  endmonthName?: number | string;
  endmonthNumber?: number;
}

export interface Root {
  eventId: number
  eventName: string
  startDate: string
  startTime: string
  endDate: string
  organizerName: string
  userId: number
  price: number
  location: string
  imageUrl: string
}

export interface User {
  userId: number
  name: string
  email: string
  password: string
  contactNo: string
  role: string
}
export interface login {
  password: string
  contactNo: string
}