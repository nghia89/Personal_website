import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core';
import { ColorVM, IBaseTable, IBaseParams } from '@/models/index';
import { apiColor } from '@/apis/index';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { tableHeadColor } from '@/models/tableHead'
import { DivTable } from '@/components/index'
import { commandId, functionId } from '@/constants/utilConstant'
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import ColorCreateAndEdit from './component/index'
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function Colors(props: IProps) {
    const [isLoading, setLoading] = useState(true);
    const [data, seData] = useState<ColorVM[]>([]);
    const [idSelect, setIdSelect] = useState(0);
    const [isOpenDrawer, setOpenDrawer] = useState(false);


    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách màu' }
        ]);
        getData()
    }, [])

    function handleCloseTableEdit(id) {
        setIdSelect(id);
        setOpenDrawer(true)
    }
    async function getData() {
        if (!isLoading) setLoading(true)

        await apiColor.getAll().then((rsp) => {
            if (!rsp.isError) {
                seData(rsp.data);
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
            data={data}
            header={tableHeadColor}
            pageSize={0}
            page={0}
            total={0}
            isLoading={isLoading}
            isHiddenPagination
            handleEdit={(id) => handleCloseTableEdit(id)}
            onchangeParam={() => console.log()}
        />
    }
    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-end align-items-center">
            <button hidden={!checkPermission(functionId.role, commandId.create)} onClick={() => setOpenDrawer(true)} type="button" className="mx-3 btn btn-success">Tạo mới</button>
        </div>
    }
    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {renderContent()}

            {isOpenDrawer && <ColorCreateAndEdit
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => { setOpenDrawer(false); setIdSelect(0) }}

            />}
        </div>
    )
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(Colors)

