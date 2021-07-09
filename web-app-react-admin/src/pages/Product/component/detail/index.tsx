import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Switch } from '@material-ui/core';
import { ProductVM } from '@/models/index';
import { apiProduct, apiProductCategory, apiUploadFile } from '@/apis/index';
import { AlertDialogSlide, Editor, FileUpload, TreeViewCategory, useNotification } from '@/components/index'
import { validateField, formatPrice } from '@/helpers/utils'
import { validateProductVm } from '@/models/validateField';
import { green } from '@material-ui/core/colors';
import { Loading } from '@/components/loaders';
import { Attachments, IBreadcrumbs } from '@/models/commonM';
import { PATH } from '@/constants/paths'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import ProductQuantity from './productQuantity';
import { env } from '@/environments/config';
import { useHistory } from 'react-router-dom';

export interface IProps {
    match: { params: { id: any } }
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

function ProductDetail(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    const history = useHistory();

    type NewType = ProductVM | null;

    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [productIdCurrent, setProductIdCurrent] = useState<number>(0)
    const [productCodeCurrent, setProductCodeCurrent] = useState<string>('')
    const [isShowSeo, setIsShowSeo] = useState<Boolean>(false)
    const [isAlert, setIsAlert] = useState<boolean>(false)
    const [listImage, setListImage] = useState<Array<Attachments>>([])

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách sản phẩm', path: PATH.PRODUCT },
            { name: 'Chi tiết sản phẩm' }
        ]);
        fetchData()
    }, [])

    useEffect(() => {
        if (listImage.length > 0) {
            let listFileNew = listImage.filter(x => x.id === null || x.id === undefined)
            if (listFileNew.length > 0) {
                postFile(listFileNew)
            }
        }
    }, [listImage])



    useEffect(() => {
        if (formState?.productCategoryId && formState?.id && productIdCurrent !== formState?.productCategoryId) {
            generateCode()
        } else {
            handleOnchangeValue(productIdCurrent, 'productCategoryId')
            handleOnchangeValue(productCodeCurrent, 'code')
        }
    }, [formState?.productCategoryId])


    async function postFile(listFileNew) {
        const formData = new FormData();
        listFileNew.forEach((file) => formData.append('File', file.path))
        let rspImg = await apiUploadFile.UploadProductImage(formState?.id, formData);
        if (!rspImg.isError) {
            dispatch('SUCCESS', 'Thêm ảnh thành công')
            fetchData()
        }

    }

    async function handleDelete() {
        var data = await apiProduct.delete(props.match?.params?.id);
        if (!data.isError) {
            dispatch('SUCCESS', 'Xóa sản phẩm thành công')
            setIsAlert(false)
            history.goBack()
        }

    }

    async function fetchData() {
        await apiProduct.getById(props.match?.params?.id).then((rsp) => {
            if (!rsp.isError) {
                setProductIdCurrent(rsp.data.productCategoryId)
                setProductCodeCurrent(rsp.data.code)
                setFormState(rsp.data);
                setListImage(rsp.data.productImages)
                setIsLoading(false)
            }
        })
    }

    async function generateCode() {
        await apiProductCategory.getById(formState?.productCategoryId).then(async (rsp) => {
            if (!rsp.isError) {
                await apiProduct.getGenarateCode(rsp.data.code).then((rsp) => {
                    if (!rsp.isError) {
                        let newFormState: NewType = { ...formState };
                        newFormState['code'] = rsp.data;
                        setFormState(newFormState);
                    };
                })
            }
        })
    }


    async function deleteProductImg(id) {
        await apiProduct.deleteImg(formState?.id, id).then((rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Xóa ảnh thành công')
            }
        })
    }

    async function handleChangeFiles(files: Attachments[], isDragAndDrop) {
        if (isDragAndDrop) {
            let lsImgId: any = [];
            files.forEach(e => {
                if (e.id) lsImgId.push(e.id)
            })
            let rsp = await apiProduct.productImageReorder(formState?.id, lsImgId);
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Cập nhật ảnh thành công')
                fetchData()
            }
        } else {
            setListImage(files)
        }
    }

    async function saveData() {
        if (!validateFields()) {
            await apiProduct.update(formState).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Cập nhật sản phẩm thành công.')
                }
            })
        }
    }

    function handleOnchangeValue(value, name) {
        let newFormState: NewType = { ...formState };
        newFormState[name] = value;
        setFormState(newFormState);
    }


    function validateFields() {
        let messError = validateField(validateProductVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        else if (!formState?.productCategoryId)
            dispatch('ERROR', 'Vui lòng chọn danh mục sản phẩm')
        // else if (IsNullOrEmpty(pathImage)) dispatch('ERROR', "Vui lòng thêm ảnh đại diện sản phẩm.")
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
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Cập nhật</button>
            </div>
        </div>
    }


    function renderContentGeneral() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="ui-information-title font-weight-bold">Thông tin chung</h6>
                <div>
                    <label>Trạng thái <span className="text-danger">*</span></label>
                    <Switch
                        required
                        checked={formState?.status === 1 ? true : false}
                        onChange={() => handleOnchange('status', formState?.status === 1 ? 0 : 1)}
                        color="primary"
                    />
                </div>
            </div>
            <div className="col-10">
                <div className="wrapper-content ">
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
                                value={formatPrice(formState?.price)}
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
                                value={formatPrice(formState?.originalPrice)}
                                variant="outlined"
                                size="small"
                                className="form-control"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

    function renderProductImages() {
        return <div className="row  pt-3 pb-3">
            <div className="col-2">
                <h6 className="color-black font-weight-bold ui-information-title">Hình Ảnh Sản Phẩm</h6>
            </div>
            <div className="col-10">
                <div className="wrapper-content" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    <FileUpload
                        files={listImage}
                        multiple
                        onchangeFiles={(files, isDragAndDrop) => handleChangeFiles(files, isDragAndDrop)}
                        accept=".jpg,.png,.jpeg"
                        handleDelete={(id) => deleteProductImg(id)}
                    />
                </div>
            </div>
        </div>
    }

    function renderContentProduct() {
        return <div className="row  pt-3 pb-3">
            <div className="col-2">
                <h6 className="ui-information-title font-weight-bold">Mô tả sản phẩm</h6>

            </div>
            <div className="col-10">
                <div className="wrapper-content ">
                    <div className="pb-2">
                        <label className="color-black mx-2 mb-2">Mô tả ngắn</label>
                        <Editor data={formState?.description} onChange={(data) => handleOnchange("description", data)} />

                    </div>
                    <div>
                        <label className="color-black mx-2 mb-2">Mô tả sản phẩm</label>
                        <Editor data={formState?.content} onChange={(data) => handleOnchange("content", data)} />

                    </div>
                </div>
            </div>
        </div>
    }
    function renderContentSeo() {
        return <div className="row pt-3 pb-3">
            <div className="col-2">
                <h6 className="ui-information-title font-weight-bold">SEO từ khoá</h6>
            </div>
            <div className="col-10">
                <div className="wrapper-content ">
                    <div className="border-line-bottom pb-3" style={{ textAlign: 'right', display: 'block', marginLeft: '5px' }}>
                        <a onClick={() => setIsShowSeo(!isShowSeo)} className="text-label-custom ps-3 font-weight-500">Chỉnh sửa SEO</a>
                    </div>
                    {isShowSeo && <div>
                        <div className="ms-2 mb-3 mt-2">
                            {
                                !formState?.title ? <div >
                                    Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục này trên công cụ tìm kiếm như Google
                                </div> :
                                    <div>
                                        <p className="hms-seo--preview-title mb-1 mt-2">{formState.title}</p>
                                        <p className="hms-seo--preview-meta mb-1">{formState.seoDescription}</p>
                                        <p className="hms-seo--preview-url text-truncate mb-0">{env.clientBase}/{formState.seoAlias}</p>
                                    </div>
                            }
                        </div>
                        <TextField
                            label="Tiêu đề"
                            name="title"
                            value={formState?.title}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            label="Từ khóa"
                            name="seoKeywords"
                            value={formState?.seoKeywords}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            label="Mô tả trang"
                            name="seoDescription"
                            value={formState?.seoDescription}
                            variant="outlined"
                            size="small"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />

                        <div className="next-input--stylized ms-2 mb-2">
                            <div className="next-input-add-on next-input__add-on--before">{env.clientBase}/</div>
                            <input name="seoAlias" onChange={(e) => handleChange(e)} type="text" className="next-input next-input--invisible" placeholder="Seo Đường dẫn" step="1" value={formState?.seoAlias}></input>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    }

    function renderProductQuantity() {
        return <div className="row  pt-3 pb-3">
            <div className="col-2">
                <h6 className="color-black font-weight-bold ui-information-title">Biến Thể</h6>
            </div>
            <div className="col-10">
                <div className="wrapper-content">
                    {<ProductQuantity
                        productId={props.match?.params?.id}
                        data={formState?.productQuantity}
                        handlePostQuantity={(data) => {
                            let newData = { ...formState }
                            newData.productQuantity = data
                            setFormState(newData)
                        }}
                    />}
                </div>
            </div>
        </div>
    }
    function renderContent() {
        return <form className={classes.root} noValidate autoComplete="off">
            {renderContentGeneral()}
            {renderProductImages()}
            {renderContentProduct()}
            {renderProductQuantity()}
            {renderContentSeo()}
        </form >
    }

    return <div className="container">
        <div className="row">
            <div className="col-12 mt-3">
                {!isLoading && renderHeader()}

                {isLoading ? <div className="justify-content-center d-flex mt-5"><Loading /></div>
                    : renderContent()}
                <div className="mt-3 mb-3">

                    {!isLoading && <div className="pb-3 d-flex justify-content-between align-items-center">

                        <div>
                            <button onClick={async () => setIsAlert(true)} type="button" className="mx-3 hms-btn-button btn btn-danger">Xóa biến thể</button>
                        </div>

                        <div>
                            <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Cập nhật</button>
                        </div>
                    </div>}
                    <AlertDialogSlide
                        isOpen={isAlert}
                        handleClose={() => setIsAlert(false)}
                        handleConfirm={() => handleDelete()}
                        note={"Bạn có chắc chắn muốn xoá sản phẩm này?"}
                    />
                </div>
            </div>
        </div>
    </div>
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)

