import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { OrgVM } from '@/models/index';
import { apiOrg } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateOrgVm } from '@/models/validateField';
import { Animations } from '@/components/loaders';

export interface IProps {
    id: string,
    isOpen: boolean
    handleClose: Function
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

interface state {
    isLoading: boolean
    isEdit: boolean
}


export default function OrgDetail(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { id, isOpen } = props;

    const [formState, setFormState] = useState<OrgVM | null>(null)
    const [state, setState] = useState<state>({ isLoading: true, isEdit: true } as state)
    const [isReload, setIsReload] = useState<boolean>(true)
    // const [isEdit, setEdit] = useState<boolean>(true)

    useEffect(() => {
        //window.addEventListener('resize', () => resize())
        if (isReload)
            fetchData()
    }, [isReload])


    function setStateInit(isLoading, isEdit) {
        let newState = { ...state }
        if (isLoading != null) newState.isLoading = isLoading
        if (isEdit != null) newState.isEdit = isEdit
        setState(newState);
    }

    async function fetchData() {
        if (!state.isLoading)
            setStateInit(true, null)
        await apiOrg.getById(id).then((rsp) => {
            if (rsp) {
                setFormState(rsp);
                setIsReload(false)
                setStateInit(false, null)
            }
        })
    }

    function validateFields() {
        let messError = validateField(validateOrgVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError
    }

    async function saveData() {
        if (!validateFields()) {
            setStateInit(true, null)
            await apiOrg.update(id, formState).then((rsp) => {
                if (!rsp.isError) {
                    setIsReload(true)
                    dispatch('SUCCESS', 'Cập nhật thành công.')
                }
            })
        }
    }

    function handleChange(e) {
        let target = e.target;
        type NewType = OrgVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
        //handleValidation(target);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Chi tiết tổ chức</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mr-3 btn btn-light">Đóng</button>
                <button onClick={() => setStateInit(null, !state.isEdit)} hidden={!state.isEdit} type="button" className="mr-3 btn btn-primary">Chỉnh sửa</button>
                <button disabled={state.isEdit} onClick={() => saveData()} hidden={state.isEdit} type="button" className="mr-3 btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function renderContent() {
        let { isEdit } = state;
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
                        disabled={isEdit}
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
                        disabled={isEdit}
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
                        disabled={isEdit}
                    />
                    <TextField
                        label="Mô tả"
                        name="description"
                        value={formState?.description}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                        disabled={isEdit}
                    />
                </div>
            </div>
        </form>
    }
    function renderLoading() {
        return <Animations W={500} />
    }


    return <DrawerLayout
        isOpen={isOpen}
    >
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {state.isLoading ? renderLoading() : renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}

