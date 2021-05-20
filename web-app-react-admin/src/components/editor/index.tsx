import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadImageForCKEditor } from '@/apis/baseApi';
import './index.scss'
import { env } from '@/environments/config';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

interface IProps {
    onChange: Function,
    data: string
}
export default function Editor(props: IProps) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={props.data}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.onChange(data)
            }}
            onBlur={(event, editor) => {
                //console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                //console.log('Focus.', editor);
            }}
            config={
                {
                    //plugins: [CKFinder],
                    ckfinder: {
                        //plugins: [ImageResize],
                        uploadUrl: UploadImageForCKEditor,
                        withCredentials: true,
                        headers: {
                            "Accept": 'application/json',
                            "Content-type": "application/json; charset=utf-8",
                            "Authorization": 'Bearer ' + getToken()
                        },
                        options: {
                            resourceType: 'Images'
                        }
                    },
                    toolbar: {
                        items: [
                            'mediaEmbed', '|', 'uploadImage',
                            'heading', '|',
                            'fontfamily', 'fontsize', '|',
                            'alignment', '|',
                            'fontColor', 'fontBackgroundColor', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                            'link', '|',
                            'outdent', 'indent', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'code', 'codeBlock', '|',
                            'insertTable', '|',
                            'blockQuote', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: true
                    },
                    image: {
                        resize: true,
                        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
                        styles: [
                            'full',
                            'alignLeft',
                            'alignRight',
                            'side',
                            'alignCenter',
                        ],

                    },
                }
            }

        />
    )
}

function getToken() {
    const oidcUser = sessionStorage.getItem(`oidc.user:${env.baseApiUrl}:${env.clientId}`);
    const userStorage = oidcUser ? JSON.parse(oidcUser) : null;

    return userStorage?.access_token;
}