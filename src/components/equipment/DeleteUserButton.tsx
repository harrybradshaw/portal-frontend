import {useFetchWithParams} from '../../utils/apiUtils';
import React from 'react';
import {X} from 'react-bootstrap-icons';
import {Button} from 'react-bootstrap';

interface DeleteUserButtonProps {
    equipmentId: string,
    userId: string,
    refreshEquipment: () => Promise<void>,
}

export const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
    equipmentId,
    userId,
    refreshEquipment,
                                                                  }) => {
    const {refresh: deleteUser} = useFetchWithParams('levels/delete');

    const handleClick = async () => {
        const payload = {
            equipmentId: equipmentId,
            equipmentUserId: userId,
        }
        await deleteUser(payload);
        await refreshEquipment();
    }

    return (
        <Button
            variant={'outline-danger'}
            onClick={handleClick}
        >
            <X size={16}/>
        </Button>
    )
}
