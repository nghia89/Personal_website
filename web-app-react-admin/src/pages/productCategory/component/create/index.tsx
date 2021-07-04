import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { CategoryVM } from '@/models/index';
import { apiProductCategory, apiUploadFile } from '@/apis/index';
import { DrawerLayout, TreeViewCategory, useNotification, FileUpload } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateProductCateVm } from '@/models/validateField';
import { Attachments } from '@/models/commonM';

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

type NewType = CategoryVM | null;
export default function ProductCateCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    let { isOpen } = props;

    const [formState, setFormState] = useState<CategoryVM | null>(null)
    const [listImage, setListImage] = useState<Array<Attachments>>([])
    // const [isEdit, setEdit] = useState<boolean>(true)

    useEffect(() => {
    }, [])

    useEffect(() => {
        if (listImage.length > 0) {
            let listFileNew = listImage.filter(x => x.id === null || x.id === undefined)
            if (listFileNew.length > 0) {
                postFile(listFileNew)
            }
        }
    }, [listImage])

    async function saveData() {
        if (!validateFields()) {
            await apiProductCategory.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm danh mục thành công.')
                    props.handleClose()
                    props.handleReload()
                } else dispatch('ERROR', rsp.message)
            })
        }
    }

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
                        defaultValue={formState?.code}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Mô tả"
                        name="description"
                        defaultValue={formState?.description}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
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
                        disabled
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
                    isHiddenDragAndDrop
                    accept=".jpg,.png,.jpeg"
                />
            </div>
        </form>
    }

    return <DrawerLayout
        width={'40%'}
        isOpen={isOpen}
    >
        <div className="drawer-container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}

