import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, CircularProgress } from '@material-ui/core';
import { ProductVM, UserVM } from '@/models/index';
import { apiProduct } from '@/apis/index';
import { Editor, ImageUploadCard, useNotification } from '@/components/index'
import { validateField, IsNullOrEmpty } from '@/helpers/utils'
import { validateProductVm } from '@/models/validateField';
import { green } from '@material-ui/core/colors';

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
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
    }),
);
export default function ProductCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    type NewType = ProductVM | null;

    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [pathImage, setPathImage] = useState<string>("")
    const [isLoadingImg, setisLoadingImg] = useState<Boolean>(false)
    useEffect(() => {
    }, [])

    async function saveData() {
        if (!validateFields()) {
            await apiProduct.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm sản phẩm thành công.')
                    // props.handleClose()
                    // props.handleReload()
                    return
                }
            })
        }
    }



    function handleUpload(isLoading, path) {
        if (path != null && !isLoading) {
            setPathImage(path);
            setisLoadingImg(false)
            let newFormState: NewType = { ...formState };
            newFormState['image'] = path;
            setFormState(newFormState);
        } else
            setisLoadingImg(true)
    }

    function validateFields() {
        let messError = validateField(validateProductVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        else if (IsNullOrEmpty(pathImage)) dispatch('ERROR', "ảnh đại diện sản phẩm.")
        return messError

    }

    function handleChange(e) {
        let target = e.target;
        let newFormState: NewType = { ...formState };
        newFormState[target.name] = target.value;
        setFormState(newFormState);
    };

    function handleOnchangeEditor(name: string, data: any) {
        let newFormState: NewType = { ...formState };
        if (name)
            newFormState[name] = data;
        setFormState(newFormState);
    }


    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h4 className="mr-5 text-dark font-weight-bold">Tạo mới sản phẩm</h4>
            <div>
                <button onClick={async () => await saveData()} type="button" className="mr-3 hms-btn-button btn btn-primary">Lưu</button>
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
                        {
                            isLoadingImg ?
                                <CircularProgress size={68} className={classes.fabProgress} />
                                :
                                <img width={450} src={pathImage} />

                        }
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
                <div className="pb-2">
                    <label className="ml-2 ">Mô tả ngắn</label>
                    <Editor data="" onChange={(data) => handleOnchangeEditor("description", data)} />

                </div>
                <div>
                    <label className="ml-2 ">Mô tả sản phẩm"</label>
                    <Editor data="" onChange={(data) => handleOnchangeEditor("content", data)} />

                </div>
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
                    //inputRef={(r) => refs["seoAlias"] = r}
                    label="SEO Alias"
                    name="seoAlias"
                    value={formState?.seoAlias}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    //inputRef={(r) => refs["seoKeywords"] = r}
                    label="SEO Keywords"
                    name="seoKeywords"
                    value={formState?.seoKeywords}
                    variant="outlined"
                    size="small"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    //inputRef={(r) => refs["seoDescription"] = r}
                    label="SEO Description"
                    name="seoDescription"
                    value={formState?.seoDescription}
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

