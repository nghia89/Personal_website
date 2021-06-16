import React, { useState, useEffect, Fragment } from 'react'
import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core';
import { productQuantityVM, ProductVM } from '@/models/index';
import { useNotification } from '@/components/index'
import { IconTrash } from '@/helpers/svg'
import { green } from '@material-ui/core/colors';
import Select from 'react-select'
import { OptionVariant, IObjectSelect } from '@/constants/utilConstant';
export interface IProps {
}


function ProductQuantity(props: IProps) {
    type NewType = ProductVM | null;

    const [formState, setFormState] = useState<ProductVM | null>(null)
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM[]>([{ optionVariant: OptionVariant[0].value }])


    function handleChange(selectedOption) {
        //setValueOptionVariant(selectedOption)
    }

    function handleOnchange(name: string, data: any) {
        let newFormState: NewType = { ...formState };
        if (name)
            newFormState[name] = data;
        setFormState(newFormState);
    }

    function renderItem(item: productQuantityVM) {
        let optionVariant = OptionVariant.find(x => x.value == item.optionVariant);
        return <div className="row">
            <div className="col-3">
                <Select
                    className="basic-single zindex-dropdown"
                    placeholder="Biến thể..."
                    classNamePrefix="select"
                    value={optionVariant}
                    name="color"
                    options={OptionVariant}
                    onChange={handleChange}
                />
            </div>
            <div className="col-4">
                <Select
                    className="basic-single zindex-dropdown"
                    placeholder="Chọn giá trị..."
                    classNamePrefix="select"
                    value={optionVariant}
                    name="color"
                    options={OptionVariant}
                    onChange={handleChange}
                />
            </div>
            <div className="col-2">
                <input name="quantity" placeholder={"Số lượng"} className="form-control" type="number" />
            </div>
            <div className="col-2">
                <input name="price" placeholder={"Giá bán"} className="form-control" type="number" />
            </div>
            <div className="col-1">
                <span className="cursor">
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
                            {renderItem(item)}
                        </Fragment>
                    })

                }
            </div>
        </Fragment>
    }

    return renderContent()
}




export default ProductQuantity;

