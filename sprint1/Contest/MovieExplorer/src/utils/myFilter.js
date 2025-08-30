// Custom filter: DO NOT use Array.prototype.filter internally
export function MyFilter(list, predicate) {
const out = []
for (let i = 0; i < list.length; i++) {
const item = list[i]
if (predicate(item, i, list)) {
out[out.length] = item
}
}
return out
}