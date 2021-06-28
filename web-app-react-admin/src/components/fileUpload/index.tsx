import React, { useRef, useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconTrash } from '@/helpers/svg'
import './index.css'
import { Attachments } from "@/models/commonM";
import AlertDialogSlide from "../dialog/AlertDialogSlide";
import { ImageSize } from "@/constants/utilConstant";
import { replaceImgUrl } from "@/helpers/utils";


const KILO_BYTES_PER_BYTE = 1024;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = (1024 * 1024 * 5);
interface IProps {
    multiple?: boolean
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
    const [files, setFiles] = useState<Attachments[]>([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [idSelect, setIdSelect] = useState(0);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        draggedItem = null
        setFiles(props.files)
    }, [props.files])


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
            setIndex(index)
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
        <div className={`preview-wrapper ${files[0] ? ' min-height-300 ' : ''}`} >
            {files?.map((file, index) => {
                //let isImageFile = file?.type?.split("/")[0] === "image";
                return (
                    <div className={`item-content ms-2 mx-2 mt-2 ${index == 0 ? 'first' : ''}`} key={index} onDragOver={() => onDragOver(index)}>
                        <div className="previewContainer"
                            draggable
                            onDragStart={e => onDragStart(e, index)}
                            onDragEnd={onDragEnd}>
                            {!file.id ? (
                                <img className="image-preview" src={URL.createObjectURL(file.path)} alt={`file preview ${index}`} />
                            ) :
                                <img className="image-preview" src={replaceImgUrl(file.path, ImageSize.small)} alt={`file preview ${index}`} />
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
            <div className={`file-upload-container ms-2 mx-2 ${files[0] ? 'float-sm-start' : ''}`}>
                <AddPhotoAlternateIcon fontSize={'large'} />
                <p onClick={handleUploadBtnClick}>{title ? title : 'Thêm ảnh sản phẩm'}</p>
                <input type="file" ref={fileInputField}
                    onChange={handleNewFileUpload}
                    multiple className="formField cursor"
                    accept={accept ? accept : "all"}
                />
            </div>
            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => { setIdSelect(0); setIsShowModal(false) }}
                handleConfirm={() => { setIsShowModal(false); removeFile(index); props.handleDelete && props.handleDelete(idSelect); setIdSelect(0); }}
                note={"Bạn có chắc chắn muốn xóa hình ảnh này? Hành động sẽ không được phục hồi"}
            />
        </div >
    );
};
