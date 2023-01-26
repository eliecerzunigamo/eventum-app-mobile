import React, { useState, useEffect, useCallback } from "react";
import { useApi } from "../../../common/utils/useApi";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { debounce } from "lodash";
import { Faculties } from "../../HomeScreen/hooks/useHome";

export const useMyEvents = (getEvent = true) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [page, setPage] = useState(1);
  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [query, setQuery] = useState("");

  const { get, _delete } = useApi();

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
        const path = `events/all-auth?page=1&size=${size}${fac}${prog}&query=${query}&my_events=true`;
        const resp = await get<Events[], null>(path, null);
        setEvents(resp.data);
        setPage(1);
      } else {
        const path = `events/all?page=${
          page + 1
        }&size=${size}${fac}${prog}&query=${query}`;
        const resp = await get<Events[], null>(path, null);
        setEvents([...events, ...resp.data]);
        setPage(page + 1);
      }
    } catch (error) {
      setError(true);
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
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setLoading(true);
    try {
      const path = `events/event?event_id=${id}`;
      await _delete<Events[], null>(path, null);
      return true;
    } catch (error) {
      setError(true);
      return false;
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
    if (getEvent) handler(query);
  }, [query]);

  return {
    loading,
    error,
    getEvents,
    events,
    getFacultiesAndPrograms,
    faculties,
    setQuery,
    query,
    deleteEvent,
  };
};
