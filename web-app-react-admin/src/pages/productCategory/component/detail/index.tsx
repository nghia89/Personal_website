import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Switch } from '@material-ui/core';
import { CategoryVM } from '@/models/index';
import { apiProductCategory, apiUploadFile } from '@/apis/index';
import { DrawerLayout, FileUpload, TreeViewCategory, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateProductCateVm } from '@/models/validateField';
import { Animations } from '@/components/loaders';
import { Attachments } from '@/models/commonM';

export interface IProps {
    id: number,
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

type NewType = CategoryVM | null;
export default function ProductCateDetail(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { isOpen } = props;

    const [formState, setFormState] = useState<CategoryVM>()
    const [isReload, setIsReload] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [listImage, setListImage] = useState<Array<Attachments>>([])

    useEffect(() => {
        if (isReload)
            fetchData()
    }, [isReload])


    async function fetchData() {
        await apiProductCategory.getById(props.id).then((rsp) => {
            if (rsp) {
                setFormState(rsp.data);
                if (rsp.data.images)
                    setListImage(rsp.data.attachments)
                setIsReload(false)
                setIsLoading(false)
            }
        })
    }

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
            let imgs: any = []
            rspImg.data.map((item) => imgs.push(item.path));

            let newFormState: NewType = { ...formState };
            newFormState.images = imgs.toString()
            setFormState(newFormState);
            dispatch('SUCCESS', 'Thêm ảnh thành công')
        }
    }

    function handleDeleteFile(id) {
        var newImgs = listImage.filter(x => x.id !== id);
        let imgs: any = []
        newImgs.map((item) => imgs.push(item.path));
        let newFormState: NewType = { ...formState };
        newFormState.images = imgs.toString()
        setFormState(newFormState);
    }


    async function saveData() {
        if (!validateFields()) {
            await apiProductCategory.update(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm danh mục thành công.')
                    props.handleClose()
                    props.handleReload()
                } else dispatch('ERROR', rsp.message)
            })
        }
    }

    function validateFields() {
        let messError = validateField(validateProductCateVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError

    }

    function handleChange(e) {
        let target = e.target;
        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
    };

    function handleOnchangeValue(value, name) {
        let newFormState: NewType = { ...formState };
        newFormState[name] = value;
        setFormState(newFormState);
    }


    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-between align-items-center">
            <h5 className="mr-5 font-weight-bold">Tạo mới danh mục</h5>
            <div>
                <button onClick={() => props.handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
                <button onClick={() => saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Cập nhật</button>
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
                        value={formState?.name}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TreeViewCategory
                        handleOnchange={(value) => handleOnchangeValue(value, 'parentId')}
                        dataValue={formState?.parentId}
                    />
                    <TextField
                        required
                        inputRef={(r) => refs["code"] = r}
                        label="Mã"
                        name="code"
                        value={formState?.code}
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
                    <div className="MuiFormControl-root MuiTextField-root form-control">
                        <label>Trạng thái <span className="text-danger">*</span></label>
                        <Switch
                            required
                            checked={formState?.status === 1 ? true : false}
                            onChange={() => handleOnchangeValue(formState?.status === 1 ? 0 : 1, 'status')}
                            color="primary"
                        />
                    </div>

                </div>
                <div className="col">
                    <TextField
                        label="Số thứ tự"
                        type='number'
                        name="sortOrder"
                        value={formState?.sortOrder}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="seoAlias"
                        name="seoAlias"
                        value={formState?.seoAlias}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="seoKeywords"
                        name="seoKeywords"
                        value={formState?.seoKeywords}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />

                    <TextField
                        label="seoDescription"
                        name="seoDescription"
                        value={formState?.seoDescription}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            <div className="col mt-2">
                <label className="ms-2">Banner</label>
                <FileUpload
                    files={listImage}
                    multiple
                    onchangeFiles={(files) => setListImage(files)}
                    handleDelete={(id) => handleDeleteFile(id)}
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
        width={'40%'}
        isOpen={isOpen}
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

