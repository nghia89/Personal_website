import React, { useState } from 'react';
import { AlertDialogSlide, FileUpload } from '@/components';
import { Attachments } from '@/models/commonM';


interface IProps {
    productId: number
    isOpen: boolean,
    handleClose: Function,
    data: Attachments[],
    handleOnchange: Function
}

export default function ImgUrlVariant(props: IProps) {
    let { isOpen, data } = props;

    const [listImage, setListImage] = useState(data)
    const [fileSelected, setFileSelected] = useState<any>(data)

    async function handleConfirm() {
        handleClose()
        props.handleOnchange(fileSelected)
    }


    function handleClose() {
        setFileSelected(null)
        props.handleClose();
    }


    async function handleChangeFiles(files: Attachments[], isDragAndDrop) {

    }


    function renderContent() {
        return <div className="row">
            <FileUpload
                files={listImage}
                onchangeFiles={(files, isDragAndDrop) => handleChangeFiles(files, isDragAndDrop)}
                handleFileSelected={(file) => setFileSelected(file)}
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
