import React from 'react';


type Props = {
query: string;
setQuery: (s: string) => void;
category: string;
setCategory: (c: string) => void;
categories: string[];
}


export default function SearchFilter({ query, setQuery, category, setCategory, categories }: Props) {
return (
<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
<input
value={query}
onChange={e => setQuery(e.target.value)}
placeholder="Search by title..."
className="px-3 py-2 border rounded w-full sm:w-1/2"
/>
<select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border rounded">
<option value="">All Categories</option>
{categories.map(c => <option key={c} value={c}>{c}</option>)}
</select>
</div>
);
}