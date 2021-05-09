import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { UserVM } from '@/models/index';
import { apiUser } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateUserVm } from '@/models/validateField';

export interface IProps {

}

let refs = {};
export default function ProductCreate(props: IProps) {

    let dispatch = useNotification();


    const [formState, setFormState] = useState<UserVM | null>(null)
    useEffect(() => {
    }, [])

    async function saveData() {
        if (!validateFields()) {
            await apiUser.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm user thành công.')
                    // props.handleClose()
                    // props.handleReload()
                }
            })
        }
    }

    function validateFields() {
        let messError = validateField(validateUserVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError

    }

    function handleChange(e) {
        let target = e.target;
        type NewType = UserVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Tạo mới sản phẩm</h5>
            <div>
                <button onClick={() => saveData()} type="button" className="mr-3 btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function renderContent() {
        return <form >
            <div className="row">
                <div className="col">
                    <TextField
                        required
                        inputRef={(r) => refs["firstName"] = r}
                        label="Họ"
                        name="firstName"
                        value={formState?.firstName}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />

                </div>
            </div>
        </form >
    }

    return <div className="container">
        <div className="row">
            <div className="col-12 mt-3">
                {renderHeader()}
                {renderContent()}
            </div>
        </div>
    </div>
}

