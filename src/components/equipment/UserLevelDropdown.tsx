import React from 'react';
import {UserLevel} from '../../api/equipmentUserList';
import {FormSelect} from 'react-bootstrap';
import {useFetchWithParams} from '../../utils/apiUtils';

interface UserLevelDropdownProps {
    usersLevel: UserLevel,
    equipmentId: string,
    userId: string,
    refreshEquipment: () => Promise<void>,
}

export const UserLevelDropdown: React.FC<UserLevelDropdownProps> = ({
    usersLevel,
    equipmentId,
    userId,
    refreshEquipment,
}) => {
    const {refresh: editUser} = useFetchWithParams('levels/edit');

    const handleChange = async (value: string) => {
        const payload = {
            equipmentId: equipmentId,
            equipmentUserId: userId,
            userLevel: value,
        }
        await editUser(payload);
        await refreshEquipment();
    }

    return (
        <FormSelect
            value={usersLevel}
            onChange={e => handleChange(e.target.value)}
        >
            {(Object.values(UserLevel) as string[]).map(level => (
                <option
                    value={level}
                    key={level}
                >
                    {level}
                </option>
            ))}
        </FormSelect>
    )
}
