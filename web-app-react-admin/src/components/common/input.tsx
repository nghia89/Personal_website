import React, { useEffect, useRef } from 'react'
import { formatPrice } from '@/helpers/utils';

interface IProps {
    label?: string
    placeholder?: string
    onChange?: Function
    required?: boolean
    name: string
    type?: 'text' | 'number' | "email" | 'password'
    value: any
    isFormatPrice?: boolean
    inputRef?: Function
}

export default function InputComponent(props: IProps) {
    const inputEl = useRef(null);
    let { label, placeholder, required, type, name, value, isFormatPrice } = props;

    useEffect(() => {
        if (inputEl.current != null)
            props.inputRef && props.inputRef(inputEl.current)
    }, [inputEl])

    return <React.Fragment>
        {label && <label>{label} {required && <span className="required">*</span>} </label>}
        <div className="next-input--has-border-left">
            {
                <input ref={inputEl} type={type ? type : 'text'}
                    name={name} onChange={(e) => props.onChange && props.onChange(e)}
                    className="next-input" placeholder={placeholder}
                    value={isFormatPrice ? formatPrice(value) : value} />
            }
        </div>
    </React.Fragment>

}