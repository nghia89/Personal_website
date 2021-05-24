import { AlertDialogSlide, TableCenter, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { tableHeadProduct, tableHeadUser } from '@/models/tableHead';
import { CircularProgress, TextField, Select, MenuItem } from '@material-ui/core';
import { tableHeadCategory } from '@/models/tableHead';
import React, { useEffect, useState } from 'react';

import './index.scss'
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { IBaseParams, CategoryVM } from '@/models';
import { apiProductCategory } from '@/apis';

interface IProps {

}

export default function ProductCategory(props: IProps) {
    const dispatch = useNotification();
    const [data, setData] = useState<CategoryVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })


    useEffect(() => {
        getData('');
    }, [])

    async function getData(textSearch?: string) {
        if (!isLoading) setLoading(true)
        let newParam = { ...params };
        newParam.query = textSearch
        let serial = SerializeParam(params);
        await apiProductCategory.getPaging(serial).then((rsp) => {
            if (!rsp.error) {
                setLoading(false)
                setData(rsp)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        }).catch(() => { setLoading(false); dispatch('ERROR', 'Có lỗi xảy ra.') })
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            let { value } = e.target;
        }
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">Danh sách danh mục</h1>
            <div className="d-flex col-6">
                <input onKeyDown={(e) => handleKeyDown(e)} type="text" name="searchText" className="text-dark form-control border-0 small " placeholder="Nhập tìm kiếm bằng Email, Tên, Sđt. Enter để tìm kiếm... " aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
            {checkPermission(functionId.category, commandId.create) && <button onClick={() => console.log("create")} type="button" className="mr-3 btn btn-success">Tạo mới</button>}
        </div>
    }


    function renderContent() {
        return <TableCenter
            funcId={functionId.user}
            data={data}
            header={tableHeadCategory}
            fetchData={(value) => getData(value)}
            pageSize={params.pageSize}
            page={params.page}
            total={params.totalCount}
            isLoading={isLoading}
            handleDelete={(id) => console.log()}
            handleEdit={(id) => console.log()}
        />
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
