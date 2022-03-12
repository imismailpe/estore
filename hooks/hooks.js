import { useState } from "react";

export function useInputData(initialValue) {
    const [value, setValue] = useState(initialValue)

    function handleChange(e) {
        setValue(e.target.value)
    }
    return {
        value,
        onChange: handleChange
    }
}
export function useSelectData(initialValue) {
    const [value, setValue] = useState(initialValue)

    function handleChange(e) {
        setValue(e)
    }
    return {
        value,
        onChange: handleChange
    }
}