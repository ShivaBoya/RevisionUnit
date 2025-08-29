import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import type { EventItem } from '../types';
import { formatDate } from '../utils/formatDate';


export default function EventDetails() {
const { id } = useParams<{ id: string }>();
const [event, setEvent] = useState<EventItem | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
if (!id) return;
setLoading(true);
api.get<EventItem>(`/events/${id}`).then(r => setEvent(r.data)).finally(() => setLoading(false));
}, [id]);


async function toggleBookmark() {
if (!event) return;
const next = !event.bookmarked;
await api.patch(`/events/${event.id}`, { bookmarked: next });
setEvent({ ...event, bookmarked: next });
}


if (loading) return <p className="p-4">Loading...</p>;
if (!event) return <p className="p-4">Event not found.</p>;


return (
<div className="max-w-3xl mx-auto p-4">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-bold">{event.title}</h1>
<button onClick={toggleBookmark} className="text-xl">{event.bookmarked ? '★ Bookmarked' : '☆ Bookmark'}</button>
</div>
<p className="text-sm text-gray-600">{formatDate(event.date)} • {event.location} • {event.category}</p>
<div className="mt-4 text-gray-800">{event.description}</div>
</div>
);
}