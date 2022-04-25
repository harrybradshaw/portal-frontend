import React from 'react';
import {RequestState, useFetch} from '../utils/apiUtils';
import {ApiUserResponse} from '../api/apiUserResponse';
import {EquipmentList} from '../components/homepage/EquipmentList';
import {useAuthState} from '../auth';

export const Homepage: React.FC = () => {
    const {data: user, requestState} = useFetch<ApiUserResponse>(`users/details`);
    return (
        <div>
            {requestState === RequestState.Loaded && user?.equipment
                ? <EquipmentList equipment={user.equipment} />
                : 'Loading...'
            }
        </div>
    )
}
