export enum UserLevel {
    manager = 'Manager',
    superuser = 'superuser',
    bUser = 'B user',
    cUser = 'C user',
    trainee = 'Trainee',
}

export type EquipmentUserList = {
    userLevel: UserLevel,
}
