import React from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { useApi } from "../../../common/utils/useApi";

export interface EventToCreate {
  title: string;
  description: string;
  fac?: string;
  prog?: string;
  init_date?: string;
  end_date?: string;
  event_type: string;
  image?: string;
  place?: string;
}

export const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const { post } = useApi();

  const createEvent = async (body: EventToCreate) => {
    setSuccess(false);
    setLoading(true);
    try {
      const path = "events/create";
      await post<EventToCreate, any, null>(path, body);
      setSuccess(true);
    } catch (error: any) {
      setOpenErrorModal(true);
      if (!error.response.data.message) {
        setError("Error de conexión");
        return;
      }

      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  return {
    loading,
    error,
    success,
    createEvent,
    openErrorModal,
    closeErrorModal,
  };
};
