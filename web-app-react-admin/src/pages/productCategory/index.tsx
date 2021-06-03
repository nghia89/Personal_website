import { SearchComponent, TableCenter, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { CircularProgress } from '@material-ui/core';
import { tableHeadCategory } from '@/models/tableHead';
import React, { useEffect, useState } from 'react';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { IBaseParams, CategoryVM } from '@/models';
import { apiProductCategory } from '@/apis';
import ProductCateCreate from './component/create';
import './index.css'
interface IProps {

}

export default function ProductCategory(props: IProps) {
    const dispatch = useNotification();
    const [data, setData] = useState<CategoryVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    const [isOpenCreate, setOpenCreate] = useState<boolean>(false)

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        if (!isLoading) setLoading(true)
        let serial = SerializeParam(params);
        await apiProductCategory.getPaging(serial).then((rsp) => {
            if (!rsp.error) {
                setLoading(false)
                setData(rsp.data)
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
                <SearchComponent
                    placeholder="Nhập tên. Enter để tìm kiếm... "
                    handleKeyDown={handleKeyDown}
                />
            </div>
            {checkPermission(functionId.category, commandId.create) && <button onClick={() => setOpenCreate(true)} type="button" className="mx-3 btn btn-success">Tạo mới</button>}
        </div>
    }


    function renderContent() {
        return <TableCenter
            funcId={functionId.category}
            data={data}
            header={tableHeadCategory}
            fetchData={() => getData()}
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

            {isOpenCreate && <ProductCateCreate
                isOpen={isOpenCreate}
                handleClose={() => setOpenCreate(false)}
                handleReload={async () => await getData()}
            />}
        </div>
    )
}
