import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import { OrgVM, IBaseTable } from '@/models/index';
import { apiOrg, apiRoles } from '@/apis/index';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { tableHeadOrg } from '@/models/tableHead'
import { TableCenter, AlertDialogSlide, useNotification } from '@/components/index'
import { IParams } from '@/components/tableCenter';
import OrgDetail from './component/detail/index'
import OrgCreate from './component/create/index'
import { commandId, functionId } from '@/constants/utilConstant'
export interface IProps {

}


export default function Org(props: IProps) {
    const dispatch = useNotification();

    const [isLoading, setLoading] = useState(true);
    const [stateTable, seStateTable] = useState<IBaseTable>({ page: 1, pageSize: 10, totalCount: 0, data: [] as Array<OrgVM> });
    const [isShowModal, setModal] = useState(false);
    const [idSelect, setIdSelect] = useState('');
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [isOpenCreate, setOpenCreate] = useState(false);


    useEffect(() => {
        let param = getParams();
        getData(param)
    }, [])

    function getParams() {
        let cvParam: IParams = { page: stateTable.page, pageSize: stateTable.pageSize };
        return cvParam
    }

    async function handleDelete(id) {
        await apiRoles.delete(id).then(async (rsp) => {
            if (rsp) {
                dispatch('SUCCESS', 'Xoá thành công.')
                setModal(false)
                let param = getParams();
                await getData(param)
            } else { setLoading(false); setModal(false) }
        })
    }
    function handleCloseSlide() {
        setIdSelect('');
        setModal(false)
    }

    function handleCloseTableEdit(id) {
        setIdSelect(id);
        setOpenDrawer(true)
    }
    async function getData(param: IParams) {
        if (!isLoading) setLoading(true)
        stateTable.page = param.page;
        stateTable.pageSize = param.pageSize;

        let newParam = SerializeParam({ query: '', page: param.page, pageSize: param.pageSize });
        await apiOrg.getPaging(newParam).then((rsp) => {
            if (!rsp.error) {
                stateTable.data = rsp.data
                stateTable.totalCount = rsp.total
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
            <h1 className="h3 mb-1 text-gray-800">Danh tổ chức</h1>

            <button hidden={!checkPermission(functionId.org, commandId.create)} onClick={() => setOpenCreate(true)} type="button" className="mr-3 btn btn-success">Tạo mới</button>
        </div>
    }


    function renderContent() {
        return <TableCenter
            funcId={functionId.org}
            data={stateTable.data}
            header={tableHeadOrg}
            fetchData={(value) => getData(value)}
            pageSize={stateTable.pageSize}
            page={stateTable.page}
            total={stateTable.totalCount}
            isLoading={isLoading}
            isHiddenDelete={true}
            handleDelete={(id) => { }}
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

            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => handleCloseSlide()}
                handleConfirm={() => handleDelete(idSelect)}
                note={"Bạn có chắc chắn muốn xoá User này?"}
            />
            {isOpenDrawer && <OrgDetail
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => setOpenDrawer(false)}

            />}
            {isOpenCreate && <OrgCreate
                isOpen={isOpenCreate}
                handleClose={() => setOpenCreate(false)}
                handleReload={async () => await getData(getParams())}
            />}
        </div>
    )
}