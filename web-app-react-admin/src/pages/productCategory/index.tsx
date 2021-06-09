import { AlertDialogSlide, SearchComponent, TableCenter, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { CircularProgress } from '@material-ui/core';
import { tableHeadCategory } from '@/models/tableHead';
import React, { useEffect, useState } from 'react';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { IBaseParams, CategoryVM } from '@/models';
import { apiProductCategory } from '@/apis';
import ProductCateCreate from './component/create';
import './index.css'
import ProductCateDetail from './component/detail';
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}
function ProductCategory(props: IProps) {
    const dispatch = useNotification();
    const [data, setData] = useState<CategoryVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    const [isOpenCreate, setOpenCreate] = useState<boolean>(false)
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false)
    const [IdSelect, setIdSelect] = useState<number>(0)
    const [isShowModal, setModal] = useState(false);

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách danh mục' }
        ]);
        getData();
    }, [])

    async function getData() {
        if (!isLoading) setLoading(true)
        let serial = SerializeParam(params);
        let newParam = { ...params };
        await apiProductCategory.getPaging(serial).then((rsp) => {
            if (!rsp.error) {
                setLoading(false)
                setData(rsp.data.data)
                newParam.totalCount = rsp.data.totalCount
                setParams(newParam)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        }).catch(() => { setLoading(false); dispatch('ERROR', 'Có lỗi xảy ra.') })
    }

    async function handleDelete() {
        await apiProductCategory.delete(IdSelect).then(async (rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Xoá thành công.')
                handleCloseSlide()
                await getData()
            } else {
                setLoading(false);
                dispatch('ERROR', rsp.message)
            }
        })
    }

    async function handleCloseSlide() {
        setIdSelect(0);
        setOpenEdit(false)
        setModal(false)
        await getData()
    }

    function handleTableEdit(id) {
        setIdSelect(id);
        setOpenEdit(true)
    }
    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            let { value } = e.target;
        }
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
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
            handleDelete={(id) => { setIdSelect(id); setModal(true) }}
            handleEdit={(id) => handleTableEdit(id)}
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

            {isOpenEdit && <ProductCateDetail
                id={IdSelect}
                isOpen={isOpenEdit}
                handleClose={() => setOpenEdit(false)}
                handleReload={async () => await getData()}
            />}

            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => handleCloseSlide()}
                handleConfirm={() => handleDelete()}
                note={"Bạn có chắc chắn muốn xoá Danh mục này?"}
            />
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory)

