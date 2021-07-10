import { Editor, InputComponent, SearchProduct, useNotification } from '@/components';
import { PATH } from '@/constants/paths';
import { IBreadcrumbs } from '@/models/commonM';
import React, { useState, useEffect, Fragment } from 'react'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { ProductVM, ProductCollectionVM } from '@/models';
import { Switch } from '@material-ui/core';
import { replaceImgUrl } from '@/helpers/utils';
import { ImageSize } from '@/constants/utilConstant';
import { IConImage, IconTrash } from '@/helpers/svg';
import { ProductAndCollectionVM } from '@/models/productCollection';
import { useHistory } from 'react-router-dom';


interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

const initData: ProductCollectionVM = {
    description: '',
    images: '',
    productAndCollection: [],
    name: '',
    seoAlias: ''

}

function CollectionCreate(props: IProps) {

    const dispatch = useNotification();
    let history = useHistory();
    const [dataValue, setDataValue] = useState<ProductVM[]>([]);
    const [data, setData] = useState<ProductCollectionVM>(initData);

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách nhóm sản phẩm', path: PATH.PRODUCT_COLLECTIONS },
            { name: 'Tạo mới nhóm sản phẩm' }
        ]);

    }, [])

    async function saveData() {

    }

    function handleOnchange(name: string, data: any) {

        if (name)
            data[name] = data;
        setData({ ...data });
    }

    function handleAddDataValue(item) {
        let index = dataValue.findIndex(x => x.id == item.id)
        if (index > -1) {
            dataValue.splice(index, 1)
        }
        else dataValue.push(item)

        let newProAndCollection: ProductCollectionVM = { ...data };
        newProAndCollection.productAndCollection = []
        dataValue.forEach((item) => {
            newProAndCollection?.productAndCollection?.push({ productVM: item, productId: item.id });
        })
        setData({ ...newProAndCollection })
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
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
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
                        <div className="col-12 pt-3 mt-2">
                            {
                                data?.productAndCollection?.map((item, index) => {
                                    return <div key={`proCollItem${index}`} className="border-line-bottom d-flex align-items-center justify-content-between pt-3 pb-3">
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
                            {data?.productAndCollection && <span>Tổng sản phẩm: {data?.productAndCollection?.length}</span>}
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
                                //onChange={(e) => handleOnchange(e)}
                                placeholder="Ví dụ: nhóm sản phẩm A"
                                value={''}
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
                        <div className=" col-12 col-md-6 pt-3">
                            <label>Trạng thái </label>
                            <Switch
                                checked={true}
                                onChange={() => console.log()}
                                color="primary"
                            />
                        </div>
                        <div className=" col-12 col-md-6 pt-3">
                            <label>Ngày hiển thị</label>
                            <Switch
                                checked={true}
                                onChange={() => console.log()}
                                color="primary"
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

    return <div className="row">
        {renderHeader()}
        {renderContent()}
    </div>
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionCreate)
