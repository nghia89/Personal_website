
export default function UploadAdapter(loader) {
    console.log('loader', loader);


    loader.file.then(file => new Promise((resolve, reject) => {
        console.log("resolve, reject", resolve, reject);
        // _initRequest();
        // _initListeners(resolve, reject, file);
        // _sendRequest(file);
    }));

    // // Starts the upload process.
    // function upload() {
    //     // Update the loader's progress.
    //     return loader.file
    //         .then(file => new Promise((resolve, reject) => {
    //             _initRequest();
    //             _initListeners(resolve, reject, file);
    //             _sendRequest(file);
    //         }));
    // }

    // // Aborts the upload process.
    // function abort() {
    //     // Reject the promise returned from the upload() method.
    //     //  server.abortUpload();
    //     if (xhr) {
    //         xhr.abort();
    //     }
    // }


    // function  _initRequest() {
    //     const xhr =  new XMLHttpRequest();

    //     // Note that your request may look different. It is up to you and your editor
    //     // integration to choose the right communication channel. This example uses
    //     // a POST request with JSON as a data structure but your configuration
    //     // could be different.
    //     xhr.open('POST', 'http://example.com/image/upload/path', true);
    //     xhr.responseType = 'json';



    // }


    // function  _initListeners(resolve, reject, file) {
    //     const xhr = xhr;
    //     const loader = loader;
    //     const genericErrorText = `Couldn't upload file: ${file.name}.`;

    //     xhr.addEventListener('error', () => reject(genericErrorText));
    //     xhr.addEventListener('abort', () => reject());
    //     xhr.addEventListener('load', () => {
    //         const response = xhr.response;

    //         // This example assumes the XHR server's "response" object will come with
    //         // an "error" which has its own "message" that can be passed to reject()
    //         // in the upload promise.
    //         //
    //         // Your integration may handle upload errors in a different way so make sure
    //         // it is done properly. The reject() function must be called when the upload fails.
    //         if (!response || response.error) {
    //             return reject(response && response.error ? response.error.message : genericErrorText);
    //         }

    //         // If the upload is successful, resolve the upload promise with an object containing
    //         // at least the "default" URL, pointing to the image on the server.
    //         // This URL will be used to display the image in the content. Learn more in the
    //         // UploadAdapter#upload documentation.
    //         resolve({
    //             default: response.url
    //         });
    //     });


    //     if (xhr.upload) {
    //         xhr.upload.addEventListener('progress', evt => {
    //             if (evt.lengthComputable) {
    //                 loader.uploadTotal = evt.total;
    //                 loader.uploaded = evt.loaded;
    //             }
    //         });
    //     }
    // }


    // function _sendRequest(file) {
    //     // Prepare the form data.
    //     const data = new FormData();

    //     data.append('upload', file);

    //     // Important note: This is the right place to implement security mechanisms
    //     // like authentication and CSRF protection. For instance, you can use
    //     // XMLHttpRequest.setRequestHeader() to set the request headers containing
    //     // the CSRF token generated earlier by your application.

    //     // Send the request.
    //     xhr.send(data);
    // }
}
