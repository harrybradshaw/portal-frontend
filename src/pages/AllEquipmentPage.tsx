import React from 'react';
import {EquipmentTable} from '../components/equipment/EquipmentTable';
import {Container} from 'react-bootstrap';

export const AllEquipmentPage: React.FC = () => {
    return (
        <Container>
            <EquipmentTable />
        </Container>
    );
};
