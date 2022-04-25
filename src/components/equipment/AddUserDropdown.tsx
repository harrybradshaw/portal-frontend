import React, {useEffect, useState} from 'react';
import {Button, Col, FormSelect, Row} from 'react-bootstrap';
import {RequestState, useFetch, useFetchWithParams} from '../../utils/apiUtils';
import {ApiUserResponse} from '../../api/apiUserResponse';

interface AddUserDropdownProps {
    equipmentId: string,
    refreshEquipment: () => Promise<void>,
}
export const AddUserDropdown: React.FC<AddUserDropdownProps> = ({
                                                                    equipmentId,
    refreshEquipment,
                                                                }) => {
    const {data} = useFetch<ApiUserResponse[]>(`equipment/${equipmentId}/possibleUsers`);
    const {refresh, requestState: addRequestState} = useFetchWithParams('levels/add');
    const [value, setValue] = useState<string|undefined>(undefined);

    const handleAdd = async () => {
        if (value) {
            setValue(undefined);
            const res = await refresh({
                equipmentId: equipmentId,
                equipmentUserId: value,
            });
        }
    }

    useEffect(() => {
        const refEquipment = async () => {
            if (addRequestState === RequestState.Loaded) {
                await refreshEquipment()
            }
        }
        void refEquipment();
    },[addRequestState, refreshEquipment])

    return (
        <div>
            <Row>
                <Col>
                <FormSelect
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'test'}
                >
                    <option
                        disabled
                        selected={value === undefined}
                    >
                        Add as trainee...
                    </option>
                    {data?.map(user => {
                        const fullName = [user.firstname, user.surname].join(' ');
                        return(
                            <option
                                value={user.id}
                            >
                                {`${fullName} (${user.username})`}
                            </option>
                        )})}
                </FormSelect>
                </Col>
                <Col
                    sm={3}
                >
                    <div className="d-grid gap-2">
                <Button
                    variant={'success'}
                    onClick={handleAdd}
                    disabled={!value}
                >
                    Add
                </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
