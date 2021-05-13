import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from './uploadImage';
import { UploadImageForCKEditor } from '@/apis/baseApi';
import { env } from '@/environments/config';

export default function Editor() {

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new UploadAdapter(loader);
        };
    }

    ClassicEditor
        .create(document.querySelector('#editor'), {
            extraPlugins: [MyCustomUploadAdapterPlugin],

            // ...  
        })
        .catch(error => {
            console.log(error);
        });
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
                console.log({ event, editor, data });
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
                        // The URL that the images are uploaded to.
                        uploadUrl: UploadImageForCKEditor,
                        // Enable the XMLHttpRequest.withCredentials property.
                        withCredentials: true,

                        // Headers sent along with the XMLHttpRequest to the upload server.
                        headers: {
                            "Accept": 'application/json',
                            "Content-type": "application/json; charset=utf-8",
                            "Authorization": 'Bearer ' + getToken()
                        }
                    }
                }
            }

        />
    )
}

function getToken() {
    const oidcUser = sessionStorage.getItem(`oidc.user:${env.baseApiUrl}:${env.clientId}`);
    const userStorage = oidcUser ? JSON.parse(oidcUser) : null;
    console.log('userStorage', userStorage);

    return userStorage?.access_token;
}