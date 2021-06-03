import React, { useState, useEffect } from 'react'
import { Button, Drawer } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconSearch } from '@/helpers/svg';

interface IProps {
    handleKeyDown?: Function
    handleSearch?: Function
    placeholder: string
    onChange?: Function
}

export default function SearchComponent(props: IProps) {

    const [textSearch, setTextSearch] = useState<string>('')

    return <React.Fragment>
        <input onChange={(e) => { props.onChange && props.onChange(e.target.value); setTextSearch(e.target.value) }}
            onKeyDown={(e) => props.handleKeyDown && props.handleKeyDown(e)}
            type="text" name="searchText" id="form1" className="form-control"
            placeholder={props.placeholder}
            aria-label="Search" aria-describedby="basic-addon2"
            style={{ marginRight: '-10px ' }} />
        <Button onClick={() => props.handleSearch && props.handleSearch(textSearch)} variant="contained" color="primary">
            {IconSearch(20)}
        </Button>
    </React.Fragment>

}