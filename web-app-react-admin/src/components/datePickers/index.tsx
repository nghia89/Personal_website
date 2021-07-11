import React from 'react';
import TextField from '@material-ui/core/TextField';

interface IProps {
    value?: Date
    handleChange: Function
    name: string
    label: string
    required?: boolean
    type?: string
}

export default function DatePickers(props: IProps) {
    let { value, name, label, required } = props;
    return (
        <TextField
            required={required}
            id="date"
            label={label}
            name={name}
            defaultValue={value}
            variant="outlined"
            size="small"
            type={props.type ? props.type : "date"}
            InputLabelProps={{
                shrink: true,
            }}
            className="form-control"
            onChange={(e) => props.handleChange(e)}
        />
    );
}
