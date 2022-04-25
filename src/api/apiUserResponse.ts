import {Equipment} from './equipment';
import {EquipmentUserList} from './equipmentUserList';

export enum SiteRole {
    User,
    Admin,
}

export type ApiUserResponse = {
    id: string,
    username: string,
    firstname: string,
    surname: string,
    email: string,
    equipment?: Equipment[],
    role: SiteRole,
    equipmentUserList?: EquipmentUserList,
}
