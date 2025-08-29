export function formatDate(dateStr: string) {
const d = new Date(dateStr + 'T00:00:00');
return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}