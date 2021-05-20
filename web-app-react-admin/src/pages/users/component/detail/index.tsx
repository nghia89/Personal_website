import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { UserVM } from '@/models/index';
import { apiUser } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { Animations } from '@/components/loaders'
import { formatDate } from '@/helpers/utils'

export interface IProps {
    id: string,
    isOpen: boolean
    handleClose: Function
}

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


export default function UserDetail(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { id, isOpen } = props;

    const [formState, setFormState] = useState<UserVM | null>(null)
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
        await apiUser.getById(id).then((rsp) => {
            if (rsp) {
                setFormState(rsp);
                setIsReload(false)
                setStateInit(false, null)
            }
        })
    }


    async function saveData() {
        setStateInit(true, null)
        await apiUser.update(id, formState).then((rsp) => {
            if (!rsp.isError) {
                setIsReload(true)
                dispatch('SUCCESS', 'Thêm user thành công.')
            }
        })
    }

    function handleChange(e) {
        let target = e.target;
        type NewType = UserVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
        //handleValidation(target);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Chi tiết User</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mr-3 hms-btn-button btn btn-light">Đóng</button>
                <button onClick={() => setStateInit(null, !state.isEdit)} type="button" className="mr-3 hms-btn-button btn btn-primary">Chỉnh sửa</button>
                <button disabled={state.isEdit} onClick={() => saveData()} type="button" className="mr-3 hms-btn-button btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function renderContent() {
        let { isEdit } = state;
        return <form className={classes.root} noValidate autoComplete="off">
            <div className="row">
                <div className="col">
                    <TextField
                        disabled={isEdit}
                        label="Họ"
                        name="firstName"
                        value={formState?.firstName}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        disabled={isEdit}
                        label="Sinh nhật"
                        name="dob"
                        value={formatDate(formState?.dob, null)}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        disabled={true}
                        label="Ngày tạo"
                        name="dateCreated"
                        value={formatDate(formState?.dateCreated, null)}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="col">
                    <TextField
                        disabled={isEdit}
                        label="Tên"
                        name="lastName"
                        value={formState?.lastName}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        disabled={isEdit}
                        label="SĐT"
                        name="phoneNumber"
                        type={"number"}
                        value={formState?.phoneNumber}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        disabled={isEdit}
                        label="Email"
                        name="email"
                        value={formState?.email}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
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

