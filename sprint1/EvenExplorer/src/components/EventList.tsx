import EventCard from './EventCard';
import type { EventItem } from '../types';


type Props = {
events: EventItem[];
onToggleBookmark: (id: number, next: boolean) => void;
}


export default function EventList({ events, onToggleBookmark }: Props) {
if (events.length === 0) return <p className="text-center text-gray-500">No events found.</p>;
return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{events.map(e => (
<EventCard key={e.id} event={e} onToggleBookmark={onToggleBookmark} />
))}
</div>
);
}