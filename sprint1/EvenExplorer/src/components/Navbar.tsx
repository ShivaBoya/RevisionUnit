import { Link } from 'react-router-dom';


export default function Navbar() {
return (
<nav className="bg-white shadow-sm">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="font-semibold text-lg">Event Explorer</Link>
<div className="flex items-center gap-4">
<Link to="/" className="hover:underline">Home</Link>
<Link to="/bookmarks" className="hover:underline">Bookmarked</Link>
</div>
</div>
</nav>
);
}