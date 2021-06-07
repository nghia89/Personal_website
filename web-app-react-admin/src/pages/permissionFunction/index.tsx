import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import { RoleVM, IBaseTable, IBaseParams } from '@/models/index';
import { apiRoles } from '@/apis/index';
import { SerializeParam } from '@/helpers/utils';
import { tableHeadRoleToFunc } from '@/models/tableHead'
import { DivTable } from '@/components/index'
import PermissionDetail from './component/detail/index'
import { functionId } from '@/constants/utilConstant'
export interface IProps {

}


export default function PermissionFunction(props: IProps) {
    const [isLoading, setLoading] = useState(true);
    const [stateTable, seStateTable] = useState<IBaseTable>({ page: 1, pageSize: 10, totalCount: 0, data: [] as Array<RoleVM> });
    const [idSelect, setIdSelect] = useState('');
    const [isOpenDrawer, setOpenDrawer] = useState(false);


    useEffect(() => {
        let param = getParams();
        getData(param)
    }, [])

    function getParams() {
        let cvParam: IBaseParams = { page: stateTable.page, pageSize: stateTable.pageSize };
        return cvParam
    }

    function handleCloseTableEdit(id) {
        setIdSelect(id);
        setOpenDrawer(true)
    }
    async function getData(param: IBaseParams) {
        if (!isLoading) setLoading(true)
        stateTable.page = param.page;
        stateTable.pageSize = param.pageSize;

        let newParam = SerializeParam({ query: '', page: param.page, pageSize: param.pageSize });
        await apiRoles.getUserPaging(newParam).then((rsp) => {
            if (!rsp.isError) {
                stateTable.data = rsp.data.data
                stateTable.totalCount = rsp.data.totalCount

                seStateTable(stateTable);
                setLoading(false)
            } else setLoading(false)
        }).catch(err => {
            console.log('err', err);

        });
        return;
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">Danh sách phân quyền</h1>
        </div>
    }


    function renderContent() {
        return <DivTable
            funcId={functionId.permission}
            data={stateTable.data}
            header={tableHeadRoleToFunc}
            onchangeParam={(value) => getData(value)}
            pageSize={stateTable.pageSize}
            page={stateTable.page}
            total={stateTable.totalCount}
            isLoading={isLoading}
            isPagination
            handleEdit={(id) => handleCloseTableEdit(id)}
        />
    }

    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {isLoading ? <div className="d-flex justify-content-center">
                <CircularProgress />
            </div> :
                renderContent()}

            {isOpenDrawer && <PermissionDetail
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => setOpenDrawer(false)}

            />}
        </div>
    )
}