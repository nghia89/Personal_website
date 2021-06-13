import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { UserVM } from '@/models/index';
import { apiUser } from '@/apis/index';
import { DrawerLayout, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateUserVm } from '@/models/validateField';

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


export default function UserCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { isOpen } = props;

    const [formState, setFormState] = useState<UserVM | null>(null)
    // const [isEdit, setEdit] = useState<boolean>(true)

    useEffect(() => {
    }, [])

    async function saveData() {
        if (!validateFields()) {
            await apiUser.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm user thành công.')
                    props.handleClose()
                    props.handleReload()
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
        return <div className="pb-3 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Tạo mới User</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
                <button onClick={() => saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function renderContent() {
        return <form className={classes.root} noValidate autoComplete="off">
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
                    <TextField
                        required
                        inputRef={(r) => refs["dob"] = r}
                        id="date"
                        label="Sinh nhật"
                        name="dob"
                        defaultValue={formState?.dob}
                        variant="outlined"
                        size="small"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    {/* <DatePickers
                        required={true}

                        label="Sinh nhật"
                        name="dob"
                        value={formState?.dob}
                        handleChange={(e) => handleChange(e)}
                    /> */}
                </div>
                <div className="col">
                    <TextField
                        required
                        inputRef={(r) => refs["lastName"] = r}
                        label="Tên"
                        name="lastName"
                        value={formState?.lastName}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        required
                        inputRef={(r) => refs["phoneNumber"] = r}
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
                        required
                        inputRef={(r) => refs["email"] = r}
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

