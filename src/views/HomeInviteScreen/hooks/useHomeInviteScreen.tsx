import React, { useState, useEffect, useCallback } from "react";
import { useApi } from "../../../common/utils/useApi";
import { debounce } from "lodash";
export interface Events {
  __v: number;
  _id: string;
  created_at: string;
  description: string;
  end_date?: string;
  end_time: string;
  event_type: string;
  fac: string;
  image_path: string;
  init_date: string;
  init_time: string;
  isFav: boolean;
  place: string;
  prog: string;
  title: string;
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
  const [query, setQuery] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async (size: number, query: string) => {
    setLoading(true);
    try {
      const path =
        "events/all?page=" + page + "&size=" + size + "&query=" + query;
      const resp = await get<Events[], null>(path, null);
      setEvents([...events, ...resp.data]);
      setPage(page + 1);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handler = useCallback(
    debounce((query) => {
      getEvents(20, query);
    }, 300),
    []
  );

  useEffect(() => {
    handler(query);
  }, [query]);

  return {
    loading,
    error,
    getEvents,
    getInitialEvents,
    events,
    query,
    setQuery,
  };
};
