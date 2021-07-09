import { InputComponent, useNotification } from '@/components';
import { PATH } from '@/constants/paths';
import { IBreadcrumbs } from '@/models/commonM';
import React, { useState, useEffect, Fragment } from 'react'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';

interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function CollectionCreate(props: IProps) {

    const dispatch = useNotification();

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách nhóm sản phẩm', path: PATH.PRODUCT_COLLECTIONS }
        ]);

    }, [])

    async function saveData() {

    }

    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            <div>
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>
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
                            <select multiple className="form-control" >
                                <option value="Codeigniter">Codeigniter</option>
                                <option value="CakePHP">CakePHP</option>
                                <option value="Laravel">Laravel</option>
                                <option value="YII">YII</option>
                                <option value="Zend">Zend</option>
                                <option value="Symfony">Symfony</option>
                                <option value="Phalcon">Phalcon</option>
                                <option value="Slim">Slim</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    function renderRight() {
        return <div className="col-4">
            <div className="wrapper-content mb-5">
                <div className="ms-2 ">
                    <div className="row">
                        <div className=" col-12 col-md-6 pt-3">
                            <InputComponent
                                label="Giá bán"
                                name="price"
                                //onChange={(e) => handleOnchange(e)}
                                placeholder="0"
                                value={''}
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
