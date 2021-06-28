import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Slide } from '@material-ui/core';
import { AlertDialogSlide, FileUpload, InputComponent, useNotification } from '@/components';
import { productQuantityVM } from '@/models';
import { IsNullOrEmpty, formatPrice } from '@/helpers/utils';
import { apiProduct, apiProductQuantity } from '@/apis'
import { TransitionProps } from '@material-ui/core/transitions';
import { ProductImageVM } from '@/models/product';
import { Attachments } from '@/models/commonM';


interface IProps {
    productId: number
    isOpen: boolean,
    handleClose: Function,
    data: Attachments[],
    handleOnchange: Function
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: '30%'
    }
}));

export default function ImgUrlVariant(props: IProps) {
    const dispatch = useNotification();
    const classes = useStyles();
    let { isOpen, data, productId } = props;

    const [listImage, setListImage] = useState(data)

    async function handleConfirm() {
        // props.handleClose()
        // let rsp = await apiProductQuantity.updates();
        // if (!rsp.isError)
        //     dispatch('SUCCESS', 'Cập nhật thành công')
    }


    function handleClose() {
        props.handleClose();
    }


    async function handleChangeFiles(files: Attachments[], isDragAndDrop) {

    }


    function renderContent() {
        return <div className="row">
            <FileUpload
                files={listImage}
                onchangeFiles={(files, isDragAndDrop) => handleChangeFiles(files, isDragAndDrop)}
                handleFileSelected={(file) => console.log(file)}
                accept=".jpg,.png,.jpeg"
                isHiddenDragAndDrop
                isHiddenDelete
                isHiddenUploadFile
            />
        </div>
    }


    return (
        <AlertDialogSlide
            isOpen={isOpen}
            title="Cập nhật hình ảnh biến thể"
            handleClose={() => handleClose()}
            handleConfirm={() => handleConfirm()}
        >
            <div className="row">
                {renderContent()}
            </div>
        </AlertDialogSlide>
    );
}
