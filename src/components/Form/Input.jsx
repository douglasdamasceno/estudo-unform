import { useRef, useEffect } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, label, ...rest }) {

    const inputRef = useRef(null);
    const {fieldName, registerField, defaultValue, error} = useField(name)
    
    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path:"value"
         })
    },[fieldName,registerField]);

    return (
        <>
            <h3 className="label">{label}</h3> 
            <input  ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && <span className="error" style={{paddingBottom:40, margin:5 }}>{error}</span>}
        </>
  )
}

// export default function Input({ name, type, label, value, ...rest }) {
//   const inputRef = useRef(null)
//   const { fieldName, defaultValue, registerField, error } = useField(name)

//   /**
//    * If you add a value to the input, it will be considered the default
//    * This is useful when you have a `<input type="hidden" />`
//    *
//    * You can also remove it and use the `initialData` or set dynamically.
//    */
//   const defaultInputValue = value || defaultValue

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: inputRef,
//       getValue: ref => {
//         return ref.current.value
//       },
//       setValue: (ref, newValue) => {
//         ref.current.value = newValue
//       },
//       clearValue: ref => {
//         ref.current.value = ''
//       },
//     })
//   }, [fieldName, registerField])

//   return (
//     <div>
//       <label  className="label" htmlFor={fieldName}>{label}</label>

//       <input
//         type={type || 'text'}
//         id={fieldName}
//         ref={inputRef}
//         defaultValue={defaultInputValue}
//         {...rest}
//       />

//       {error && <span>{error}</span>}
//     </div>
//   )
// }
