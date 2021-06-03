import React, { useState, useEffect } from 'react'
import { apiProduct } from '@/apis/index'
import { connect } from 'react-redux'
import { IBaseParams, ProductVM } from '@/models';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { DivTable, SearchComponent, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { tableHeadProduct } from '@/models/tableHead';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import './index.scss'
import { IconSearch } from '@/helpers/svg';
import { Button } from '@material-ui/core';

interface IProps { }


let isFirst = false
export function Product(props: IProps) {
    let history = useHistory();
    const dispatch = useNotification();

    const [data, setData] = useState<ProductVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })

    useEffect(() => {
        isFirst = false
        getData();
    }, [])

    useEffect(() => {
        if (isFirst)
            getData();
        isFirst = true
    }, [params.page, params.pageSize, params.query])

    async function getData() {
        if (!isLoading) setLoading(true)
        let aeriaParam = SerializeParam(params);
        let newParam = { ...params };
        await apiProduct.getPaging(aeriaParam).then((rsp) => {
            if (!rsp.isError) {
                setLoading(false)
                setData(rsp.data)
                newParam.totalCount = rsp.total
                setParams(newParam)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        })
    }


    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            let { name, value } = e.target;
            let newParam = { ...params };
            newParam.query = value;
            setParams(newParam)
        }
    }

    function handleSearch(textSearch) {
        let newParam = { ...params };
        newParam.query = textSearch;
        setParams(newParam)
    }

    function handlechangeParam(e) {
        let newParam: IBaseParams = { ...params };
        newParam.page = e.page;
        newParam.pageSize = e.pageSize
        setParams(newParam)
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center ">
            <h1 className="h3 mb-1 text-gray-800">Danh sách sản phẩm</h1>
            <div className="d-flex col-4">
                <SearchComponent
                    handleSearch={handleSearch}
                    placeholder="Vui lòng nhập tên hoặc mã. tìm kiếm"
                    handleKeyDown={handleKeyDown}
                />
            </div>
            {
                checkPermission(functionId.product, commandId.create) && <button onClick={() => {
                    history.push(PATH.PRODUCT_CREATE)
                }} type="button" className="mx-3 btn btn-success">Tạo mới</button>
            }
        </div>
    }

    function renderContent() {
        return <DivTable
            funcId={functionId.product}
            data={data}
            header={tableHeadProduct}
            onchangeParam={(e) => handlechangeParam(e)}
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
