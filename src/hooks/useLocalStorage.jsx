import { useEffect, useState } from "react"

/**
 * Custom hook for managing state in local storage.
 * @template T generic type
 * @param {string} key - The key to store the data in local storage.
 * @param {T | (() => T)} initialValue - Initial value or a function that returns the initial value.
 */
function useLocalStorage(key, initialValue) {
    /** @type {[T, (value: T) => void]} */
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === "function") {
            return /** @type {() => T} */ initialValue;
        } else {
            return initialValue;
        }
    });

    /**
     * Effect to update local storage when the value changes.
     */
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return /** @type {[typeof value, typeof setValue]} */ ([value, setValue])
}
