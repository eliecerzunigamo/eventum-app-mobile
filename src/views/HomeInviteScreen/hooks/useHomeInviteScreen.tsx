import React, { useState, useEffect } from "react";
import { useApi } from "../../../common/utils/useApi";

export interface Events {
  _id: string;
  title: string;
  description: string;
  image_path: string;
  fac: string;
  prog: string;
  date: Date;
  time: string;
  __v: number;
}

export interface Params {
  page: number;
  size: number;
}

export const useHomeInviteScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [page, setPage] = useState(1);

  const { get } = useApi();

  const getInitialEvents = async () => {
    setLoading(true);
    try {
      const path = "events/all?page=1&size=20";
      const resp = await get<Events[], null>(path, null);
      setEvents(resp.data);
      setPage(2);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async (size: number) => {
    setLoading(true);
    try {
      const path = "events/all?page=" + page + "&size=" + size;
      const resp = await get<Events[], null>(path, null);
      setEvents([...events, ...resp.data]);
      setPage(page + 1);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getEvents,
    getInitialEvents,
    events,
  };
};
