import { useState } from 'react';
import useAsyncEffect from './useAsyncEffect';
import { getCats } from '../api/cats';

export const useCats = () => {
    const [cats, setCats] = useState([]);
    useAsyncEffect(async() => {
        setCats(await getCats());
    },[]);
    return cats;
}
