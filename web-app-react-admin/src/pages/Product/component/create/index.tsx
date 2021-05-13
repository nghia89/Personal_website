import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ProductVM, UserVM } from '@/models/index';
import { apiUser } from '@/apis/index';
import { Editor, ImageUploadCard, useNotification } from '@/components/index'
import { validateField } from '@/helpers/utils'
import { validateUserVm } from '@/models/validateField';

export interface IProps {

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
export default function ProductCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();


    const [formState, setFormState] = useState<ProductVM | null>(null)
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
    function handleUpload(isLoading, listPath) {
        console.log(isLoading, listPath);

    }

    function validateFields() {
        let messError = validateField(validateUserVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError

    }

    function handleChange(e) {
        let target = e.target;
        type NewType = ProductVM | null;

        let newFormState: NewType = { ...formState };
        if (newFormState)
            newFormState[target.name] = target.value;
        setFormState(newFormState);
    };


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h4 className="mr-5 text-dark font-weight-bold">Tạo mới sản phẩm</h4>
            <div>
                <button onClick={() => saveData()} type="button" className="mr-3 btn btn-primary">Lưu</button>
            </div>
        </div>
    }
    function renderContentGeneral() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="font-weight-bold">Nội dung chung</h6>

            </div>
            <div className="col-10">

                <TextField
                    required
                    inputRef={(r) => refs["name"] = r}
                    label="Tên sản phẩm"
                    name="name"
                    value={formState?.name}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <div className="row">
                    <div className="col-6">
                        <TextField
                            required
                            inputRef={(r) => refs["productCategoryId"] = r}
                            label="Danh mục"
                            name="productCategoryId"
                            value={formState?.productCategoryId}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            required
                            inputRef={(r) => refs["code"] = r}
                            label="Mã sp"
                            name="code"
                            value={formState?.code}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>


                </div>

                <div className="row">
                    <div className="col-6">
                        <TextField
                            required
                            inputRef={(r) => refs["price"] = r}
                            label="Giá bán"
                            name="price"
                            value={formState?.price}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            required
                            inputRef={(r) => refs["originalPrice"] = r}
                            label="Giá gốc"
                            name="originalPrice"
                            value={formState?.originalPrice}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="row card_select_image" >

                    <div className="col-6">
                        <h6>Ảnh đại diện *</h6>
                        <ImageUploadCard
                            handleUpload={(isLoading, listPath) => handleUpload(isLoading, listPath)}
                        />
                    </div>
                    <div className="col-6">

                    </div>
                </div>
            </div>

        </div>
    }

    function renderContentProduct() {
        return <div className="row  pt-3 pb-3">
            <div className="col-2">
                <h6 className="font-weight-bold">Mô tả sản phẩm</h6>

            </div>
            <div className="col-10">
                <Editor />
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="Mô tả ngắn"
                    name="firstName"
                    value={formState?.description}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="Mô tả sản phẩm"
                    name="firstName"
                    value={formState?.content}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />

            </div>
        </div>
    }
    function renderContentSeo() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="font-weight-bold">SEO từ khoá</h6>

            </div>
            <div className="col-10">
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="SEO title"
                    name="firstName"
                    value={formState?.name}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="SEO Url"
                    name="firstName"
                    value={formState?.name}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="SEO Keywords"
                    name="firstName"
                    value={formState?.name}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    inputRef={(r) => refs["firstName"] = r}
                    label="SEO Description"
                    name="firstName"
                    value={formState?.name}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </div>
    }
    function renderContent() {
        return <form className={classes.root} noValidate autoComplete="off">
            {renderContentGeneral()}
            {renderContentProduct()}
            {renderContentSeo()}
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

