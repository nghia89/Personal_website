import React, { useRef, useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconTrash } from '@/helpers/svg'
import './index.css'
import { Attachments } from "@/models/commonM";
import AlertDialogSlide from "../dialog/AlertDialogSlide";


const KILO_BYTES_PER_BYTE = 1024;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = (1024 * 1024 * 5);
interface IProps {
    multiple: boolean
    onchangeFiles: Function
    handleDelete?: Function
    accept?: string
    maxFileSizeInBytes?: number
    files: Array<Attachments>
    title?: string
}


const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

let draggedItem: any = null;
export default function FileUpload(props: IProps) {
    let { multiple, accept, maxFileSizeInBytes, title } = props
    let DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES;
    if (maxFileSizeInBytes) DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES


    const fileInputField = useRef<any>(null);
    const [files, setFiles] = useState(props.files);
    const [isShowModal, setIsShowModal] = useState(false);
    const [idSelect, setIdSelect] = useState(0);
    const [index, setIndex] = useState(null);


    useEffect(() => {
        draggedItem = null
    }, [])

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= DEFAULT_MAX_FILE) {
                if (!multiple) {
                    return [file];
                }
                let newFile: Attachments = {
                    path: file,
                    fileName: file.name,
                    size: file.size,
                    extension: file.extension,
                    type: file.type
                }
                files.push(newFile);
            }
        }
        return [...files];
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        props.onchangeFiles(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    function handleCheckDelete(id, index) {
        if (id) {
            setIsShowModal(true)
            setIdSelect(id)
        } else {
            removeFile(index)
        }
    }

    const removeFile = (index) => {
        if (index > -1) {
            fileInputField.current.value = null;
            let cloneFile = [...files]
            cloneFile.splice(index, 1);
            setFiles([...cloneFile]);
            callUpdateFilesCb([...cloneFile]);
        }
    };

    function onDragStart(e, index) {
        draggedItem = files[index];//lấy item đang kéo
        e.dataTransfer.effectAllowed = "move";//hiệu ứng di chuyển
        e.dataTransfer.setData("text/html", e.target.parentNode);//để firefox có thể chạy đc
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);//để chrome có thể chạy đc
    };

    function onDragOver(index) {//set lại vị trí element

        const draggedOverItem = files[index];

        if (draggedItem === draggedOverItem) {
            return;
        }

        let items = files.filter(item => item !== draggedItem);

        items.splice(index, 0, draggedItem);

        setFiles([...items])
    };

    function onDragEnd() {//kết thúc kéo
        draggedItem = null;
        props.onchangeFiles(files, true);
    };

    return (
        <>
            <section className="file-upload-container">
                <AddPhotoAlternateIcon fontSize={'large'} />
                <span onClick={handleUploadBtnClick}>{title ? title : 'Thêm ảnh'}</span>
                <input type="file" ref={fileInputField}
                    onChange={handleNewFileUpload}
                    multiple className="formField"
                    accept={accept ? accept : "all"}
                />
            </section>

            <div className="previewList">
                {files?.map((file, index) => {
                    //let isImageFile = file?.type?.split("/")[0] === "image";
                    return (
                        <div className="previewContainer" key={index} onDragOver={() => onDragOver(index)}>
                            <div className="drag"
                                draggable
                                onDragStart={e => onDragStart(e, index)}
                                onDragEnd={onDragEnd}>
                                {!file.id ? (
                                    <img className="image-preview" src={URL.createObjectURL(file.path)} alt={`file preview ${index}`} />
                                ) :
                                    <img className="image-preview" src={file.path} alt={`file preview ${index}`} />
                                }
                                <div className="file-meta-data cursor-move">
                                    <aside>
                                        <div className="removeFileIcon cursor">
                                            <div
                                                onClick={() => handleCheckDelete(file.id, index)}>
                                                {IconTrash()}
                                            </div>
                                        </div>

                                    </aside>
                                </div>
                            </div>


                        </div>
                    );
                })}
            </div>
            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => { setIdSelect(0); setIsShowModal(false) }}
                handleConfirm={() => { setIsShowModal(false); removeFile(index); props.handleDelete && props.handleDelete(idSelect); setIdSelect(0); }}
                note={"Bạn có chắc chắn muốn xóa hình ảnh này? Hành động sẽ không được phục hồi"}
            />
        </>
    );
};
