import { useEffect, useState } from 'react';

function usedMediaQuery (query, defaultMatches = window.matchMedia(query)) {
    const [matches, setMatches] = useState(defaultMatches);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) setMatches (media.matches);

        const listener = () => setMatches(media.matches);

        media.addEventListener('resize', listener);

        return () => media.removeEventListener('resize', listener);
    }, [query, matches]);

    return matches;
}

export default usedMediaQuery;