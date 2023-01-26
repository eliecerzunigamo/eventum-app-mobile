import React, { useState } from "react";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { useApi } from "../../../common/utils/useApi";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

interface FavEvent extends Events {
  isFav: boolean;
}

export interface AddedFavEvent {
  event_id: string;
  user_id: string;
  _id: string;
  __v: number;
}

export const useDetailsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState<FavEvent>();
  const [isSchedule, setIsSchedule] = useState(false);

  const { get, post, _delete } = useApi();

  const getFavoriteEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/fav-events?event_id=${id}`;
      const resp = await get<FavEvent, null>(path, null);
      setEvent(resp.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/schedule-events?event_id=${id}`;
      const resp = await get<FavEvent, null>(path, null);
      setIsSchedule(resp.data.isFav);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addScheduleEvent = async (id: string) => {
    setLoadingChange(true);
    setLoading(true);
    try {
      const path = `events/schedule-events`;
      const token = await messaging().getToken();
      const resp = await post<
        { event_id: string; token: string },
        AddedFavEvent,
        null
      >(path, {
        event_id: id,
        token,
      });
      getScheduleEvent(id);
      messaging()
        .subscribeToTopic("e" + id)
        .then(() => console.log("subscribed"))
        .catch((err) => console.log(err));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingChange(false);
    }
  };

  const deleteScheduleEvent = async (id: string) => {
    setLoadingChange(true);
    setLoading(true);
    try {
      const path = `events/schedule-events?event_id=${id}`;
      const resp = await _delete<null, null>(path, null);
      getScheduleEvent(id);
      messaging()
        .unsubscribeFromTopic("e" + id)
        .then(() => console.log("unsubscribed"))
        .catch((err) => console.log(err));
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingChange(false);
    }
  };

  const addFavoriteEvent = async (id: string) => {
    setLoadingChange(true);
    setLoading(true);
    try {
      const path = `events/fav-events`;
      const token = await messaging().getToken();
      await post<{ event_id: string; token: string }, AddedFavEvent, null>(
        path,
        {
          event_id: id,
          token,
        }
      );
      getFavoriteEvent(id);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingChange(false);
    }
  };

  const deleteFavoriteEvent = async (id: string) => {
    setLoadingChange(true);
    setLoading(true);
    try {
      const path = `events/fav-events?event_id=${id}`;
      await _delete<null, null>(path, null);
      getFavoriteEvent(id);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
      setLoadingChange(false);
    }
  };

  return {
    loading,
    error,
    event,
    isSchedule,
    getFavoriteEvent,
    addFavoriteEvent,
    deleteFavoriteEvent,
    getScheduleEvent,
    addScheduleEvent,
    deleteScheduleEvent,
    loadingChange,
  };
};
