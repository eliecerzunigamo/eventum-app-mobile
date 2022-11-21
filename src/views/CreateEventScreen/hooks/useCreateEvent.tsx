import React from "react";
import {useState} from 'react';
import { Alert } from "react-native";
import { useApi } from '../../../common/utils/useApi';


export interface EventToCreate {
    title: string;
    description: string;
    fac: string;
    prog: string;
    date: string;
    time: string;
    image?: string;
  }

export const useCreateEvent = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const {post} = useApi();

    const createEvent = async (body:EventToCreate) => {
        setLoading(true);
        try {
            const path = "events/create";
            const resp = await post<EventToCreate, any, null>(path, body);
            setSuccess(true);
        } catch (error : any) {
            setError(true);
            if( error.response.status === 400){
              Alert.alert(error.response.data.message);
            } else {
              Alert.alert(error);
            }
        } finally {
            setLoading(false);
        }
    };

            

  return {
    loading,
    error,
    success,
    createEvent
  };
};
