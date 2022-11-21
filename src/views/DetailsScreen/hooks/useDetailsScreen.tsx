import React, { useState } from "react";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { useApi } from "../../../common/utils/useApi";
import { Alert } from "react-native";

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
  const [error, setError] = useState(false);
  const [event, setEvent] = useState<FavEvent>();

  const { get, post, _delete } = useApi();

  const getFavoriteEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/fav-events?event_id=${id}`;
      const resp = await get<FavEvent, null>(path, null);
      setEvent(resp.data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/fav-events`;
      const resp = await post<{ event_id: string }, AddedFavEvent, null>(path, {
        event_id: id,
      });
      getFavoriteEvent(id);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavoriteEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/fav-events?event_id=${id}`;
      const resp = await _delete<null, null>(path, null);
      getFavoriteEvent(id);
    } catch (error : any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    event,
    getFavoriteEvent,
    addFavoriteEvent,
    deleteFavoriteEvent,
  };
};
