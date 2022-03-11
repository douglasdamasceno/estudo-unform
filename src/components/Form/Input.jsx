import { useRef, useEffect } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, label, ...rest }) {

    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name)


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        })
    }, [fieldName, registerField]);

    return (
        <>
            <h3 className="label">{label}</h3>
            <input ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && <span className="error" style={{ paddingBottom: 40, margin: 5 }}>{error}</span>}
        </>
    )
}