import React, { useState, useEffect } from 'react'
import { apiProduct } from '@/apis/index'
import { connect } from 'react-redux'
import { IBaseParams, ProductVM } from '@/models';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { DivTable, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { tableHeadProduct } from '@/models/tableHead';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import './index.scss'

interface IProps { }



export function Product(props: IProps) {
    let history = useHistory();
    const dispatch = useNotification();

    const [data, setData] = useState<ProductVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        if (!isLoading) setLoading(true)
        let newParam = SerializeParam(params);
        await apiProduct.getPaging(newParam).then((rsp) => {
            if (!rsp.error) {
                setLoading(false)
                setData(rsp)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        })
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            let { name, value } = e.target;
            // let param = getParams();
            // param.query = value;
            // await getData(param)
            // setSearchText(value)
        }
    }

    function handleCreate() {

    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">Danh sách sản phẩm</h1>

            <div className="d-flex col-4">
                <input onKeyDown={(e) => handleKeyDown(e)} type="text" name="searchText" className="text-dark form-control border-0 small " placeholder="Nhập tìm kiếm bằng Tên, Mã. Enter để tìm kiếm... " aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
            {
                checkPermission(functionId.product, commandId.create) && <button onClick={() => {
                    history.push(PATH.PRODUCT_CREATE)
                }} type="button" className="mr-3 btn btn-success">Tạo mới</button>
            }
        </div>
    }

    function renderContent() {
        return <DivTable
            funcId={functionId.permission}
            data={data}
            header={tableHeadProduct}
            onchangeParam={(e) => getData()}
            pageSize={params.pageSize}
            page={params.page}
            total={params.totalCount}
            isLoading={isLoading}
        //handleEdit={(id) => handleCloseTableEdit(id)}
        />
    }


    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {renderContent()}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
