import React, { useState, useEffect } from 'react'

function useDebounce({value, delay}) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        console.log("Dobounce running")
        let timeOut = setTimeout(() => {
            setDebouncedValue(value)
            return clearTimeout(timeOut)
        }, delay);

    }, [value, delay])

  return debouncedValue.toLowerCase();
}

export default useDebounce;
