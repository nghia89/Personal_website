import React, { useState, useEffect, Fragment } from 'react'
import { TextField, makeStyles, createStyles, Theme, Switch } from '@material-ui/core';
import { productQuantityVM, ProductVM } from '@/models/index';
import { apiProduct, apiProductCategory, apiUploadFile } from '@/apis/index';
import { Editor, TreeViewCategory, useNotification, FileUpload } from '@/components/index'
import { validateField, groupBy, formatPrice } from '@/helpers/utils'
import { validateProductVm } from '@/models/validateField';
import { green } from '@material-ui/core/colors';
import history from "@/history";
import { Attachments, IBreadcrumbs } from '@/models/commonM';
import { PATH } from '@/constants/paths'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import ProductQuantity from './productQuantity'
import { OptionVariant } from '@/constants/utilConstant';
import { env } from '@/environments/config';
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
    const [isShowSeo, setIsShowSeo] = useState<Boolean>(false)
    const [listImage, setListImage] = useState<Array<Attachments>>([])

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách sản phẩm', path: PATH.PRODUCT },
            { name: 'Tạo mới sản phẩm' }
        ]);

        let newFormState: NewType = { ...formState };
        newFormState['status'] = 1;
        setFormState(newFormState);
    }, [])


    useEffect(() => {
        if (formState?.productCategoryId) {
            generateCode()
        }
    }, [formState?.productCategoryId])

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


    async function saveData() {
        if (!validateFields()) {
            var lsQuantity = mapProQuantityModel()
            if (lsQuantity[0] && formState)
                formState.productQuantity = lsQuantity
            await apiProduct.create(formState).then(async (rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm sản phẩm thành công.')
                    if (listImage[0]) {
                        const formData = new FormData();
                        listImage.forEach((file) => formData.append('File', file.path))
                        let rspImg = await apiUploadFile.UploadProductImage(rsp.data, formData);
                        if (!rspImg.isError)
                            history.push(`${PATH.PRODUCT_DETAIL}${rsp.data}`)
                    } else history.push(`${PATH.PRODUCT_DETAIL}${rsp.data}`)
                }
            })
        }
    }




    function mapProQuantityModel() {
        let proQuantityModel: productQuantityVM[] = []
        let groupQuantity = formState?.productQuantity;
        if (groupQuantity && groupQuantity[0]) {
            var grouped = groupBy("groupId", groupQuantity)
            let objectKey = Object.keys(grouped);
            objectKey?.forEach((item) => {
                let objQuantity: productQuantityVM = {}
                grouped[item]?.forEach((e) => {
                    if (e.optionVariant === OptionVariant[0].value) {
                        objQuantity.colorId = e.colorId
                        objQuantity.optionVariantColor = e.optionVariant
                    }
                    if (e.optionVariant === OptionVariant[1].value) {
                        objQuantity.optionVariantSize = e.optionVariant
                        objQuantity.sizeId = e.sizeId
                    }
                    if (e.optionVariant === OptionVariant[2].value) {
                        objQuantity.name = e.name
                        objQuantity.optionVariantName = e.optionVariant
                    }
                })
                if (Object.keys(objQuantity).length > 0)
                    proQuantityModel.push(objQuantity)
            })
        }
        return proQuantityModel;
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
        else if (!formState?.productCategoryId) {
            dispatch('ERROR', 'Vui lòng chọn danh mục sản phẩm')
            return true
        }
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
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
            </div>
        </div>
    }




    function renderContentGeneral() {
        return <div className="row pt-3 pb-3">
            <div className="col-12">
                <div className="wrapper-content ps-3">
                    <div className=" mb-2  border-line-bottom">
                        <span className="font-weight-bold ui-information-title   mb-2 ">Thông tin chung</span>
                    </div>
                    <div>
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

        </div>
    }


    function renderProductImages() {
        return <div className="row  pt-3 pb-2">
            <div className="col-12">
                <div className="wrapper-content ps-3" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    <div className=" mb-2  border-line-bottom">
                        <span className="font-weight-bold ui-information-title   mb-2 ">Hình Ảnh Sản Phẩm</span>
                    </div>
                    <FileUpload
                        files={listImage}
                        multiple
                        onchangeFiles={(files) => setListImage(files)}
                        accept=".jpg,.png,.jpeg"
                    />
                </div>
            </div>
        </div>
    }


    function renderContentProduct() {
        return <div className="row  pt-3 pb-3">
            <div className="col-12">
                <div className="wrapper-content ps-3">
                    <div className=" mb-2  border-line-bottom">
                        <span className="font-weight-bold ui-information-title   mb-2 ">Mô tả sản phẩm</span>
                    </div>
                    <div className="pb-2">
                        <label className="color-black mx-2 mb-2">Mô tả ngắn</label>
                        <Editor data="" onChange={(data) => handleOnchange("description", data)} />

                    </div>
                    <div>
                        <label className="color-black mx-2 mb-2">Mô tả sản phẩm</label>
                        <Editor data="" onChange={(data) => handleOnchange("content", data)} />

                    </div>
                </div>
            </div>
        </div>
    }

    function renderContentSeo() {
        return <div className="row pt-3 pb-3">
            <div className="col-12">
                <div className="wrapper-content ps-3">
                    <div className=" mb-2  border-line-bottom">
                        <span className="font-weight-bold ui-information-title   mb-2 ">SEO từ khoá</span>
                    </div>
                    <div className=" pb-3" style={{ textAlign: 'right', display: 'block', marginLeft: '5px' }}>
                        <a onClick={() => setIsShowSeo(!isShowSeo)} className="text-label-custom ps-2 font-weight-500">Chỉnh sửa SEO</a>
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
        </div >
    }

    function renderProductQuantity() {
        return <div className="row  pt-3 pb-3">
            <div className="col-12">
                <div className="wrapper-content ps-3">
                    <div className=" mb-2  border-line-bottom">
                        <span className="font-weight-bold ui-information-title   mb-2 ">Biến Thể</span>
                    </div>
                    {<ProductQuantity
                        handlePostQuantity={(data, isShowMoreVariant) => {
                            if (isShowMoreVariant) {
                                let newData = { ...formState }
                                newData.productQuantity = data
                                setFormState(newData)
                            } else {
                                let newData = { ...formState }
                                newData.productQuantity = []
                                setFormState(newData)
                            }
                        }}
                    />}
                </div>
            </div>
        </div>
    }

    function renderContent() {
        return <Fragment>
            <form className={"row"} noValidate autoComplete="off">
                <div className="col-10">
                    {renderContentGeneral()}
                    {renderProductImages()}
                    {renderContentProduct()}
                    {renderProductQuantity()}
                    {renderContentSeo()}
                </div>
                <div className="col-2 pt-3">
                    <div className="ps-2 wrapper-content">
                        <div className=" mb-2  border-line-bottom">
                            <span className="font-weight-bold ui-information-title   mb-2 ">Hiển thị</span>
                        </div>
                        <label>Trạng thái <span className="text-danger">*</span></label>
                        <Switch
                            required
                            checked={formState?.status === 1 ? true : false}
                            onChange={() => handleOnchange('status', formState?.status === 1 ? 0 : 1)}
                            color="primary"
                        />
                    </div>
                </div>

            </form >
        </Fragment>
    }

    return <div className="row">
        <div className="col-12 mt-3">
            {renderHeader()}
            {renderContent()}
            {renderHeader()}
        </div>
    </div>
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)

