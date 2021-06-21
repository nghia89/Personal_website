import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import { RoleVM, IBaseTable, IBaseParams } from '@/models/index';
import { apiRoles } from '@/apis/index';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { tableHeadRole } from '@/models/tableHead'
import { TableCenter, AlertDialogSlide, useNotification } from '@/components/index'
import RoleDetail from './component/detail/index'
import RoleCreate from './component/create/index'
import { commandId, functionId } from '@/constants/utilConstant'
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}


function Role(props: IProps) {
    const dispatch = useNotification();

    const [isLoading, setLoading] = useState(true);
    const [stateTable, seStateTable] = useState<IBaseTable>({ page: 1, pageSize: 10, totalCount: 0, data: [] as Array<RoleVM> });
    const [isShowModal, setModal] = useState(false);
    const [idSelect, setIdSelect] = useState('');
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [isOpenCreate, setOpenCreate] = useState(false);


    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách quyền' }
        ]);

        let param = getParams();
        getData(param)
    }, [])

    function getParams() {
        let cvParam: IBaseParams = { page: stateTable.page, pageSize: stateTable.pageSize };
        return cvParam
    }

    async function handleDelete(id) {
        await apiRoles.delete(id).then(async (rsp) => {
            if (!rsp.isError) {
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
    function handleCloseTableCenter(id) {
        setIdSelect(id)
        setModal(true)
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
        return <div className="pb-5 d-flex justify-content-end align-items-center">

            <button hidden={!checkPermission(functionId.role, commandId.create)} onClick={() => setOpenCreate(true)} type="button" className="mx-3 btn btn-success">Tạo mới</button>
        </div>
    }


    function renderContent() {
        return <TableCenter
            funcId={functionId.role}
            data={stateTable.data}
            header={tableHeadRole}
            fetchData={(value) => getData(value)}
            pageSize={stateTable.pageSize}
            page={stateTable.page}
            total={stateTable.totalCount}
            isLoading={isLoading}
            handleDelete={(id) => handleCloseTableCenter(id)}
            handleEdit={(id) => handleCloseTableEdit(id)}
        />
    }

    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {renderContent()}

            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => handleCloseSlide()}
                handleConfirm={() => handleDelete(idSelect)}
                note={"Bạn có chắc chắn muốn xoá User này?"}
            />
            {isOpenDrawer && <RoleDetail
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => setOpenDrawer(false)}

            />}
            {isOpenCreate && <RoleCreate
                isOpen={isOpenCreate}
                handleClose={() => setOpenCreate(false)}
                handleReload={async () => await getData(getParams())}
            />}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)

