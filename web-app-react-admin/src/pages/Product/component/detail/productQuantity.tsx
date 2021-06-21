import React, { useState, useEffect, Fragment } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ColorVM, productQuantityVM, ProductVM, SizeVM } from '@/models/index';
import { useNotification } from '@/components/index'
import { IconPlushSquare, IconEdit } from '@/helpers/svg'
import { green } from '@material-ui/core/colors';
import Select from 'react-select'
import { OptionVariant, IObjectSelect } from '@/constants/utilConstant';
import { apiColor, apiSize } from '@/apis';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IsNullOrEmpty } from '@/helpers/utils';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';


export interface IProps {
    handlePostQuantity: Function
    data?: productQuantityVM[]
    productId: number
}


function ProductQuantity(props: IProps) {
    type NewType = ProductVM | null;
    let history = useHistory();
    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [dataOption, setDataOption] = useState<productQuantityVM[]>()
    const [colors, setColors] = useState<ColorVM[]>()
    const [sizes, setSizes] = useState<SizeVM[]>()
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM[]>([])

    useEffect(() => {
        fetchColor()
        fetchSize()
        setDataProQuantity(props.data ? props.data : [])
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

    function handlePushOption() {
        let newOptionSelect = [...dataProQuantity]
        newOptionSelect.push({ optionVariant: OptionVariant[0].value })
        setDataProQuantity(newOptionSelect)
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

    function handleRemoveItem(index) {
        let newList = [...dataProQuantity]
        if (index > -1 && newList.length > 1) {
            newList.splice(index, 1)
            setDataProQuantity(newList)
        }
        handlePostQuantity(newList)
    }

    function handlePostQuantity(newList) {
        props.handlePostQuantity(newList)
    }


    function handleChangeOption(selectedOption, index) {
        let newOptionSelect = [...dataProQuantity]
        newOptionSelect[index].optionVariant = selectedOption.value
        setDataProQuantity(newOptionSelect)
    }

    function handleOnchangeValue(selectedOption, index, isColor, isSize, target) {
        let newOptionSelect = [...dataProQuantity]
        if (isColor) {
            newOptionSelect[index].colorId = selectedOption.value
            newOptionSelect[index].color = { id: selectedOption.value, name: selectedOption.label }
        }
        else if (isSize) {
            newOptionSelect[index].sizeId = selectedOption.value
            newOptionSelect[index].size = { id: selectedOption.value, name: selectedOption.label }
        } else if (target) {
            newOptionSelect[index][target.name] = target.value
        }

        setDataProQuantity(newOptionSelect)
        handlePostQuantity(newOptionSelect)

    }

    function renderNamevariant(colorName, sizename, name) {
        let text = '';
        if (!IsNullOrEmpty(colorName))
            text += colorName
        if (!IsNullOrEmpty(sizename))
            text += IsNullOrEmpty(text) ? sizename : ` / ${sizename}`
        if (!IsNullOrEmpty(name))
            text += IsNullOrEmpty(text) ? name : ` / ${name}`
        return text;
    }

    function renderItem(item: productQuantityVM, index) {
        return <div className="col-11 mb-3" style={{ margin: '0 auto' }}>
            <div className="d-flex border-line-bottom justify-content-center align-items-center p-3">
                <div className="col-10 d-flex align-items-center">
                    <span className="hmt-image-thumbnail">
                        <AddPhotoAlternateIcon />
                    </span>
                    <div className="cursor">
                        <p onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.productId}/variant/${item.id}`)} style={{ margin: 0, fontSize: '14px', color: '#2962ff', fontWeight: 500 }}>
                            {renderNamevariant(item.color?.name, item.size?.name, item.name)}
                        </p>
                        {item.sku && <p style={{ fontSize: '14px', margin: 0 }}>
                            SKU: {item.sku}
                        </p>}
                    </div>
                </div>

                <div className="col-2" style={{ textAlign: 'end', fontWeight: 500 }}>
                    <span>{item.price} đ</span>

                </div>
            </div>

        </div>
    }




    function renderContent() {
        return <Fragment>
            <div style={{ marginLeft: '5px' }}>
                <div className="col-12 border-line-bottom pb-3 d-flex justify-content-end" style={{ display: 'grid' }}>
                    <div onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.productId}`)} className="btn btn-light pe-2">
                        {IconEdit(14)}
                        <a className="text-label-custom ps-2">Thêm mới biến thể</a>
                    </div>
                    <div className="dropdown ps-2">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Chỉnh sửa biến thể
                        </button>
                        <ul style={{ width: '11rem !important' }} className="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <li><button className="dropdown-item" type="button">Chỉnh giá</button></li>
                            <li><button className="dropdown-item" type="button">Chỉnh SKU</button></li>
                            <li><button className="dropdown-item" type="button">Chỉnh thuộc tính</button></li>
                        </ul>
                    </div>
                </div>
                {
                    dataProQuantity.map((item, index) => {
                        return <Fragment key={`variant${index}`}>
                            {renderItem(item, index)}
                        </Fragment>
                    })

                }
            </div>
        </Fragment >
    }

    return renderContent()
}




export default ProductQuantity;

