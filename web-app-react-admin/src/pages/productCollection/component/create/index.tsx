import { InputComponent, SearchProduct, useNotification } from '@/components';
import { PATH } from '@/constants/paths';
import { IBreadcrumbs } from '@/models/commonM';
import React, { useState, useEffect, Fragment } from 'react'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { ProductVM } from '@/models';
import { Switch } from '@material-ui/core';


interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function CollectionCreate(props: IProps) {

    const dispatch = useNotification();
    const [dataValue, setDataValue] = useState<ProductVM[]>([]);

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách nhóm sản phẩm', path: PATH.PRODUCT_COLLECTIONS }
        ]);

    }, [])

    async function saveData() {

    }

    function handleAddDataValue(item) {
        let index = dataValue.findIndex(x => x.id == item.id)
        if (index > -1) {
            dataValue.splice(index, 1)
        }
        else dataValue.push(item)
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
                        <div className=" col-12 col-md-6 pt-3">
                            <SearchProduct dataValue={dataValue} handleOnchange={(item) => handleAddDataValue(item)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }


    function renderLeft() {
        return <div className="col-8">
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className=" mb-2  border-line-bottom">
                        <span className="ui-information-title   mb-2 ">Thông Tin Chung</span>
                    </div>
                    <div className="row">
                        <div className=" col-12 col-md-6 pt-3">
                            <InputComponent
                                label="Tên nhóm sản phẩm"
                                name="name"
                                //onChange={(e) => handleOnchange(e)}
                                placeholder="Ví dụ: nhóm sản phẩm A"
                                value={''}
                            />
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
