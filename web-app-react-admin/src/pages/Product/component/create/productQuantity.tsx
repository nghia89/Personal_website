import React, { useState, useEffect, Fragment } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ColorVM, productQuantityVM, ProductVM, SizeVM } from '@/models/index';
import { useNotification } from '@/components/index'
import { IconPlushSquare, IconTrash } from '@/helpers/svg'
import { green } from '@material-ui/core/colors';
import Select from 'react-select'
import { OptionVariant, IObjectSelect } from '@/constants/utilConstant';
import { apiColor, apiSize } from '@/apis';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
export interface IProps {
    handlePostQuantity: Function
}

let groupId = 1;
function ProductQuantity(props: IProps) {
    const initOption: productQuantityVM[] = [{ optionVariant: OptionVariant[0].value, groupId: groupId }, { optionVariant: OptionVariant[1].value, groupId: groupId }, { optionVariant: OptionVariant[2].value, groupId: groupId }]
    const [colors, setColors] = useState<ColorVM[]>()
    const [sizes, setSizes] = useState<SizeVM[]>()
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM[]>(initOption)
    const [listGroup, setListGroup] = useState([groupId])
    const [isLoadingImg, setisLoadingImg] = useState<Boolean>(false)
    const [isShowMoreVariant, setIsShowMoreVariant] = useState<boolean>(false)

    useEffect(() => {
        groupId = 1
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
        ++groupId;
        let newGroup = [...listGroup]
        newGroup.push(groupId)
        setListGroup(newGroup)

        let newOptionSelect = [...dataProQuantity]

        initOption[0].groupId = groupId
        initOption[1].groupId = groupId
        initOption[2].groupId = groupId

        let optionConcat = newOptionSelect.concat(initOption)
        setDataProQuantity(optionConcat)
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

    function handleRemoveItem(name, groupId) {
        let newList = [...dataProQuantity]
        let index = newList.findIndex(x => x.groupId == groupId && x.optionVariant == name)
        if (index > -1 && newList.length > 1) {
            newList.splice(index, 1)
            setDataProQuantity(newList)
        }
        let checkLenght = newList.filter(a => a.groupId == groupId).length == 0;
        if (checkLenght) {
            let indexGroup = listGroup.findIndex(a => a == groupId)
            if (indexGroup > -1) {
                listGroup.splice(indexGroup, 1)
                setListGroup(listGroup)
            }
        }
        handlePostQuantity(newList)
    }

    function handlePostQuantity(newList) {
        props.handlePostQuantity(newList, isShowMoreVariant)
    }


    function handleChangeOption(selectedOption, index, groupId) {
        let newOptionSelect = [...dataProQuantity]
        let optionGroup = newOptionSelect.filter(x => x.groupId == groupId)
        optionGroup[index].optionVariant = selectedOption.value
        setDataProQuantity(newOptionSelect)
    }

    function handleOnchangeValue(selectedOption, index, isColor, isSize, target, groupId) {
        let newOptionSelect = [...dataProQuantity]
        let optionGroup = newOptionSelect.filter(x => x.groupId == groupId)
        if (isColor) {
            optionGroup[index].colorId = selectedOption.value
            optionGroup[index].color = { id: selectedOption.value, name: selectedOption.label }
        }
        else if (isSize) {
            optionGroup[index].sizeId = selectedOption.value
            optionGroup[index].size = { id: selectedOption.value, name: selectedOption.label }
        } else if (target) {
            optionGroup[index][target.name] = target.value
        }

        setDataProQuantity(newOptionSelect)
        handlePostQuantity(newOptionSelect)

    }

    function renderItem(item: productQuantityVM, index, groupId) {
        let optionVariant = OptionVariant.find(x => x.value == item.optionVariant);
        let isColor = optionVariant?.value == OptionVariant[0].value ? true : false
        let isSize = optionVariant?.value == OptionVariant[1].value ? true : false
        let valueOption = isColor ? { value: item.colorId, label: item.color?.name } : isSize ? { value: item.sizeId, label: item.size?.name } : null;
        let lsOptionGroup = dataProQuantity.filter(a => a.groupId == groupId);

        let lsOptionVariant = OptionVariant.filter(a => lsOptionGroup.findIndex(x => x.optionVariant == a.value) <= -1)
        return <div className="row mb-3 align-items-center">
            <div className="col-3">
                <Select
                    className="basic-single "
                    placeholder="Biến thể..."
                    classNamePrefix="select"
                    value={optionVariant}
                    name="color"
                    options={lsOptionVariant}
                    onChange={(selectedOption) => handleChangeOption(selectedOption, index, groupId)}
                />
            </div>
            <div className="col-8">
                {
                    (isColor || isSize) ? <Select
                        className="basic-single "
                        placeholder="Chọn giá trị..."
                        classNamePrefix="select"
                        value={valueOption}
                        options={optionVariant?.value == OptionVariant[0].value ? colors : sizes}
                        onChange={(selectedOption) => handleOnchangeValue(selectedOption, index, isColor, isSize, null, groupId)}
                    /> :
                        <input name="name" onChange={(e) => handleOnchangeValue(null, index, null, null, e.target, groupId)} className="form-control" type="text" />
                }
            </div>
            <div className="col-1">
                <span className="cursor" onClick={() => handleRemoveItem(item.optionVariant, groupId)}>
                    {IconTrash()}
                </span>
            </div>
        </div>
    }




    function renderContent() {
        return <Fragment>
            <div style={{ marginLeft: '5px' }}>
                {listGroup.map((item, i) => {
                    let groupId = item
                    let quantityGroup = dataProQuantity.filter(x => x.groupId == item)
                    return <div key={`group${i}`}>
                        <label style={{ fontWeight: 700, marginBottom: '10px' }}>Nhóm thuộc tính {++i}</label>
                        {
                            quantityGroup.map((item, index) => {
                                return <Fragment key={`variant${index}`}>
                                    {renderItem(item, index, groupId)}
                                </Fragment>
                            })
                        }
                    </div>
                })}

                <div onClick={() => handlePushOption()} className="mt-5 btn-add-custom cursor" >
                    {IconPlushSquare()}
                    <a className="px-2 text-white">
                        Thêm thuộc tính khác</a>
                </div>
            </div>
        </Fragment>
    }

    return (
        <div>
            {isShowMoreVariant && renderContent()}
            <div className="mb-3 mt-3 mx-2">
                < FormControlLabel
                    control={
                        <Checkbox
                            checked={isShowMoreVariant}
                            onChange={() => { setIsShowMoreVariant(!isShowMoreVariant); handlePostQuantity(dataProQuantity) }}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Sản phẩm này có nhiều biến thể. Ví dụ như khác nhau về kích thước, màu sắc..."
                />
            </div>
        </div>

    )
}




export default ProductQuantity;

