import React, { useState, useEffect } from 'react'
import { SlideShowVM } from '@/models/index';
import { apiSlideShow } from '@/apis/index';
import { checkPermission } from '@/helpers/utils';
import { tableHeadSlideShow } from '@/models/tableHead'
import { DivTable } from '@/components/index'
import { commandId, functionId } from '@/constants/utilConstant'
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import SlidesCreateAndEdit from './component/index'
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function SlideShow(props: IProps) {
    const [page, setPage] = useState<number>(1)
    const [isLoading, setLoading] = useState(true);
    const [data, seData] = useState<SlideShowVM[]>([]);
    const [idSelect, setIdSelect] = useState(0);
    const [isOpenDrawer, setOpenDrawer] = useState(false);


    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách slider' }
        ]);
        getData()
    }, [])

    function handleCloseTableEdit(id) {
        setIdSelect(id);
        setOpenDrawer(true)
    }
    async function getData() {
        if (!isLoading) setLoading(true)

        await apiSlideShow.getAll().then((rsp) => {
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
            funcId={functionId.sliderShow}
            data={data}
            header={tableHeadSlideShow}
            pageSize={0}
            page={page}
            total={0}
            isLoading={isLoading}
            isPagination
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

            {isOpenDrawer && <SlidesCreateAndEdit
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

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow)

