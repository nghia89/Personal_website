import React, { useState, useEffect, Fragment } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ColorVM, productQuantityVM, ProductVM, SizeVM } from '@/models/index';
import { useNotification } from '@/components/index'
import { IconPlushSquare, IconTrash } from '@/helpers/svg'
import { green } from '@material-ui/core/colors';
import Select from 'react-select'
import { OptionVariant, IObjectSelect } from '@/constants/utilConstant';
import { apiColor, apiSize } from '@/apis';
export interface IProps {
    handlePostQuantity: Function
}


function ProductQuantity(props: IProps) {
    type NewType = ProductVM | null;

    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [dataOption, setDataOption] = useState<productQuantityVM[]>()
    const [colors, setColors] = useState<ColorVM[]>()
    const [sizes, setSizes] = useState<SizeVM[]>()
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM[]>([{ optionVariant: OptionVariant[0].value }])

    useEffect(() => {
        fetchColor()
        fetchSize()
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

    function renderItem(item: productQuantityVM, index) {
        let optionVariant = OptionVariant.find(x => x.value == item.optionVariant);
        let isColor = optionVariant?.value == OptionVariant[0].value ? true : false
        let isSize = optionVariant?.value == OptionVariant[1].value ? true : false
        let valueOption = isColor ? { value: item.colorId, label: item.color?.name } : isSize ? { value: item.sizeId, label: item.size?.name } : null;
        return <div className="row mb-3">
            <div className="col-3">
                <Select
                    className="basic-single "
                    placeholder="Biến thể..."
                    classNamePrefix="select"
                    value={optionVariant}
                    name="color"
                    options={OptionVariant}
                    onChange={(selectedOption) => handleChangeOption(selectedOption, index)}
                />
            </div>
            <div className="col-8">
                {
                    (isColor || isSize) ? <Select
                        className="basic-single "
                        placeholder="Chọn giá trị..."
                        classNamePrefix="select"
                        value={valueOption}
                        name="color"
                        options={optionVariant?.value == OptionVariant[0].value ? colors : sizes}
                        onChange={(selectedOption) => handleOnchangeValue(selectedOption, index, isColor, isSize, null)}
                    /> :
                        <input name="phoneNumber" onChange={(e) => handleOnchangeValue(null, index, null, null, e.target)} className="form-control" type="text" />
                }
            </div>
            <div className="col-1">
                <span className="cursor" onClick={() => handleRemoveItem(index)}>
                    {IconTrash()}
                </span>
            </div>
        </div>
    }




    function renderContent() {
        return <Fragment>
            <div style={{ marginLeft: '5px' }}>
                {
                    dataProQuantity.map((item, index) => {
                        return <Fragment key={`variant${index}`}>
                            {renderItem(item, index)}
                        </Fragment>
                    })

                }
                <div onClick={() => handlePushOption()} className="mt-5 btn-add-custom cursor" >
                    {IconPlushSquare()}
                    <a className="px-2 text-white">
                        Thêm thuộc tính khác</a>
                </div>
            </div>
        </Fragment>
    }

    return renderContent()
}




export default ProductQuantity;

