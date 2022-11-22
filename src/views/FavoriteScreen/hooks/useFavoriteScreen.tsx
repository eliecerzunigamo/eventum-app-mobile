import React from "react";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { useApi } from "../../../common/utils/useApi";
import { Faculties } from "../../HomeScreen/hooks/useHome";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

export const useFavoriteScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [eventsToDisplay, setEventsToDisplay] = useState<Events[]>([]);
  const [page, setPage] = useState(1);
  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [query, setQuery] = useState("");

  const { get } = useApi();

  const getEvents = async (
    size: number,
    faculty_id?: string,
    program_id?: string,
    reset?: boolean,
    query?: string
  ) => {
    setLoading(true);
    const fac = faculty_id
      ? faculty_id !== "default"
        ? `&faculty_id=${faculty_id}`
        : ""
      : "";
    const prog = program_id
      ? program_id !== "default"
        ? `&program_id=${program_id}`
        : ""
      : "";
    try {
      if (reset) {
        const path = `events/fav-events?page=1&size=${size}${fac}${prog}&query=${query}`;
        const resp = await get<Events[], null>(path, null);
        setEvents(resp.data);
        setPage(1);
      } else {
        const path = `events/fav-events?page=${
          page + 1
        }&size=${size}${fac}${prog}&query=${query}`;
        const resp = await get<Events[], null>(path, null);
        setEvents([...events, ...resp.data]);
        setPage(page + 1);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFacultiesAndPrograms = async () => {
    setLoading(true);
    try {
      const path = `events/all-faculties`;
      const resp = await get<Faculties[], null>(path, null);
      setFaculties(resp.data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handler = useCallback(
    debounce((query) => {
      getEvents(20, undefined, undefined, true, query);
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
    events,
    getFacultiesAndPrograms,
    faculties,
    eventsToDisplay,
    setQuery,
    query,
  };
};
