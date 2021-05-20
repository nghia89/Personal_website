### webpack là phần lõi của webpack
### webpack-cli giúp ta gõ được lệnh của webpack trên terminal (gián tiếp thông qua file package.json)
### webpack-dev-server hỗ trợ tạo một server localhost cho môi trường dev
### style-loader, css-loader giúp bạn có thể import được css vào file js
### sass, sass-loader giúp bạn biên dịch scss sang css
### file-loader giúp bạn import được các file ví dụ như ảnh, video vào file js
### typescript: Phần lõi của ngôn ngữ Typescript
### ts-loader: Giúp tích hợp Typescript vào webpack

### clean-webpack-plugin: Giúp dọn dẹp thư mục build trước khi build webpack
### compression-webpack-plugin: Giúp  nén các file css, js, html… thành gzip
### copy-webpack-plugin: Giúp  copy các file ở thư mục dev vào thư mục build
### dotenv-webpack: Giúp bạn  được các biến môi trường ở file .env và trong app của
### html-webpack-plugin: Giúp clone ra 1 file index.html từ file html ban đầu
### mini-css-extract-plugin: Bình thường thì css sẽ nằm trong file js sau khi build. Và khi chạy app thì js sẽ thêm các đoạn css đó vào thẻ <style></style>. Bây giờ mình không muốn như vậy, mình muốn css phải nằm ở file riêng biệt với js và khi chạy app thì js sẽ tự import bằng thẻ <link>. Đó là chức năng của plugin này
### webpack-bundle-analyzer: Giúp bạn phân tích bản build, coi thử thư viện nào đang chiếm bao nhiêu % bản build



### fix yarn install
    Step 1: open windows powerShell admin
    
    Step 2: Get-ExecutionPolicy
    Step 3: Set-ExecutionPolicy Unrestricted
    Step 4: Get-ExecutionPolicy