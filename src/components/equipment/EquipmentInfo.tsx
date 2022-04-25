import React from 'react';
import {Card} from 'react-bootstrap';
import {ApiEquipmentResponse} from '../../api/apiEquipmentResponse';
import CardHeader from 'react-bootstrap/CardHeader';

interface EquipmentInfoProps {
    equipment: ApiEquipmentResponse,
}

export const EquipmentInfo: React.FC<EquipmentInfoProps> = ({
                                                                equipment,
                                                            }) => {
    return (
        <Card>
            <CardHeader as={'h5'}>
                Equipment Information
            </CardHeader>
            <Card.Body>
                <Card.Text>
                    <b>Status:</b> {equipment.status}
                </Card.Text>
                <Card.Text>
                    <b>Comments:</b> {equipment.comments}
                </Card.Text>
                <Card.Text>
                    <b>Room:</b> {equipment.room}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
