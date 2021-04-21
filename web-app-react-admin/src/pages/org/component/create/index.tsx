import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { OrgVM } from '@/models/index';
import { apiOrg } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateOrgVm } from '@/models/validateField';

export interface IProps {
    isOpen: boolean
    handleClose: Function
    handleReload: Function
}
let refs = {};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1)
            },
        },
    }),
);


export default function OrgCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { isOpen } = props;

    const [formState, setFormState] = useState<OrgVM | null>(null)
    // const [isEdit, setEdit] = useState<boolean>(true)

    useEffect(() => {
    }, [])

    async function saveData() {
        if (!validateFields()) {
            await apiOrg.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm tổ chức thành công.')
                    props.handleClose()
                    props.handleReload()
                }
            })
        }
    }

    function validateFields() {
        let messError = validateField(validateOrgVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError
    }

    function handleChange(e) {
        let target = e.target;
        type NewType = OrgVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Tạo mới tổ chức</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mr-3 btn btn-light">Đóng</button>
                <button onClick={() => saveData()} type="button" className="mr-3 btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function renderContent() {
        return <form className={classes.root} noValidate autoComplete="off">
            <div className="row">
                <div className="col">
                    <TextField
                        inputRef={(r) => refs["name"] = r}
                        label="Tên"
                        name="name"
                        value={formState?.name}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        inputRef={(r) => refs["email"] = r}
                        label="Email"
                        name="email"
                        value={formState?.email}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        inputRef={(r) => refs["phone"] = r}
                        label="Số điện thoại"
                        name="phone"
                        value={formState?.phone}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Mô tả"
                        name="description"
                        value={formState?.description}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
        </form>
    }

    return <DrawerLayout
        isOpen={isOpen}
    >
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}

