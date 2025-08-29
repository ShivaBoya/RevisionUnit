import { useState, useEffect } from "react";
import { api } from "../api";
import type { EventItem } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await api.get<EventItem[]>("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  async function toggleBookmark(id: number, bookmarked: boolean) {
    // PATCH -> partial update
    try {
      await api.patch(`/events/${id}`, { bookmarked });
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, bookmarked } : e))
      );
    } catch (err) {
      console.error(err);
    }
  }

  return { events, loading, error, fetchEvents, toggleBookmark };
}
