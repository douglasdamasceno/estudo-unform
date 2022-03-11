import React, { useRef, useEffect } from "react";
import ReactInputMask from "react-input-mask";

import { useField } from "@unform/core";

const InputMask = ({ name, label, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = "", error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            setValue(ref, value) {
                ref.setInputValue(value);
            },
            clearValue(ref, value) {
                ref.setInputValue("");
            }
        });
    }, [fieldName, registerField]);

    return (
        <>
            {label && <h3 className="label" htmlFor={fieldName}>{label}</h3>}

            <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && <span className="error" style={{ paddingBottom: 40, margin: 5 }}>{error}</span>}
        </>
    );
};

export default InputMask;
