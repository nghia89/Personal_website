import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, CircularProgress, FormControlLabel, Switch } from '@material-ui/core';
import { ProductVM, UserVM } from '@/models/index';
import { apiProduct, apiProductCategory } from '@/apis/index';
import { Editor, ImageUploadCard, TreeViewCategory, useNotification } from '@/components/index'
import { validateField, IsNullOrEmpty } from '@/helpers/utils'
import { validateProductVm } from '@/models/validateField';
import { green } from '@material-ui/core/colors';
import history from "@/history";
import { IBreadcrumbs } from '@/models/commonM';
import { PATH } from '@/constants/paths'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
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
function ProductCreate(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    type NewType = ProductVM | null;

    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [pathImage, setPathImage] = useState<string>("")
    const [isLoadingImg, setisLoadingImg] = useState<Boolean>(false)

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách nhân viên', path: PATH.PRODUCT },
            { name: 'Tạo mới sản phẩm' }
        ]);

        let newFormState: NewType = { ...formState };
        newFormState['status'] = 1;
        setFormState(newFormState);
    }, [])


    useEffect(() => {
        if (formState?.productCategoryId) {
            genarateCode()
        }
    }, [formState?.productCategoryId])

    async function genarateCode() {
        await apiProductCategory.getById(formState?.productCategoryId).then(async (rsp) => {
            if (!rsp.isError) {
                await apiProduct.getGenarateCode(rsp.code).then((rsp) => {
                    if (!rsp.isError) {
                        let newFormState: NewType = { ...formState };
                        newFormState['code'] = rsp.data;
                        setFormState(newFormState);
                    };
                })
            }
        })
    }


    async function saveData() {
        if (!validateFields()) {
            await apiProduct.create(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm sản phẩm thành công.')
                    history.goBack()
                    // props.handleClose()
                    // props.handleReload()
                    return
                }
            })
        }
    }

    function handleOnchangeValue(value, name) {
        let newFormState: NewType = { ...formState };
        newFormState[name] = value;
        setFormState(newFormState);
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
        else if (!formState?.productCategoryId)
            dispatch('ERROR', 'Vui lòng chọn danh mục sản phẩm')
        else if (!IsNullOrEmpty(pathImage)) dispatch('ERROR', "Vui lòng thêm ảnh đại diện sản phẩm.")
        return messError

    }

    function handleChange(e) {
        let target = e.target;
        let newFormState: NewType = { ...formState };
        newFormState[target.name] = target.value;
        setFormState(newFormState);
    };

    function handleOnchange(name: string, data: any) {
        let newFormState: NewType = { ...formState };
        if (name)
            newFormState[name] = data;
        setFormState(newFormState);
    }


    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            <div>
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
            </div>
        </div>
    }


    function renderContentGeneral() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="color-black font-weight-bold">Nội dung chung</h6>
                <div>
                    <label>Trạng thái <span className="text-danger">*</span></label>
                    <Switch
                        required
                        checked={formState?.status == 1 ? true : false}
                        onChange={() => handleOnchange('status', formState?.status == 1 ? 0 : 1)}
                        color="primary"
                    />
                </div>
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
                <div className="row align-items-center">
                    <div className="col-6">
                        <TreeViewCategory
                            handleOnchange={(value) => handleOnchangeValue(value, 'productCategoryId')}
                            dataValue={formState?.productCategoryId}
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            placeholder="Mã sản phẫm"
                            name="code"
                            disabled
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
                            color={'primary'}
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
                        <h6 className="color-black">Ảnh đại diện *</h6>
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
                <h6 className="color-black font-weight-bold">Mô tả sản phẩm</h6>

            </div>
            <div className="col-10">
                <div className="pb-2">
                    <label className="color-black ml-2 ">Mô tả ngắn</label>
                    <Editor data="" onChange={(data) => handleOnchange("description", data)} />

                </div>
                <div>
                    <label className="color-black ml-2 ">Mô tả sản phẩm</label>
                    <Editor data="" onChange={(data) => handleOnchange("content", data)} />

                </div>
            </div>
        </div>
    }
    function renderContentSeo() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="color-black font-weight-bold">SEO từ khoá</h6>
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


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)

