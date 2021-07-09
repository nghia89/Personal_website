import React, { useState, useEffect } from 'react'
import { RoleVM, IBaseTable, IBaseParams } from '@/models/index';
import { apiRoles } from '@/apis/index';
import { SerializeParam } from '@/helpers/utils';
import { tableHeadRoleToFunc } from '@/models/tableHead'
import { DivTable } from '@/components/index'
import PermissionDetail from './component/detail/index'
import { functionId } from '@/constants/utilConstant'
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function PermissionFunction(props: IProps) {
    const [isLoading, setLoading] = useState(true);
    const [stateTable, seStateTable] = useState<IBaseTable>({ page: 1, pageSize: 10, totalCount: 0, data: [] as Array<RoleVM> });
    const [idSelect, setIdSelect] = useState('');
    const [isOpenDrawer, setOpenDrawer] = useState(false);


    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách phân quyền' }
        ]);
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
            isHiddenPagination
            handleEdit={(id) => handleCloseTableEdit(id)}
        />
    }

    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderContent()}

            {isOpenDrawer && <PermissionDetail
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => setOpenDrawer(false)}

            />}
        </div>
    )
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionFunction)

