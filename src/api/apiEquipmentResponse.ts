import {ApiUserResponse} from './apiUserResponse';

export type ApiEquipmentResponse = {
    id: string,
    fullname: string,
    bookable: boolean,
    room: string,
    comments: string,
    status: string,
    users: ApiUserResponse[],
    level: string,
}
