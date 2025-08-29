import { useMemo, useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import SearchFilter from '../components/SearchFilter';
import EventList from '../components/EventList';


export default function Home() {
const { events, loading, error, toggleBookmark } = useEvents();
const [query, setQuery] = useState('');
const [category, setCategory] = useState('');


const categories = useMemo(() => Array.from(new Set(events.map(e => e.category))), [events]);


const filtered = useMemo(() => {
return events
.filter(e => !query || e.title.toLowerCase().includes(query.toLowerCase()))
.filter(e => !category || e.category === category)
.sort((a,b) => a.date.localeCompare(b.date));
}, [events, query, category]);


return (
<div className="max-w-6xl mx-auto p-4">
<SearchFilter query={query} setQuery={setQuery} category={category} setCategory={setCategory} categories={categories} />
{loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}
<EventList events={filtered} onToggleBookmark={toggleBookmark} />
</div>
);
}