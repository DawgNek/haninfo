# React Hooks Tips

React Hooks have completely changed the way we write React components. Here are some practical tips and patterns I’ve learned during development.

## 1. Reuse Logic with Custom Hooks

Don’t reinvent the wheel! Extract common logic into custom Hooks.

```javascript
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
    const [stored, setStored] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value) => {
        setStored(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [stored, setValue];
}
```

## 2. useCallback vs useMemo

### useCallback

Used to memoize **functions**:

```javascript
const handleClick = useCallback(() => {
    doSomething(id);
}, [id]);
```

### useMemo

Used to memoize **computed values**:

```javascript
const expensiveValue = useMemo(() => {
    return computeExpensive(data);
}, [data]);
```

## 3. Cleanup in useEffect

Always clean up effects to prevent memory leaks!

```javascript
useEffect(() => {
    const subscription = api.subscribe(handler);
    
    // Cleanup function
    return () => {
        subscription.unsubscribe();
    };
}, []);
```

## 4. Lazy Initial State

For expensive initial computations:

```javascript
// ❌ Runs on every render
const [state, setState] = useState(expensiveComputation());

// ✅ Runs only on first render
const [state, setState] = useState(() => expensiveComputation());
```

## 5. Using useRef for Mutable Values

When you need a value that persists across renders but doesn’t trigger re-renders:

```javascript
const timerRef = useRef(null);

useEffect(() => {
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
}, []);
```

## 6. Custom Hook Pattern: useFetch

```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
```

## Conclusion

Hooks make React code cleaner and easier to maintain. Master these patterns, and you’ll write much better React code! 💪
