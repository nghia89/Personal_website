import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles, createStyles, Theme, Checkbox, FormControlLabel } from '@material-ui/core';
import { ColorVM, productQuantityVM, ProductVM, SizeVM } from '@/models/index';
import { apiColor, apiProduct, apiProductQuantity, apiSize } from '@/apis/index';
import { AlertDialogSlide, InputComponent, useNotification } from '@/components/index'
import { IsNullOrEmpty, validateField } from '@/helpers/utils'
import { green } from '@material-ui/core/colors';
import history from "@/history";
import { IBreadcrumbs } from '@/models/commonM';
import { PATH } from '@/constants/paths'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { OptionVariant } from '@/constants/utilConstant';
import Select from 'react-select'
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconTrash } from '@/helpers/svg';
import { Loading } from '@/components/loaders';
import { validateProductQuantityVm } from '@/models/validateField';
export interface IProps {
    match: { params: { id: any, quantityid: any } }
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
function VariantNew(props: IProps) {
    const classes = useStyles();
    let dispatch = useNotification();
    type NewType = ProductVM | null;

    const [colors, setColors] = useState<ColorVM[]>()
    const [sizes, setSizes] = useState<SizeVM[]>()
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM>({})
    const [dataProduct, setDataProduct] = useState<ProductVM>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isHiddenColor, setHiddenColor] = useState<boolean>(false)
    const [isHiddenSize, setHiddenSize] = useState<boolean>(false)
    const [isHiddenName, setHiddenName] = useState<boolean>(false)
    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    let { quantityid } = props.match.params
    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách sản phẩm', path: PATH.PRODUCT },
            { name: 'Chỉnh sửa thêm mới biến thể' }
        ]);
        fetchColor()
        fetchSize()
        fetchDetail()
    }, [])

    async function fetchColor() {
        let data = await apiColor.getAll();
        if (!data.isError) {
            let lsColor: ColorVM[] = []
            data.data?.map((item) => {
                lsColor.push({ ...item, value: item.id, label: item.name })
            })
            setColors(lsColor)
        }
    }


    async function fetchDetail() {
        let rsp = await apiProduct.getById(props.match.params.id);
        if (!rsp.isError) {
            if (quantityid) {
                let quantity = rsp.data.productQuantity.find(x => x.id == quantityid)
                if (quantity) setDataProQuantity(quantity)
            }
            setDataProduct(rsp.data)
            setIsLoading(false)
        }
    }

    async function fetchSize() {
        let data = await apiSize.getAll();
        if (!data.isError) {
            let lsSize: ColorVM[] = []
            data.data?.map((item) => {
                lsSize.push({ ...item, value: item.id, label: item.name })
            })
            setSizes(lsSize)
        }
    }
    async function handleDelete() {
        await apiProductQuantity.delete(quantityid).then((rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Xóa biến thể thành công.')
                fetchDetail()
                setIsShowModal(false)
            }
        })
    }

    async function saveData() {
        if (!validateFields()) {
            if (quantityid) {
                await apiProductQuantity.update(dataProQuantity).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Cập nhật biến thể thành công.')
                        fetchDetail()
                    }
                })
            } else {
                dataProQuantity.productId = props.match.params.id;
                await apiProductQuantity.create(dataProQuantity).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Tạo mới biến thể thành công.')
                        fetchDetail()
                    }
                })
            }
        }
    }

    function validateFields() {
        let messError = validateField(validateProductQuantityVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError
    }



    function handleOnchangeValue(selectedOption, isColor, isSize, target) {
        let newDataQuantity = { ...dataProQuantity }
        if (isColor) {
            newDataQuantity.colorId = selectedOption.value
            newDataQuantity.color = selectedOption
            newDataQuantity.optionVariantColor = OptionVariant[0].value
        }
        else if (isSize) {
            newDataQuantity.sizeId = selectedOption.value
            newDataQuantity.size = selectedOption
            newDataQuantity.optionVariantSize = OptionVariant[1].value
        } else if (target) {
            newDataQuantity[target.name] = target.value
            newDataQuantity.optionVariantName = OptionVariant[2].value
        }
        setDataProQuantity(newDataQuantity)
    }

    function renderNameVariant(colorName, sizeName, name) {
        let text = '';
        if (!IsNullOrEmpty(colorName))
            text += colorName
        if (!IsNullOrEmpty(sizeName))
            text += IsNullOrEmpty(text) ? sizeName : ` / ${sizeName}`
        if (!IsNullOrEmpty(name))
            text += IsNullOrEmpty(text) ? name : ` / ${name}`
        return text;
    }


    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            <div>
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
            </div>
        </div>
    }

    function handleOnchange(e) {
        let target = e.target;
        let newFormState = { ...dataProQuantity };
        newFormState[target.name] = target.value;
        setDataProQuantity(newFormState);
    }

    function handleOnchangeCheck(e) {
        let target = e.target;
        let newFormState = { ...dataProQuantity };
        newFormState[target.name] = target.checked;
        setDataProQuantity(newFormState);
    }

    function renderLeft() {
        return <div className="col-4">
            <div className="wrapper-content mb-5">
                <div className="ui-information">
                    <div className="ui-information-body">
                        <div className="d-flex py-2">
                            <div className="product-info-preview-container image-wrapper-border-solid  align-items-center  mx-2">
                                <a aria-current="page" className="w-100 h-100 active" href="/admin/products/1032405371">
                                    <img className="product-info-preview-img" src="https://product.hstatic.net/200000327889/product/2514224045_2_1_2_ff311d07354e413da955df3b97d2706e_aeb6226bede047258d997b80214ddc10.jpg" />
                                </a>
                            </div>
                            <div className="flex-grow-1 pl-3 d-flex flex-column justify-content-around break-text">
                                <div className="h6 mb-0">{dataProduct?.name}</div>
                                <div className="small text-muted py-1 cursor">{dataProduct?.productQuantity?.length} Chi tiết biến thể</div>
                                <a aria-current="page" className="w-100 h-100 active" onClick={() => history.push(`${PATH.PRODUCT_DETAIL}${props.match.params.id}`)}>
                                    <span className="small pl-1">Quay về chi tiết sản phẩm</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper-content mb-5">
                <div className="ui-information">
                    <div className="ui-information-head d-flex justify-content-between ms-2 pb-2 mb-2 border-line-bottom">
                        <span className="ui-information-title">Danh sách biến thể</span>
                        <a className="cursor" onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.match.params.id}`)}>Thêm biến thể mới</a>
                    </div>
                    <div className="ui-information-body">
                        <ul className="product-info-variant-list-wrapper break-text" style={{ margin: 0, padding: 0 }}>
                            {
                                dataProduct?.productQuantity?.map((item, index) => {
                                    return <li
                                        onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.match.params.id}/variant/${item.id}`)}
                                        key={`item-variant${index}`} className={`product-info-variant-item py-3 d-flex align-items-center cursor ${item.id == quantityid ? 'active' : ''}`}>
                                        <div className="product-info-list-item-img-wrapper image-wrapper-border-solid">
                                            {
                                                item.imageUrl ? <img className="product-info-preview-img" src={item.imageUrl} />
                                                    : item.color?.colorCode ? <span className='h-70-percent w-70-percent' style={{ backgroundColor: item.color?.colorCode }}></span>
                                                        : <span className="product-info-preview-img" style={{ position: 'inherit' }} ><AddPhotoAlternateIcon /></span>
                                            }
                                        </div>
                                        <div
                                            className="pl-3 ms-2 d-flex flex-column justify-content-around ">
                                            <label className="mb-0">{renderNameVariant(item.color?.name, item.size?.name, item.name)}</label>
                                            {item.sku && <p className="small mb-0">SKU: {item.sku}</p>}
                                        </div>
                                    </li>
                                })
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </div >
    }



    function renderDetail() {
        return <div className="wrapper-content mb-5">
            <div className="ui-information">

                <div className="ui-information-head ms-2  mb-2 border-line-bottom">
                    <span className="ui-information-title ">Các thuộc tính</span>
                </div>
                <div className="ui-information-body justify-content-center ms-2">
                    <div className="row ">
                        < FormControlLabel
                            className="poiter"
                            control={
                                <Checkbox
                                    checked={dataProQuantity.allowPurchaseWhenSoldOut}
                                    onChange={(e) => handleOnchangeCheck(e)}
                                    name="allowPurchaseWhenSoldOut"
                                    color="primary"
                                />
                            }
                            label="Đồng ý đặt hàng khi đã hết hàng"
                        />
                        <div className=" col-12 col-md-6 ui-information-body pt-3">
                            <InputComponent
                                label="Giá bán"
                                name="price"
                                onChange={(e) => handleOnchange(e)}
                                isFormatPrice
                                placeholder="0"
                                value={dataProQuantity.price}
                            />
                        </div>
                        <div className=" col-12 col-md-6 ui-information-body pt-3">
                            <InputComponent
                                label="SKU"
                                name="sku"
                                onChange={(e) => handleOnchange(e)}
                                value={dataProQuantity.sku}
                            />
                        </div>
                        <div className="col-12 col-md-6 ui-information-body pt-3">
                            <InputComponent
                                label="Số lượng"
                                name="quantity"
                                onChange={(e) => handleOnchange(e)}
                                placeholder="0"
                                type='number'
                                value={dataProQuantity.quantity}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }


    function renderRight() {
        return <div className="col-8">
            <div className="wrapper-content mb-5">
                <div className="ui-information">
                    <div className="ui-information-head ms-2   mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Các thuộc tính</span>
                    </div>
                    <div className="ui-information-body">
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <div className="flex-grow-1 ms-2">
                                    {
                                        ((dataProQuantity.colorId || !quantityid) && !isHiddenColor) && <div className="row">
                                            <div className={!quantityid ? "col-11 pt-3" : "col-12 pt-3"}>
                                                <label>Màu sắc</label>
                                                <Select
                                                    ref={(r) => refs['color'] = r}
                                                    className="basic-single "
                                                    placeholder="Chọn giá trị..."
                                                    classNamePrefix="select"
                                                    value={{ value: dataProQuantity.colorId, label: dataProQuantity.color?.name }}
                                                    options={colors}
                                                    onChange={(selectedOption) => handleOnchangeValue(selectedOption, true, false, null)}
                                                />
                                            </div>
                                            {!quantityid &&
                                                <div className="col-1 pt-3" style={{ marginTop: '30px' }}>
                                                    <span className="cursor" onClick={() => setHiddenColor(true)}>
                                                        {IconTrash()}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {((dataProQuantity.sizeId || !quantityid) && !isHiddenSize) && <div className="row">
                                        <div className={!quantityid ? "col-11 pt-3" : "col-12 pt-3"}>
                                            <label>Kích thước</label>
                                            <Select
                                                ref={(r) => refs['size'] = r}
                                                className="basic-single "
                                                placeholder="Chọn giá trị..."
                                                classNamePrefix="select"
                                                value={{ value: dataProQuantity.sizeId, label: dataProQuantity.size?.name }}
                                                options={sizes}
                                                onChange={(selectedOption) => handleOnchangeValue(selectedOption, false, true, null)}
                                            />
                                        </div>
                                        {!quantityid && <div className="col-1 pt-3" style={{ marginTop: '30px' }}>
                                            <span className="cursor" onClick={() => setHiddenSize(true)}>
                                                {IconTrash()}
                                            </span>
                                        </div>}
                                    </div>
                                    }
                                    {((dataProQuantity.name || !quantityid) && !isHiddenName) &&
                                        <div className="row">
                                            <div className={!quantityid ? "col-11 pt-3" : "col-12 pt-3"}>
                                                <label>Tiêu đề</label>
                                                <div className="next-input--has-border-left">
                                                    <input ref={(r) => refs['name'] = r} type="text" name="name"
                                                        onChange={(e) => handleOnchangeValue(null, null, null, e.target)}
                                                        className="next-input" placeholder=" " value={dataProQuantity.name} />
                                                </div>
                                            </div>
                                            {!quantityid && <div className="col-1 pt-3" style={{ marginTop: '30px' }}>
                                                <span className="cursor" onClick={() => setHiddenName(true)}>
                                                    {IconTrash()}
                                                </span>
                                            </div>}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="pt-5 pr-3">
                                    <div className="variant-image-container">
                                        <img className="product-info-preview-img" src={dataProQuantity.imageUrl} />
                                    </div>
                                    <div className="d-block btn btn-link font-weight-bold">Thay đổi ảnh</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {renderDetail()}
        </div>
    }


    function renderContent() {
        return <Fragment>
            {renderLeft()}
            {renderRight()}
        </Fragment >
    }

    return <div className="container">
        <div className="row">
            {renderHeader()}
            {isLoading ? <div className="content_table_data_empty" >
                <Loading />
            </div>
                : renderContent()}
            <div className="pb-3 d-flex justify-content-between align-items-center">

                <div>
                    {quantityid && <button onClick={async () => setIsShowModal(true)} type="button" className="mx-3 hms-btn-button btn btn-danger">Xóa biến thể</button>}
                </div>

                <div>
                    <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
                </div>
            </div>
            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => setIsShowModal(false)}
                handleConfirm={() => handleDelete()}
                note={"Bạn có chắc chắn muốn xoá sản phẩm này?"}
            />
        </div>
    </div >
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(VariantNew)

