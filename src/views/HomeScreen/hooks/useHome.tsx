import React, { useState, useEffect, useCallback } from "react";
import { useApi } from "../../../common/utils/useApi";
import { Events } from "../../HomeInviteScreen/hooks/useHomeInviteScreen";
import { debounce } from "lodash";

export interface Faculties {
  _id: string;
  name: string;
  programs: Program[];
}

export interface Program {
  name: string;
  id: string;
}

export const useHome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [page, setPage] = useState(1);
  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [query, setQuery] = useState("");

  const { get } = useApi();

  const getEvents = async (
    size: number,
    faculty_id?: string,
    program_id?: string,
    reset?: boolean,
    query?: string,
    event_type: string = "default"
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
    const event = event_type !== "default" ? `&event_type=${event_type}` : "";

    try {
      if (reset) {
        const path = `events/all?page=1&size=${size}${fac}${prog}${event}&query=${query}`;
        console.log(path);
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
    setQuery,
    query,
  };
};
