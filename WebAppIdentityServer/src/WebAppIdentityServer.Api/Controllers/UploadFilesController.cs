using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebAppIdentityServer.Api.Authorization;
using WebAppIdentityServer.Api.Helpers;
using WebAppIdentityServer.Business.Interfaces;
using WebAppIdentityServer.Utilities.Constants;
using WebAppIdentityServer.ViewModel;
using WebAppIdentityServer.ViewModel.Common;
using WebAppIdentityServer.ViewModel.Models.Common;
using WebAppIdentityServer.ViewModel.Models.System;

namespace WebAppIdentityServer.Api.Controllers
{
    public class UploadFilesController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IOptions<AppSettingConfig> _config;
        public UploadFilesController(IWebHostEnvironment webHostEnvironment, IOptions<AppSettingConfig> config)
        {
            _webHostEnvironment = webHostEnvironment;
            _config = config;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("upload_image_ckeditor")]
        public async Task<IActionResult> UploadImageForCKEditor(IFormFile upload, string ckCsrfToken)
        {
            DateTime now = DateTime.Now;
            if (upload == null)
            {
                return new BadRequestObjectResult(upload);
            }
            else
            {
                var getFilename = ContentDispositionHeaderValue
                                .Parse(upload.ContentDisposition)
                                .FileName
                                .Trim('"').ToLower();

                var filename = Regex.Replace(getFilename, @"\s+", "_");

                var imageFolder = $@"\uploaded\ckeditor\{now.ToString("yyyyMMdd")}";

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
                    return Ok($"{_config.Value.BaseUrl}{pathCombine}");
                }
                else
                {
                    //var path = new FileImageModel { Status = true, FileName = pathCombine };
                    string filePath = Path.Combine(folder, filename);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        await upload.CopyToAsync(fs);
                        await fs.FlushAsync();
                        return Ok($"{_config.Value.BaseUrl}{pathCombine}");
                    }
                }
            }
        }
        [HttpPost]
        [Route("upload_image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            DateTime now = DateTime.Now;
            if (file == null)
            {
                return new BadRequestObjectResult(file);
            }
            else
            {
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
                    return Ok($"{_config.Value.BaseUrl}{pathCombine}");
                }
                else
                {
                    string filePath = Path.Combine(folder, filename);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(fs);
                        await fs.FlushAsync();
                        return Ok($"{_config.Value.BaseUrl}{pathCombine}");
                    }
                }
            }
        }
        [HttpPost]
        [Route("upload_image_mutiline")]
        public async Task<IActionResult> UploadImage([FromForm] IList<IFormFile> files)
        {
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
                        var status = true;
                        listFile.Add(new FileImageModel { Status = status, FileName = $"{_config.Value.BaseUrl}{pathCombine}" });
                    }
                    else
                    {
                        string filePath = Path.Combine(folder, filename);

                        //string filePath = Path.Combine(folder, filename);
                        using (FileStream fs = System.IO.File.Create(filePath))
                        {
                            await file.CopyToAsync(fs);
                            await fs.FlushAsync();
                            var path = new FileImageModel { Status = true, FileName = $"{_config.Value.BaseUrl}{pathCombine}" };
                            listFile.Add(path);
                        }
                    }
                }
                return Ok(listFile);
            }
        }
    }

    public class FileImageModel
    {
        public bool Status { get; set; }
        public string FileName { get; set; }
    }
}