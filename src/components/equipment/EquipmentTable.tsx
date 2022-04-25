import React from 'react';
import {Table} from 'react-bootstrap';
import {useFetch} from '../../utils/apiUtils';
import {ApiEquipmentResponse} from '../../api/apiEquipmentResponse';
import {useNavigate} from 'react-router-dom';

export const EquipmentTable: React.FC = () => {
    const {data: allEquipment} = useFetch<ApiEquipmentResponse[]>('equipment');
    const navigate = useNavigate();
    if (!allEquipment) return (<>Loading....</>)

    return (
        <Table
            hover
        >
            <thead>
                <tr>
                    <td>
                        Equipment Name
                    </td>
                    <td>
                        Manager(s)
                    </td>
                </tr>
            </thead>
            <tbody>
            {allEquipment.map(equipment => {
                return (
                    <tr
                        key={equipment.id}
                    >
                        <td
                            onClick={() => navigate(`/equipment/${equipment.id}`)}
                        >
                            {equipment.fullname}
                        </td>
                        <td>{equipment.users.map(user => user.username).join(', ')}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}
