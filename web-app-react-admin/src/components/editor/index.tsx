import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadImageForCKEditor } from '@/apis/baseApi';
import './index.scss'
import { env } from '@/environments/config';
//import ImageResize from '@ckeditor/ckeditor5-image'

interface IProps {
    onChange: Function
}
export default function Editor(props: IProps) {

    // function MyCustomUploadAdapterPlugin(editor) {
    //     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    //         // Configure the URL to the upload script in your back-end here!
    //         return new UploadAdapter(loader);
    //     };
    // }

    // ClassicEditor
    //     .create(document.querySelector('#editor'), {
    //         extraPlugins: [MyCustomUploadAdapterPlugin],

    //         // ...  
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.onChange(data)
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
            config={
                {
                    // plugins: [ Essentials ],
                    ckfinder: {
                        //plugins: [ImageResize],
                        uploadUrl: UploadImageForCKEditor,
                        withCredentials: true,
                        headers: {
                            "Accept": 'application/json',
                            "Content-type": "application/json; charset=utf-8",
                            "Authorization": 'Bearer ' + getToken()
                        }
                    },
                    toolbar: {
                        items: [
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
                            'uploadImage', 'blockQuote', '|',
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