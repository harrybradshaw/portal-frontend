import {useEffect, useState} from 'react';
import camelcaseKeys from 'camelcase-keys';
import {logoutUser, useAuthDispatch, useAuthState} from '../auth';

export const baseUrl = 'http://localhost:8080';

export enum RequestState {
    Initialised,
    Loading,
    Loaded,
}

export const useFetch = <T>(url: string, skip = false) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string|undefined>(undefined);
    const [refetchIndex, setRefetchIndex] = useState(skip ? 0 : 1);
    const [requestState, setRequestState] = useState(RequestState.Initialised);
    const authState = useAuthState();
    const authDispatch = useAuthDispatch();

    const refresh = async () => setRefetchIndex(prevRefetchIndex => prevRefetchIndex + 1)

    useEffect(() => {
        setRequestState(RequestState.Loading);
        setError(undefined);
        const makeApiRequest = async () => {
            if (refetchIndex === 0) return;
            try {
                const response = await fetch(`${baseUrl}/${url}`,
                    {
                        headers: {'authorization': authState.token}
                    });

                if(response.status === 403 || response.status === 401) {
                    await logoutUser(authDispatch);
                }
                const loadedData = camelcaseKeys(await response.json()) as T;
                setData(loadedData);
            } catch (err: any) {
                setError(err);
            }
            setRequestState(RequestState.Loaded);
        }
        void makeApiRequest();
    },[url, authState.token, authDispatch, refetchIndex, skip]);

    return {data, requestState, error, refresh}
}

export const useFetchWithParams = <T>(url: string, skip= true) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string|undefined>(undefined);
    const [requestState, setRequestState] = useState(RequestState.Initialised);
    const [params, setParams] = useState<object|undefined>(undefined);
    const authState = useAuthState();
    const authDispatch = useAuthDispatch();
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refresh = async (params?: object) => {
        console.log('refresh');
        setRefetchIndex(prevRefetchIndex => prevRefetchIndex + 1);
        if (params) setParams(params);
    }

    useEffect(() => {
        const makeApiRequest = async () => {
            if (refetchIndex === 0 || !params) return;
            setRequestState(RequestState.Loading);
            setError(undefined);
            try {
                const response = await fetch(`${baseUrl}/${url}`,
                    {
                        headers: {
                            'authorization': authState.token,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(params),
                    });

                if(response.status === 403 || response.status === 401) {
                    await logoutUser(authDispatch);
                }
                const loadedData = camelcaseKeys(await response.json()) as T;
                setData(loadedData);
            } catch (err: any) {
                setError(err);
            }
            setRequestState(RequestState.Loaded);
        }
        void makeApiRequest();
    },[url, authState.token, authDispatch, skip, params, refetchIndex]);

    return {data, requestState, error, refresh}
}
