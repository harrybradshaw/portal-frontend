import React from 'react';
import {useParams} from 'react-router-dom';
import {useFetch} from '../utils/apiUtils';
import {ApiEquipmentResponse} from '../api/apiEquipmentResponse';
import {Col, Container, Row} from 'react-bootstrap';
import {EquipmentUsersList} from '../components/equipment/EquipmentUsersList';
import {EquipmentInfo} from '../components/equipment/EquipmentInfo';

export const IndividualEquipmentPage: React.FC = () => {
    const {equipmentId} = useParams();
    const {data: equipment, refresh} = useFetch<ApiEquipmentResponse>(`equipment/${equipmentId}`);

    if (!equipment) return (<> Loading...</>);

    return (
        <Container>
            <Row>
                <h1>
                    {equipment.fullname}
                </h1>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                    <EquipmentUsersList
                        equipment={equipment}
                        refreshEquipment={refresh}
                    />
                </Col>
                <Col>
                    <EquipmentInfo equipment={equipment} />
                </Col>
            </Row>
        </Container>
    )
}
