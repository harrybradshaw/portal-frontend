import {ApiUserResponse} from './apiUserResponse';
import {EquipmentUserList} from './equipmentUserList';

export type Equipment = {
    id: string,
    fullname: string,
    shortname: string,
    users?: ApiUserResponse[],
    bookable: boolean,
    status: string,
    comments: string,
    ra: string,
    raUpdate: Date,
    room: string,
    eqIpAd: string,
    eqVncPass: string,
    equipmentUserList?: EquipmentUserList,
}


