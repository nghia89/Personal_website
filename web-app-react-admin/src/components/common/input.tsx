import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { IconSearch } from '@/helpers/svg';
import { formatPrice } from '@/helpers/utils';

interface IProps {
    label: string
    placeholder?: string
    onChange?: Function
    required?: boolean
    name: string
    type?: 'text' | 'number' | "email" | 'password'
    value: any
    isFormatPrice?: boolean
}

export default function InputComponent(props: IProps) {

    let { label, placeholder, required, type, name, value, isFormatPrice } = props;

    return <React.Fragment>
        <label>{label} {required && <span className="required">*</span>} </label>
        <div className="next-input--has-border-left">
            {
                <input type={type ? type : 'text'} name={name} onChange={(e) => props.onChange && props.onChange(e)} className="next-input" placeholder={placeholder} value={isFormatPrice ? formatPrice(value) : value} />
            }
        </div>
    </React.Fragment>

}