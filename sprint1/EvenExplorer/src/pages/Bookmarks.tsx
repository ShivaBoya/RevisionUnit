import { useMemo } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventList from '../components/EventList';

export default function Bookmarks() {
  const { events, loading, toggleBookmark } = useEvents();

  // Filter bookmarked events
  const bookmarked = useMemo(() => events.filter(e => e.bookmarked), [events]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Bookmarked Events</h2>
      {loading && <p>Loading...</p>}
      <EventList events={bookmarked} onToggleBookmark={toggleBookmark} />
      {bookmarked.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-6">
          You have no bookmarked events yet.
        </p>
      )}
    </div>
  );
}
