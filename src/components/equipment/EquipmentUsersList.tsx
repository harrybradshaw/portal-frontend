import {Card, ListGroup, ListGroupItem, Col, Row, Button} from 'react-bootstrap';
import {UserLevel} from '../../api/equipmentUserList';
import {UserLevelDropdown} from './UserLevelDropdown';
import {AddUserDropdown} from './AddUserDropdown';
import React from 'react';
import {ApiEquipmentResponse} from '../../api/apiEquipmentResponse';
import {X} from 'react-bootstrap-icons';
import {DeleteUserButton} from './DeleteUserButton';

interface EquipmentUsersListProps {
    equipment: ApiEquipmentResponse,
    refreshEquipment: () => Promise<void>,
}

export const EquipmentUsersList: React.FC<EquipmentUsersListProps> = ({
                                                                          equipment,
                                                                          refreshEquipment,
                                                                      }) => {
    return (
        <Card>
            <Card.Header as={'h5'}>
                User List
            </Card.Header>
            <ListGroup
                variant={'flush'}
            >
                {equipment.users.map(user => {
                    const fullName = [user.firstname, user.surname].join(' ');
                    return (
                        <ListGroupItem
                            key={user.id}
                        >
                            <Row>
                            <Col>
                                <div className={'fw-bold'}>
                                    {fullName}
                                </div>
                                <div>
                                    {user.username}
                                </div>
                            </Col>

                            {equipment.level === UserLevel.manager
                                ? <>
                                    <Col
                                        className={'d-flex'}
                                    >
                                        <UserLevelDropdown
                                            usersLevel={user.equipmentUserList?.userLevel ?? UserLevel.trainee}
                                            equipmentId={equipment.id}
                                            userId={user.id}
                                            refreshEquipment={refreshEquipment}
                                        />
                                    </Col>
                                    <Col
                                        xs={2}
                                        className={'d-flex justify-content-center'}
                                    >
                                        <DeleteUserButton
                                            equipmentId={equipment.id}
                                            userId={user.id}
                                            refreshEquipment={refreshEquipment}
                                        />
                                    </Col>

                                </>
                                : <Col>
                                    {user.equipmentUserList?.userLevel}
                                </Col>
                            }
                            </Row>
                        </ListGroupItem>
                    )
                })}
                {equipment.level === UserLevel.manager &&
                    <ListGroupItem>
                        <AddUserDropdown
                            equipmentId={equipment.id}
                            refreshEquipment={refreshEquipment}
                        />
                    </ListGroupItem>
                }
            </ListGroup>
        </Card>
    )
}
