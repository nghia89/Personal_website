import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import { InputComponent, useNotification } from '@/components';
import { productQuantityVM } from '@/models';
import { IsNullOrEmpty, formatPrice } from '@/helpers/utils';
import { apiProductQuantity } from '@/apis'


interface IProps {
    productId: number
    isOpen: boolean,
    type: number,
    handleClose: Function,
    data?: productQuantityVM[]
}

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: '30%'
    }
}));

const PRICE = 1, SKU = 2;
export default function EditVariant(props: IProps) {
    const dispatch = useNotification();
    const classes = useStyles();
    let { isOpen, type, data } = props;

    const [productQuantityState, setProductQuantity] = useState(data)
    const [price, setPrice] = useState(0)

    async function handleConfirm() {
        props.handleClose()
        let rsp = await apiProductQuantity.updates(productQuantityState);
        if (!rsp.isError)
            dispatch('SUCCESS', 'Cập nhật thành công')
    }

    function renderItem(item: productQuantityVM, index) {
        if (type == PRICE)
            return renderContentPrice(item, index)
        if (type == SKU)
            return renderContentSku(item, index)
    }


    function handleOnchange(e, index) {
        if (productQuantityState) {
            let target = e.target;
            let newFormState = [...productQuantityState];
            newFormState[index][target.name] = target.value;
            setProductQuantity(newFormState);
        }
    }

    function handleClose() {
        props.handleClose(0);
        setPrice(0)
    }

    function handleOnchangeAll(e) {
        if (productQuantityState) {
            let target = e.target;
            setPrice(target.value);
        }
    }

    function handleConfirmPrice() {
        if (productQuantityState) {
            let newFormState = [...productQuantityState];
            newFormState.map((item) => {
                item.price = price
            })
            setProductQuantity(newFormState);
        }

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

    function renderContentPrice(item: productQuantityVM, index) {
        return <InputComponent
            name="price"
            onChange={(e) => handleOnchange(e, index)}
            value={formatPrice(item.price)}
        />
    }

    function renderContentSku(item: productQuantityVM, index) {
        return <InputComponent
            name="sku"
            onChange={(e) => handleOnchange(e, index)}
            value={item.sku}
        />
    }

    function renderTitle() {
        if (type == PRICE)
            return 'giá'
        else if (type == SKU)
            return 'sku'
    }


    function renderContent() {
        return <div className="row">
            {type == PRICE && <div className="col-12 border-line-bottom mb-3 pb-3 d-flex" >
                <div className="col-9 col-md-9">
                    <InputComponent
                        label="Áp dụng cho toàn bộ biến thể"
                        name="price"
                        onChange={(e) => handleOnchangeAll(e)}
                        value={formatPrice(price)}
                    />
                </div>
                <div className="col-3 col-md-3 pt-4 text-center">
                    <button onClick={() => handleConfirmPrice()} type="button" className="btn btn-light">
                        Áp dụng
                    </button >
                </div>
            </div>}

            {productQuantityState?.map((item, index) => {
                return <div key={index} className="row mt-2 mb-2">
                    <div className="col-8">
                        <p> {renderNameVariant(item.color?.name, item.size?.name, item.name)}</p>
                    </div>
                    <div className="col-4">
                        {renderItem(item, index)}
                    </div>
                </div>
            })}
        </div>



    }


    return (
        <Dialog
            //TransitionComponent={Transition}
            classes={{ paper: classes.dialogPaper }}
            open={isOpen}
            aria-labelledby="simple-dialog-title ">
            <DialogTitle className="border-line-bottom" id="simple-dialog-title"><h2>Chỉnh sửa {renderTitle()}</h2></DialogTitle>
            <DialogContent>
                <div className="row" style={{ overflowY: 'hidden', flex: 'auto' }}>
                    {productQuantityState ? renderContent() :
                        <span>Không có dữ liệu</span>
                    }
                </div>

            </DialogContent>
            <DialogActions className="mt-2 mb-2">
                <button onClick={() => handleClose()} type="button" className="btn btn-danger">
                    Hủy
                </button >
                <button onClick={() => handleConfirm()} type="button" className="btn btn-primary">
                    Cập nhật
                </button >
            </DialogActions>
        </Dialog>
    );
}
