import { Link } from 'react-router-dom';
import type { EventItem } from '../types';
import { formatDate } from '../utils/formatDate';


type Props = {
event: EventItem;
onToggleBookmark: (id: number, next: boolean) => void;
}


export default function EventCard({ event, onToggleBookmark }: Props) {
return (
<div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between">
<h3 className="text-lg font-semibold">{event.title}</h3>
<button onClick={() => onToggleBookmark(event.id, !event.bookmarked)} aria-label="bookmark">
{event.bookmarked ? '★' : '☆'}
</button>
</div>
<p className="text-sm text-gray-600">{formatDate(event.date)} • {event.location} • <span className="italic">{event.category}</span></p>
<p className="mt-2 text-gray-700">{event.description.slice(0, 120)}{event.description.length>120? '...' : ''}</p>
</div>
<div className="mt-3">
<Link to={`/events/${event.id}`} className="inline-block text-sm font-medium underline">View details</Link>
</div>
</div>
);
}