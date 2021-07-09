import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { RoleVM, ValidateVm } from '@/models/index';
import { apiRoles } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { Animations } from '@/components/loaders'
import { validateField } from '@/helpers/utils'
import { validateRoleVm } from '@/models/validateField';

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


export default function RoleDetail(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { id, isOpen } = props;

    const [formState, setFormState] = useState<RoleVM | null>(null)
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
        await apiRoles.getById(id).then((rsp) => {
            if (!rsp.isError) {
                setFormState(rsp.data);
                setIsReload(false)
                setStateInit(false, null)
            }
        })
    }

    function validateFields() {
        let messError = validateField(validateRoleVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError
    }

    async function saveData() {
        if (!validateFields()) {
            setStateInit(true, null)
            await apiRoles.update(id, formState).then((rsp) => {
                if (!rsp.isError) {
                    setIsReload(true)
                    dispatch('SUCCESS', 'Cập nhật quyền thành công.')
                }
            })
        }
    }

    function handleChange(e) {
        let target = e.target;
        type NewType = RoleVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
        //handleValidation(target);
    };


    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Chi tiết quyền</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
                <button onClick={() => setStateInit(null, !state.isEdit)} hidden={!state.isEdit} type="button" className="mx-3 hms-btn-button btn btn-primary">Chỉnh sửa</button>
                <button disabled={state.isEdit} onClick={() => saveData()} hidden={state.isEdit} type="button" className="mx-3 hms-btn-button btn btn-primary">Cập nhật</button>
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
                        disabled={isEdit}
                        label="Tên"
                        name="name"
                        value={formState?.name}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        inputRef={(r) => refs["description"] = r}
                        disabled={isEdit}
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
    function renderLoading() {
        return <Animations W={500} />
    }


    return <DrawerLayout
        isOpen={isOpen}
    >
        <div className="drawer-container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {state.isLoading ? renderLoading() : renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}

