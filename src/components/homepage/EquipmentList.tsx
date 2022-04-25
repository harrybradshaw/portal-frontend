import {Accordion, Card, Col, Row, Button} from 'react-bootstrap';
import React from 'react';
import {Equipment} from '../../api/equipment';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import {useNavigate} from 'react-router-dom';
import {UserLevel} from '../../api/equipmentUserList';

interface EquipmentListProps {
    equipment: Equipment[]
}

export const EquipmentList: React.FC<EquipmentListProps> = ({
    equipment,
}) => {
    const navigate = useNavigate();
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <AccordionHeader>
                    Your Equipment
                </AccordionHeader>
                <Accordion.Body>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {equipment.map(eq => {
                            const userLevel = eq.equipmentUserList?.userLevel as string;
                            return (
                                <Col
                                    key={`${eq.id}-col`}
                                >
                                    <Card
                                        key={`${eq.id}-card`}
                                        className="h-100"
                                        border={
                                            eq.status === 'Operational'
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        <Card.Body
                                            onClick={() => navigate(`/equipment/${eq.id}`)}
                                        >
                                            <Card.Title>
                                                {eq.fullname}
                                            </Card.Title>
                                            <Card.Subtitle>
                                                {userLevel}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                {eq.room}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col className={'d-grid'}>
                                                    <Button
                                                        variant={'outline-primary'}
                                                        onClick={() => navigate(`/equipment/${eq.id}`)}
                                                    >
                                                        {userLevel === UserLevel.manager || userLevel === UserLevel.superuser
                                                            ? 'Manage'
                                                            : 'View'
                                                        }
                                                    </Button>
                                                </Col>
                                                <Col className={'d-grid'}>
                                                    <Button
                                                        disabled
                                                    >
                                                        Book
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
