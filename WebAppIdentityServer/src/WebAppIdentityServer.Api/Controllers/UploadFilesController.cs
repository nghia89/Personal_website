using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Infrastructure.CommonContains;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.Product;

namespace WebAppIdentityServer.Api.Controllers
{
    public class UploadFilesController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IOptions<AppSettingConfig> _config;
        private readonly IProductImageBusiness _productImage;
        private readonly ILogger<FunctionsController> _logger;
        public UploadFilesController(IWebHostEnvironment webHostEnvironment, IOptions<AppSettingConfig> config, IProductImageBusiness productImage,
         ILogger<FunctionsController> logger)
        {
            _webHostEnvironment = webHostEnvironment;
            _config = config;
            _productImage = productImage;
            _logger = logger;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("upload_image_ckeditor")]
        public async Task<IActionResult> UploadImageForCKEditor(IFormFile upload, string ckCsrfTToOkResulten)
        {
            DateTime now = DateTime.Now;
            if (upload == null)
            {
                return ToOkResult(new
                {
                    uploaded = false,
                    error = new
                    {
                        message = "không thể tải lên hình ảnh này."
                    }
                });
            }
            else if (upload.Length > (1024 * 1024 * 5))
            {
                return ToOkResult(new
                {
                    uploaded = false,
                    error = new
                    {
                        message = "Tệp này hơn 5MB. Xin lỗi, nó phải nhỏ hơn hoặc bằng 5MB."
                    }
                });
            }
            else
            {
                var getFilename = ContentDispositionHeaderValue
                                .Parse(upload.ContentDisposition)
                                .FileName
                                .Trim('"').ToLower();

                var filename = Regex.Replace(getFilename, @"\s+", "_");

                var imageFolder = $@"\uploaded\ckeditor\";

                string folder = _webHostEnvironment.WebRootPath + imageFolder;
                var pathCombine = Path.Combine(imageFolder, filename).Replace(@"\", @"/");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);

                }
                var linkFullFile = folder + @"\" + filename;
                if (System.IO.File.Exists(linkFullFile))
                {
                    var fileName = Path.Combine(imageFolder, filename).Replace(@"\", @"/");
                    //return ToOkResult($"{_config.Value.BaseUrl}{pathCombine}");
                    return Ok(new
                    {
                        uploaded = true,
                        url = $"{_config.Value.BaseUrl}{pathCombine}"
                    });
                }
                else
                {
                    //var path = new FileImageModel { Status = true, FileName = pathCombine };
                    string filePath = Path.Combine(folder, filename);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        await upload.CopyToAsync(fs);
                        await fs.FlushAsync();
                        // return ToOkResult($"{_config.Value.BaseUrl}{pathCombine}");
                        return Ok(new
                        {
                            uploaded = true,
                            url = $"{_config.Value.BaseUrl}{pathCombine}"
                        });
                    }
                }
            }

        }

        [HttpPost]
        [Route("upload_image")]
        public async Task<IActionResult> UploadImage()
        {
            var files = Request.Form.Files;
            DateTime now = DateTime.Now;
            if (files.Count == 0)
            {
                return new BadRequestObjectResult(files);
            }
            else
            {
                var listFile = new List<FileImageModel>();

                foreach (var item in files)
                {
                    var file = item;
                    var getFilename = ContentDispositionHeaderValue
                               .Parse(file.ContentDisposition)
                               .FileName
                               .Trim('"').ToLower();

                    var filename = Regex.Replace(getFilename, @"\s+", "_");

                    var imageFolder = $@"\uploaded\images\{now.ToString("yyyyMMdd")}";

                    string folder = _webHostEnvironment.WebRootPath + imageFolder;
                    var pathCombine = Path.Combine(imageFolder, filename).Replace(@"\", @"/");
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                    var linkFullFile = folder + @"\" + filename;
                    if (System.IO.File.Exists(linkFullFile))
                    {
                        listFile.Add(new FileImageModel { Path = $"{_config.Value.BaseUrl}{pathCombine}" });
                    }
                    else
                    {
                        string filePath = Path.Combine(folder, filename);

                        //string filePath = Path.Combine(folder, filename);
                        using (FileStream fs = System.IO.File.Create(filePath))
                        {
                            await file.CopyToAsync(fs);
                            await fs.FlushAsync();
                            var path = new FileImageModel { Path = $"{_config.Value.BaseUrl}{pathCombine}" };
                            listFile.Add(path);
                        }
                        await ResizingImageUpload(file, folder, filename);
                    }
                }
                return ToOkResult(listFile);
            }
        }


        [HttpPost]
        [Route("product/{id}/images")]
        public async Task<IActionResult> UploadProductImage(long id)
        {
            var files = Request.Form.Files;
            if (!files.Any())
            {
                return ToOkResult(true, "Vui lòng chọn ảnh.");
            }
            else
            {
                int index = 1;
                var productImg = new List<ProductImageVM>();
                foreach (var file in files)
                {
                    DateTime now = DateTime.Now;
                    var getFilename = ContentDispositionHeaderValue
                                        .Parse(file.ContentDisposition)
                                        .FileName
                                        .Trim('"').ToLower();

                    var filename = Regex.Replace(getFilename, @"\s+", "_");

                    var imageFolder = $@"uploaded\products\{id}";
                    var rootFile = _webHostEnvironment.WebRootPath + @"\";
                    string folder = $"{rootFile}{imageFolder}";
                    var pathCombine = Path.Combine(imageFolder, filename).Replace(@"\", @"/");
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }

                    string filePath = Path.Combine(folder, filename);
                    FileStream fs = null;
                    using (fs = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(fs);
                        await fs.FlushAsync();
                    }
                    await ResizingImageUpload(file, folder, filename);

                    productImg.Add(new ProductImageVM()
                    {
                        ProductId = id,
                        FileName = filename,
                        Path = $"{_config.Value.BaseUrl}{pathCombine}",
                        Size = (int)file.Length,
                        SortOrder = index,
                    });
                    index++;
                }

                await _productImage.Add(productImg, id);

                return ToOkResult();
            }
        }

        [Route("delete")]
        [HttpPost]
        public IActionResult Delete([FromBody] FileImageModel model)
        {
            if (!String.IsNullOrEmpty(model.Path))
            {
                var rootFile = _webHostEnvironment.WebRootPath + @"\";

                var pathFile = model.Path.Replace(_config.Value.BaseUrl, "");
                var newPath = Regex.Replace(pathFile, @"/", @"\");
                CheckFileDelete($"{rootFile}{newPath}");

                foreach (var item in CommonContains.ImageSize())
                {
                    var newFileName = Regex.Replace(pathFile, @"\.([^.]*)$", $"_{item.Key}.$1");
                    CheckFileDelete($"{rootFile}{newFileName}");
                }
            }
            return ToOkResult();
        }


        [NonAction]
        public void CheckFileDelete(string path)
        {
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }

        [NonAction]
        public async Task ResizingImageUpload(IFormFile file, string folder, string filename)
        {

            var imageSizes = CommonContains.ImageSize();

            foreach (var imgSize in imageSizes)
            {
                _logger.LogTrace($"... Resizing to {imgSize.Key}");

                var newFileName = Regex.Replace(filename, @"\.([^.]*)$", $"_{imgSize.Key}.$1");
                string filePath = Path.Combine(folder, newFileName);

                using (var image = await Image.LoadAsync(file.OpenReadStream()))
                {
                    using (var outStream = new MemoryStream())
                    {
                        image.Mutate(x => x.Resize(new ResizeOptions
                        {
                            Mode = ResizeMode.Max,
                            Position = AnchorPositionMode.Center,
                            Size = ResizingImage(image, imgSize.Width, imgSize.Height)
                        }));
                        await image.SaveAsync(filePath);
                    }
                }
                _logger.LogTrace($"... Resized and saved file {imgSize.Key}");
            }
            return;
        }

        [NonAction]
        public Size ResizingImage(Image image, int maxWidth, int maxHeight)
        {
            if (image.Width > maxWidth || image.Height > maxHeight)
            {
                double widthRadio = (double)image.Width / (double)maxWidth;
                double heightRadio = (double)image.Height / (double)maxHeight;
                double radio = Math.Max(widthRadio, heightRadio);

                int newWidth = (int)(image.Width / radio);
                int newHeight = (int)(image.Height / radio);
                return new Size { Height = newHeight, Width = newWidth };
            }
            else
            {
                return new Size { Height = image.Height, Width = image.Width };
            }
        }

    }





    public class FileImageModel
    {
        public string Path { get; set; }
    }

}