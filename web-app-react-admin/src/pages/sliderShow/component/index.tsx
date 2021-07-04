import React, { useState, useEffect } from 'react'
import { SlideShowVM } from '@/models/index';
import { apiSlideShow, apiUploadFile } from '@/apis/index';
import { useNotification, DrawerLayout, FileUpload, AlertDialogSlide } from '@/components/index'
import { commandId, functionId } from '@/constants/utilConstant';
import { checkPermission, IsNullOrEmpty } from '@/helpers/utils';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Animations } from '@/components/loaders'
import { Switch, TextField } from '@material-ui/core';
import { Attachments } from '@/models/commonM';
import Select from 'react-select'

export interface IProps {
    id: number,
    isOpen: boolean
    handleClose: Function
    handleReload: Function
}
const options = [{ label: "Top", value: "Top" }, { label: "Between", value: "Between" }]
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 240,
            flexGrow: 1,
            '& .MuiTextField-root': {
                margin: theme.spacing(1)
            },
        },
    }),
);

let refs: any = {};
export default function SlidesCreateAndEdit(props: IProps) {
    const dispatch = useNotification();
    const classes = useStyles();

    let { id, isOpen } = props;
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<SlideShowVM>();
    const [listImage, setListImage] = useState<Array<Attachments>>([])
    const [valueOption, setValueOption] = useState<any>()
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (listImage.length > 0) {
            let listFileNew = listImage.filter(x => x.id === null || x.id === undefined)
            if (listFileNew.length > 0) {
                postFile(listFileNew)
            }
        }
    }, [listImage])

    async function postFile(listFileNew) {
        const formData = new FormData();
        listFileNew.forEach((file) => formData.append('File', file.path))
        let rspImg = await apiUploadFile.UploadImage(formData);
        if (!rspImg.isError) {
            let newFormState: SlideShowVM = { ...data };
            newFormState.image = rspImg.data[0].path
            setData(newFormState);
            dispatch('SUCCESS', 'Thêm ảnh thành công')
        }
    }


    async function getData() {
        if (!isLoading) setLoading(true)
        if (props.id) {
            await apiSlideShow.getById(id).then((rsp) => {
                if (!rsp.isError) {
                    setData(rsp.data);
                    let value = options.find(x => x.value == rsp.data.displayPosition)
                    setValueOption(value)
                    if (rsp.data.image)
                        setListImage([{ id: id, path: rsp.data.image }])
                    setLoading(false)
                } else setLoading(false)
            })
        } else {
            setLoading(false)
            let newData: SlideShowVM = { status: 1 }
            setData(newData)
        }
    }

    function handleClose() {
        props.handleClose()
    }

    async function saveData() {
        debugger
        if (IsNullOrEmpty(data?.name)) {
            dispatch('ERROR', 'Vui lòng nhập tên.')
            refs["name"].focus()
        } else if (IsNullOrEmpty(data?.displayPosition)) {
            dispatch('ERROR', 'Vui lòng chọn vị trí hiển thị.')
            refs["displayPosition"].select.focus()
        } else if (IsNullOrEmpty(data?.image)) {
            dispatch('ERROR', 'Vui lòng chọn vị ảnh.')
        }
        else if (data?.id) {
            await apiSlideShow.update(data).then((rsp) => {
                if (rsp) {
                    dispatch('SUCCESS', 'Cập nhật thành công.');
                    setLoading(false)
                    props.handleReload()
                } else setLoading(false)
            })
        } else {
            await apiSlideShow.create(data).then((rsp) => {
                if (rsp) {
                    dispatch('SUCCESS', 'Tạo mới thành công.');
                    setLoading(false)
                    props.handleReload()
                } else setLoading(false)
            })
        }
    }
    function handleOnchangeValue(valueOption, name) {
        let newFormState: SlideShowVM = { ...data };
        newFormState[name] = valueOption.value;
        setData(newFormState);
        setValueOption(valueOption)
    }
    function handleChange(e) {
        let target = e.target;
        let newFormState: SlideShowVM = { ...data }
        if (newFormState)
            newFormState[target.name] = target.value;
        setData(newFormState);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">{!IsNullOrEmpty(props.id) ? 'Chỉnh sửa slides' : 'Thêm mới slides'}</h1>
            <div>
                <button onClick={() => handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
                {checkPermission(functionId.sliderShow, commandId.update) && <button onClick={() => saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>}
            </div>
        </div>
    }


    function renderContent() {
        return <form className={classes.root} noValidate autoComplete="off">
            <div className="row">
                <div className="col">
                    <TextField
                        required
                        inputRef={(r) => refs["name"] = r}
                        label="Tên"
                        name="name"
                        value={data?.name}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <Select
                        ref={(r) => refs["displayPosition"] = r}
                        className="basic-single select-custom ms-2 mt-2"
                        placeholder="Vị trí hiển thị..."
                        classNamePrefix="select"
                        value={valueOption}
                        options={options}
                        onChange={(value) => handleOnchangeValue(value, "displayPosition")}
                    />

                </div>
                <div className="col">
                    <TextField
                        label="url"
                        name="url"
                        defaultValue={data?.url}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Thứ tự"
                        name="sortOrder"
                        defaultValue={data?.sortOrder}
                        variant="outlined"
                        type="number"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextField
                        label="Mô tả"
                        name="description"
                        defaultValue={data?.description}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="col">
                    <div className="MuiFormControl-root MuiTextField-root form-control">
                        <label>Trạng thái </label>
                        <Switch
                            required
                            checked={data?.status === 1 ? true : false}
                            onChange={() => handleOnchangeValue(data?.status === 1 ? 0 : 1, 'status')}
                            color="primary"
                        />
                    </div>
                </div>
            </div>

            <div className="col mt-2">
                <label className="ms-2">Ảnh <span className="required">*</span></label>
                <FileUpload
                    files={listImage}
                    onchangeFiles={(files) => setListImage(files)}
                    isHiddenDragAndDrop
                    accept=".jpg,.png,.jpeg"
                />
            </div>
        </form>
    }

    function renderLoading() {
        return <Animations W={500} />
    }

    return <DrawerLayout
        isOpen={isOpen}
        width={window.innerWidth / 2.5 + 'px'}
    >
        <div className="drawer-container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {isLoading ? renderLoading() : renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}