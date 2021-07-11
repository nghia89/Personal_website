import { DatePickers, Editor, FileUpload, InputComponent, SearchProduct, useNotification } from '@/components';
import { PATH } from '@/constants/paths';
import { Attachments, IBreadcrumbs } from '@/models/commonM';
import React, { useState, useEffect, Fragment } from 'react'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { ProductVM, ProductCollectionVM } from '@/models';
import { Switch, TextField } from '@material-ui/core';
import { formatDate, replaceImgUrl, validateField } from '@/helpers/utils';
import { ImageSize } from '@/constants/utilConstant';
import { IConImage, IconTrash } from '@/helpers/svg';
import { ProductAndCollectionVM } from '@/models/productCollection';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { apiUploadFile, apiProductCollection } from '@/apis';
import { env } from '@/environments/config';
import { validateProductCollectionVm } from '@/models/validateField';
import { Loading } from '@/components/loaders';


interface IProps {
    id: number
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

const initData: ProductCollectionVM = {
    description: '',
    images: '',
    productAndCollection: [],
    name: '',
    seoAlias: ''

}
let refs: any = {}
function CollectionCreate(props: IProps) {

    const dispatch = useNotification();
    let history = useHistory();
    const [dataValue, setDataValue] = useState<ProductVM[]>([]);
    const [data, setData] = useState<ProductCollectionVM>(initData);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productAndCollection, setProductAndCollection] = useState<ProductAndCollectionVM[]>([]);

    const [listImage, setListImage] = useState<Array<Attachments>>([])

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách nhóm sản phẩm', path: PATH.PRODUCT_COLLECTIONS },
            { name: 'Tạo mới nhóm sản phẩm' }
        ]);

        data.dateApply = moment().add(3, 'days').format("yyyy-MM-DDThh:mm");
        data.status = 1
        setData({ ...data })
        getData(props.id)
    }, [])

    async function saveData() {
        if (!validateFields()) {
            setIsLoading(true)
            let proAndColl: ProductAndCollectionVM[] = []
            productAndCollection?.forEach(element => {
                proAndColl.push({ productId: element.productId } as ProductAndCollectionVM)
            });
            debugger
            data.productAndCollection = proAndColl;
            if (data.id) {
                await apiProductCollection.update(data).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Cập nhật nhóm thành công.')
                        getData(data.id)
                    } else dispatch('ERROR', rsp.message)
                })
            } else {
                await apiProductCollection.create(data).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Thêm nhóm thành công.')
                        getData(data.id)
                    } else dispatch('ERROR', rsp.message)
                })
            }

        }
    }

    async function getData(id) {
        if (id) {
            let data = await apiProductCollection.getById(id);
            if (!data.isError) {
                setData(data.data)
                setProductAndCollection(data.data.productAndCollection)
                setIsLoading(false)
            }
        } else setIsLoading(false)
    }

    function validateFields() {
        let messError = validateField(validateProductCollectionVm, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError

    }

    function handleOnchangeValue(e) {
        let name = e.target.name;

        data[name] = e.target.value;
        setData({ ...data });
    }

    useEffect(() => {
        if (listImage.length > 0) {
            let listImg: any = []
            listImage.forEach((f) => {
                listImg.push(f.path)
            })
            data.images = listImg.toString()

        } else data.images = '';
        setData({ ...data })
    }, [listImage])

    function handleOnchangeCheck(e) {
        let name = e.target.name;

        data[name] = e.target.checked ? 1 : 0;
        setData({ ...data });
    }


    function handleOnchange(name: string, value: any) {
        if (name)
            data[name] = value;
        setData({ ...data });
    }

    function handleAddDataValue(item) {
        let index = dataValue.findIndex(x => x.id == item.id)
        if (index > -1) {
            dataValue.splice(index, 1)
        }
        else dataValue.push(item)

        dataValue.forEach((item) => {
            productAndCollection?.push({ productVM: item, productId: item.id });
        })
        setProductAndCollection([...productAndCollection])
        setDataValue([...dataValue])

    }

    function handleDelete(index) {
        dataValue.splice(index, 1)
        data.productAndCollection?.splice(index, 1)
        setData({ ...data })
        setDataValue([...dataValue])
    }

    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            <div>
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">{data.id ? 'Cập nhật' : 'Lưu'}</button>
            </div>
        </div>
    }

    function renderAddProduct() {
        return <div>
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Sản Phẩm</span>
                    </div>
                    <div className="row">
                        <div className=" col-12 col-md-6 pt-3 ">
                            <SearchProduct dataValue={dataValue} handleOnchange={(item) => handleAddDataValue(item)} />
                        </div>
                        <div className="col-12 pt-3 mt-2" style={{ minHeight: '100px', maxHeight: '300px', overflow: 'auto' }}>
                            {
                                productAndCollection?.map((item, index) => {
                                    return <div key={`proCollItem${index}`} className="pro-coll-item border-line-bottom d-flex align-items-center justify-content-between pt-3 pb-3">
                                        <div className='d-flex flex-box-content align-items-center'>
                                            <div className='hmt-image-thumbnail'>
                                                {item.productVM?.image ? <img src={replaceImgUrl(item.productVM?.image, ImageSize.compact)} /> : IConImage(30, '#8c8c8c')}
                                            </div>

                                            <div className=' ms-1 box-content-name'>
                                                <a className='cursor' target="_blank" href={`${PATH.PRODUCT_DETAIL}${item.productId}`} >{item.productVM?.name}</a>
                                            </div>
                                        </div>

                                        <div className="box-content-trash cursor" onClick={() => handleDelete(index)}>
                                            {IconTrash()}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="col-12 pt-3">
                            <span className="float-sm-end font-weight-bold">Tổng sản phẩm: {productAndCollection?.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }

    function renderSEO() {
        return <div>
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Seo từ khóa</span>
                    </div>
                    <div className="row">
                        <div className=" col-12 pt-3 ">
                            {<div>
                                <div className="ms-2 mb-3 mt-2">
                                    {
                                        !data?.title ? <div >
                                            Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục này trên công cụ tìm kiếm như Google
                                        </div> :
                                            <div>
                                                <p className="hms-seo--preview-title mb-1 mt-2">{data.title}</p>
                                                <p className="hms-seo--preview-meta mb-1">{data.seoDescription}</p>
                                                <p className="hms-seo--preview-url text-truncate mb-0">{env.clientBase}/{data.seoAlias}</p>
                                            </div>
                                    }
                                </div>
                                <TextField
                                    label="Tiêu đề"
                                    name="title"
                                    value={data?.title}
                                    variant="outlined"
                                    size="small"
                                    className="form-control mb-2"
                                    onChange={(e) => handleOnchangeValue(e)}
                                />
                                <TextField
                                    label="Từ khóa"
                                    name="seoKeywords"
                                    value={data?.seoKeywords}
                                    variant="outlined"
                                    size="small"
                                    className="form-control mb-2"
                                    onChange={(e) => handleOnchangeValue(e)}
                                />
                                <TextField
                                    label="Mô tả trang"
                                    name="seoDescription"
                                    value={data?.seoDescription}
                                    variant="outlined"
                                    size="small"
                                    className="form-control mb-2"
                                    onChange={(e) => handleOnchangeValue(e)}
                                />

                                <div className="next-input--stylized mb-2">
                                    <div className="next-input-add-on next-input__add-on--before">{env.clientBase}/</div>
                                    <input name="seoAlias" onChange={(e) => handleOnchangeValue(e)} type="text" className="next-input next-input--invisible" placeholder="Seo Đường dẫn" step="1" value={data?.seoAlias}></input>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }


    function renderLeft() {
        return <div className="col-8">
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Thông Tin Chung</span>
                    </div>
                    <div className="row">
                        <div className=" col-12 pb-3">
                            <InputComponent
                                label="Tên nhóm sản phẩm"
                                name="name"
                                inputRef={(r) => refs['name'] = r}
                                onChange={(e) => handleOnchangeValue(e)}
                                placeholder="Ví dụ: nhóm sản phẩm A"
                                value={data.name}
                            />
                        </div>
                        <div>
                            <label className="color-black mb-2">Mô tả </label>
                            <Editor data={data?.description} onChange={(data) => handleOnchange("description", data)} />

                        </div>
                    </div>

                </div>
            </div>
            {renderAddProduct()}
            {renderSEO()}
        </div>
    }
    function renderRight() {
        return <div className="col-4">
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Hiển Thị</span>
                    </div>
                    <div className="row">
                        <div className=" col-8 col-md-4 pt-3">
                            <label>Trạng thái </label>
                            <Switch
                                checked={data.status == 1 ? true : false}
                                name="status"
                                onChange={(e) => handleOnchangeCheck(e)}
                                color="primary"
                            />
                        </div>
                        <div className=" col-8 col-md-8 pt-3 mt-2">
                            <TextField
                                id="date"
                                label={"Ngày hiển thị"}
                                name={'dateApply'}
                                value={data.dateApply}
                                variant="outlined"
                                size="small"
                                type='datetime-local'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="form-control"
                                onChange={(e) => handleOnchangeValue(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Hình đại diện</span>
                    </div>
                    <div className="row">
                        <div className=" col-12 pt-3">
                            <FileUpload
                                files={listImage}
                                title="Thêm ảnh"
                                multiple
                                onchangeFiles={(files) => setListImage(files)}
                                isHiddenDragAndDrop
                                isPosting
                                accept=".jpg,.png,.jpeg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    function renderContent() {
        return <Fragment>
            {renderLeft()}
            {renderRight()}
        </Fragment >
    }

    return <Fragment>
        {
            isLoading ? <div className="justify-content-center d-flex mt-5 pt-5"><Loading /></div> :
                <div className="row">
                    {renderHeader()}
                    {renderContent()}
                    {renderHeader()}
                </div>
        }

    </Fragment >
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionCreate)
