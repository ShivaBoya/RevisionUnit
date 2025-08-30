import { useEffect, useRef, useCallback } from 'react'


export function useThrottle(callback, wait = 200) {
const last = useRef(0)
const timer = useRef(null)


const throttled = useCallback((...args) => {
const now = Date.now()
const remaining = wait - (now - last.current)


if (remaining <= 0) {
if (timer.current) {
clearTimeout(timer.current)
timer.current = null
}
last.current = now
callback(...args)
} else if (!timer.current) {
timer.current = setTimeout(() => {
last.current = Date.now()
timer.current = null
callback(...args)
}, remaining)
}
}, [callback, wait])


useEffect(() => () => timer.current && clearTimeout(timer.current), [])
return throttled
}