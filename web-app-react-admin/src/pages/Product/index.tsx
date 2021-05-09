import React, { useState, useEffect } from 'react'
import { apiProduct } from '@/apis/index'
import { connect } from 'react-redux'
import { IBaseParams, ProductVM } from '@/models';
import { SerializeParam } from '@/helpers/utils';
import { DivTable, useNotification } from '@/components';
import { CircularProgress } from '@material-ui/core';
import { functionId } from '@/constants/utilConstant';
import { tableHeadProduct } from '@/models/tableHead';

interface IProps { }



export function Product(props: IProps) {
    const dispatch = useNotification();

    const [data, setData] = useState<ProductVM[]>([]);
    const [isLoading, setLoading] = useState<Boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    useEffect(() => {
        fetchApi();
    }, [])

    async function fetchApi() {
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

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">Danh sách sản phẩm</h1>
        </div>
    }

    function renderContent() {
        // return <DivTable
        //     funcId={functionId.permission}
        //     data={data}
        //     header={tableHeadRoleToFunc}
        //     fetchData={(value) => getData(value)}
        //     pageSize={stateTable.pageSize}
        //     page={stateTable.page}
        //     total={stateTable.totalCount}
        //     isLoading={isLoading}
        //     handleEdit={(id) => handleCloseTableEdit(id)}
        // />
    }


    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {isLoading ? <div className="d-flex justify-content-center">
                <CircularProgress />
            </div> :
                renderContent()}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
