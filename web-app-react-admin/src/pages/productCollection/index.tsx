import React, { useState, useEffect } from 'react'
import { apiProductCollection } from '@/apis/index'
import { connect, useSelector } from 'react-redux'
import { IBaseParams, ProductCollectionVM } from '@/models';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { AlertDialogSlide, DivTable, SearchComponent, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { tableHeadCollection } from '@/models/tableHead';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { IBreadcrumbs } from '@/models/commonM';


interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}


function ProductCollection(props: IProps) {
    let history = useHistory();
    const dispatch = useNotification();
    const [data, setData] = useState<ProductCollectionVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isShowModal, setIsShowModal] = useState(false)
    const [idSelect, setIdSelect] = useState(0)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })


    useEffect(() => {
        props.setBreadcrumb([{ name: 'Danh sách nhóm sản phẩm' }]);
    }, [])

    useEffect(() => {
        getData();
    }, [params.page, params.pageSize, params.query])

    async function getData() {
        if (!isLoading) setLoading(true)
        let serialParam = SerializeParam(params);
        let newParam = { ...params };
        await apiProductCollection.getPaging(serialParam).then((rsp) => {
            if (!rsp.isError) {
                setLoading(false)
                setData(rsp.data.data)
                setParams(newParam)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        })
    }

    async function handleDelete() {
        await apiProductCollection.delete(idSelect).then(async (rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Xoá thành công.')
                setIsShowModal(false)
                await getData()
            } else {
                setLoading(false);
                dispatch('ERROR', rsp.message)
            }
        })
    }

    function handleChangeParam(e) {
        let newParam: IBaseParams = { ...params };
        newParam.page = e.page;
        newParam.pageSize = e.pageSize
        setParams(newParam)
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-end align-items-center ">
            {
                checkPermission(functionId.productCollection, commandId.create) && <button onClick={() => {
                    history.push(PATH.PRODUCT_COLLECTIONS_Create)
                }} type="button" className="mx-3 btn btn-success">Tạo mới</button>
            }
        </div>
    }

    function renderContent() {
        return <DivTable
            funcId={functionId.productCollection}
            data={data}
            header={tableHeadCollection}
            onchangeParam={(e) => handleChangeParam(e)}
            pageSize={params.pageSize}
            page={params.page}
            total={params.totalCount}
            isLoading={isLoading}
            handleEdit={(id) => history.push(`${PATH.PRODUCT_COLLECTIONS}/${id}`)}
            handleDelete={(id) => { setIsShowModal(true); setIdSelect(id) }}
        />
    }



    return <div className="align-items-center justify-content-between mb-4">
        {renderHeader()}
        {renderContent()}
        <AlertDialogSlide
            isOpen={isShowModal}
            handleClose={() => { setIdSelect(0); setIsShowModal(false) }}
            handleConfirm={() => handleDelete()}
            note={"Bạn có chắc chắn muốn xoá sản phẩm này?"}
        />
    </div>
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection)
