import React, { useState, useEffect } from 'react'
import { SizeVM } from '@/models/index';
import { apiSize } from '@/apis/index';
import { useNotification, DrawerLayout } from '@/components/index'
import { commandId, functionId } from '@/constants/utilConstant';
import { checkPermission, IsNullOrEmpty } from '@/helpers/utils';
import { makeStyles } from '@material-ui/core/styles';
import { Animations } from '@/components/loaders'
import { TextField } from '@material-ui/core';

export interface IProps {
    id: number,
    isOpen: boolean
    handleClose: Function
}
const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        margin: 'auto'
    }
});
let refs: any = {};
export default function ColorCreateAndEdit(props: IProps) {
    const dispatch = useNotification();
    const classes = useStyles();

    let { id, isOpen } = props;
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<SizeVM>();
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    useEffect(() => {
        getData()
    }, [])


    async function getData() {
        if (!isLoading) setLoading(true)
        if (props.id) {
            await apiSize.getById(id).then((rsp) => {
                if (!rsp.isError) {
                    if (!rsp.data.colorCode)
                        rsp.data.colorCode = "#fff"
                    setData(rsp.data);
                    setLoading(false)
                } else setLoading(false)
            })
        } else {
            setLoading(false)
            setData({})
        }
    }

    function handleClose() {
        props.handleClose()
    }

    async function saveData() {

        if (IsNullOrEmpty(data?.name)) {
            dispatch('ERROR', 'Vui lòng nhập tên màu.')
            refs["name"].focus()
        }
        else if (data?.id) {
            await apiSize.update(data).then((rsp) => {
                if (rsp) {
                    dispatch('SUCCESS', 'Cập nhật thành công.');
                    setLoading(false)
                } else setLoading(false)
            })
        } else {
            await apiSize.create(data).then((rsp) => {
                if (rsp) {
                    dispatch('SUCCESS', 'Tạo mới thành công.');
                    setLoading(false)
                } else setLoading(false)
            })
        }
    }

    function handleChange(e) {
        let target = e.target;
        let newFormState: SizeVM = { ...data }
        if (newFormState)
            newFormState[target.name] = target.value;
        setData(newFormState);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">{!IsNullOrEmpty(props.id) ? 'Chỉnh sửa màu' : 'Thêm mới màu'}</h1>
            <div>
                {checkPermission(functionId.color, commandId.update) && <button onClick={() => saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>}
                <button onClick={() => handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
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
                        value={data?.name}
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
        width={window.innerWidth / 3 + 'px'}
    >
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {isLoading ? renderLoading() : renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}