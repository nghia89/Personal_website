import React, { useRef, useState } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconTrash } from '@/helpers/svg'
import './index.css'
import { Attachments } from "@/models/commonM";


const KILO_BYTES_PER_BYTE = 1024;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = (1024 * 1024 * 5);
interface IProps {
    multiple: boolean
    onchangeFiles: Function
    accept?: string
    maxFileSizeInBytes?: number
    files: Array<Attachments>
    title?: string
}


const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

export default function FileUpload(props: IProps) {
    let { multiple, accept, maxFileSizeInBytes, title } = props
    let DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES;
    if (maxFileSizeInBytes) DEFAULT_MAX_FILE = DEFAULT_MAX_FILE_SIZE_IN_BYTES

    const fileInputField = useRef<any>(null);
    const [files, setFiles] = useState(props.files);

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

    const removeFile = (index) => {
        fileInputField.current.value = null;
        let cloneFile = [...files]
        cloneFile.splice(index, 1);
        setFiles([...cloneFile]);
        callUpdateFilesCb([...cloneFile]);
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
                        <div className="previewContainer" key={index}>

                            {file.path ? (
                                <img className="image-preview" src={URL.createObjectURL(file.path)} alt={`file preview ${index}`} />
                            ) :
                                <img className="image-preview" src={file.path} alt={`file preview ${index}`} />
                            }
                            <div className="file-meta-data">
                                <aside>
                                    <div className="removeFileIcon">
                                        <div
                                            onClick={() => removeFile(index)}>
                                            {IconTrash()}
                                        </div>
                                    </div>

                                </aside>
                            </div>

                        </div>
                    );
                })}
            </div>
        </>
    );
};
