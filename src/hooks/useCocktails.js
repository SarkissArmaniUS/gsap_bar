import { useEffect, useState } from 'react';

export function useCocktails(category) {
    const [state, setState] = useState({ data: [], loading: true, error: null });

    useEffect(() => {
        const controller = new AbortController();
        const url = category ? `/api/cocktails?category=${category}` : '/api/cocktails';

        fetch(url, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setState({ data, loading: false, error: null }))
            .catch((error) => {
                if (error.name !== 'AbortError') setState({ data: [], loading: false, error });
            });

        return () => controller.abort();
    }, [category]);

    return state;
}