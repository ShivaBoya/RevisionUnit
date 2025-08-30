const KEY = 'recent_searches_v1'
const LIMIT = 5


export function getRecentSearches() {
try {
const raw = localStorage.getItem(KEY)
return raw ? JSON.parse(raw) : []
} catch {
return []
}
}


export function pushSearch(q) {
const list = getRecentSearches()
const next = [q, ...list.filter(s => s.toLowerCase() !== q.toLowerCase())].slice(0, LIMIT)
localStorage.setItem(KEY, JSON.stringify(next))
return next
}