import React, { useRef, useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconTrash } from '@/helpers/svg'
import './index.css'
import { Attachments } from "@/models/commonM";
import AlertDialogSlide from "../dialog/AlertDialogSlide";
import { ImageSize } from "@/constants/utilConstant";
import { replaceImgUrl } from "@/helpers/utils";
import { apiUploadFile } from "@/apis";
import { CircularProgress, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


const KILO_BYTES_PER_BYTE = 1024;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = (1024 * 1024 * 5);
interface IProps {
    multiple?: boolean
    onchangeFiles: Function
    handleDelete?: Function
    accept?: string
    maxFileSizeInBytes?: number
    files: Array<Attachments>
    handleFileSelected?: Function
    title?: string
    isHiddenDelete?: boolean
    isHiddenDragAndDrop?: boolean
    isHiddenUploadFile?: boolean
    isPosting?: boolean
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        }
    }),
);


const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

let draggedItem: any = null;
export default function FileUpload(props: IProps) {
    const classes = useStyles();

    let { multiple, accept, maxFileSizeInBytes, title, isPosting } = props
    let DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES;
    if (maxFileSizeInBytes) DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES



    const fileInputField = useRef<any>(null);
    const [files, setFiles] = useState<Attachments[]>([]);
    const [fileSelected, setFileSelected] = useState<Attachments>();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [idSelect, setIdSelect] = useState(0);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        draggedItem = null
        setFiles(props.files)
    }, [props.files])

    useEffect(() => {
        if (fileSelected)
            props.handleFileSelected && props.handleFileSelected(fileSelected)
    }, [fileSelected])


    async function postFile(listFileNew) {
        setIsLoading(true);

        let listGuiId: any = [];
        const formData = new FormData();
        listFileNew.forEach((file) => {
            listGuiId.push(file.guiId);
            formData.append('File', file.path)
        })
        let rspImg = await apiUploadFile.UploadImage(formData);
        if (!rspImg.isError) {
            let listImg: any = []
            setIsLoading(false);
        }
    }


    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    function getRandomInt() {
        return Math.floor(Math.random() * 1000);
    }

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= DEFAULT_MAX_FILE) {
                let newFile: Attachments = {
                    path: file,
                    fileName: file.name,
                    size: file.size,
                    extension: file.extension,
                    type: file.type,
                    guiId: getRandomInt()
                }
                if (!multiple) {
                    return [newFile];
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

            if (isPosting) {
                postFile(updatedFiles)
            }
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
                let checkFile = file?.id === fileSelected?.id ? true : false;
                return (
                    <div className={`item-content ms-2 mx-2 mt-2 ${index === 0 ? 'first' : ''}`} key={index} onDragOver={() => onDragOver(index)}>
                        <div className={`previewContainer ${checkFile ? 'selecting' : ''}`}
                            draggable={!props.isHiddenDragAndDrop}
                            onDragStart={e => onDragStart(e, index)}
                            onDragEnd={onDragEnd}
                            onClick={() => props.handleFileSelected && setFileSelected(file)}
                        >
                            {!file.id ? (
                                <img className="image-preview" src={URL.createObjectURL(file.path)} alt={`file preview ${index}`} />
                            ) :
                                <img className="image-preview" src={replaceImgUrl(file.path, ImageSize.small)} alt={`file preview ${index}`} />
                            }
                            <div className={`file-meta-data ${(!props.isHiddenDelete && !props.isHiddenDragAndDrop) ? 'cursor-move' : 'cursor'}`}>
                                <aside>
                                    {!props.isHiddenDelete && <div className="removeFileIcon cursor">
                                        <div
                                            onClick={() => handleCheckDelete(file.id, index)}>
                                            {IconTrash()}
                                        </div>
                                    </div>
                                    }
                                </aside>
                            </div>
                        </div>
                    </div>

                );
            })}
            {!props.isHiddenUploadFile && <div className={`file-upload-container ms-2 mx-2 ${files[0] ? 'float-sm-start width-15' : ''}`}>
                {
                    isLoading ? <div>
                        <Fab
                            aria-label="save"
                            color="primary"
                        //className={buttonClassName}
                        //onClick={handleButtonClick}
                        >
                            {!isLoading ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div> :
                        <div className='text-align-center'>
                            <AddPhotoAlternateIcon color="disabled" fontSize={'large'} />
                            {title ? <p onClick={handleUploadBtnClick} style={{ color: '#8c8c8c', textAlign: 'center' }}>{title}</p> :
                                <p onClick={handleUploadBtnClick} style={{ color: '#8c8c8c', textAlign: 'center' }}>Thêm ảnh sản <br /> phẩm</p>}
                            <input type="file" ref={fileInputField}
                                onChange={handleNewFileUpload}
                                multiple={multiple}
                                className="formField cursor"
                                accept={accept ? accept : "all"}
                            />
                        </div>
                }

            </div>}
            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => { setIdSelect(0); setIsShowModal(false) }}
                handleConfirm={() => { setIsShowModal(false); removeFile(index); props.handleDelete && props.handleDelete(idSelect); setIdSelect(0); }}
                note={"Bạn có chắc chắn muốn xóa hình ảnh này? Hành động sẽ không được phục hồi"}
            />
        </div >
    );
};
