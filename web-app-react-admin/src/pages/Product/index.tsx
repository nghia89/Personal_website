import React, { useState, useEffect } from 'react'
import { apiProduct } from '@/apis/index'
import { connect } from 'react-redux'
import { IBaseParams, ProductVM } from '@/models';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { AlertDialogSlide, DivTable, SearchComponent, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { tableHeadProduct } from '@/models/tableHead';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import './index.scss'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { IBreadcrumbs } from '@/models/commonM';

interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}


let isFirst = false
export function Product(props: IProps) {
    let history = useHistory();
    const dispatch = useNotification();

    const [data, setData] = useState<ProductVM[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [idSelect, setIdSelect] = useState(0)
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })

    useEffect(() => {
        props.setBreadcrumb([{ name: 'Danh sách sản phẩm' }]);
        isFirst = false
        getData();

    }, [])

    useEffect(() => {
        if (isFirst)
            getData();
        isFirst = true
    }, [params.page, params.pageSize, params.query])

    async function getData() {
        if (!isLoading && !isLoadMore) setLoading(true)
        let serialParam = SerializeParam(params);
        let newParam = { ...params };
        await apiProduct.getPaging(serialParam).then((rsp) => {
            if (!rsp.isError) {
                setLoading(false)
                let newData = data.concat(rsp.data.data)
                setData([...newData])
                newParam.totalCount = rsp.data.totalCount

                setParams(newParam)
                setIsLoadMore(false)
            } else {
                setLoading(false)
                setIsLoadMore(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        })
    }

    async function handleDelete() {
        await apiProduct.delete(idSelect).then(async (rsp) => {
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


    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            let { name, value } = e.target;
            let newParam = { ...params };
            newParam.query = value;
            setParams(newParam)
            setData([])
        }
    }

    function handleSearch(textSearch) {
        let newParam = { ...params };
        newParam.query = textSearch;
        setParams(newParam)
        setData([])
    }

    function handlechangeParam(e, isLoadMore) {
        let newParam: IBaseParams = { ...params };
        newParam.page = e.page;
        newParam.pageSize = e.pageSize
        setParams(newParam)
        setIsLoadMore(isLoadMore)
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center ">
            <div className="d-flex col-4">
                <SearchComponent
                    handleSearch={handleSearch}
                    placeholder="Vui lòng nhập tên hoặc mã. tìm kiếm"
                    handleKeyDown={handleKeyDown}
                />
            </div>
            {
                checkPermission(functionId.product, commandId.create) && <button onClick={() => {
                    history.push(PATH.PRODUCT_CREATE)
                }} type="button" className="mx-3 btn btn-success">Tạo mới</button>
            }
        </div>
    }

    function renderContent() {
        return <DivTable
            funcId={functionId.product}
            data={data}
            header={tableHeadProduct}
            onchangeParam={(e, isLoadMore) => handlechangeParam(e, isLoadMore)}
            pageSize={params.pageSize}
            page={params.page}
            total={params.totalCount}
            scrollAble
            isLoadMore={isLoadMore}
            isLoading={isLoading}
            handleEdit={(id) => history.push(`${PATH.PRODUCT_DETAIL}${id}`)}
            handleDelete={(id) => { setIsShowModal(true); setIdSelect(id) }}
            isHiddenPagination
        />
    }


    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {renderContent()}
            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => { setIdSelect(0); setIsShowModal(false) }}
                handleConfirm={() => handleDelete()}
                note={"Bạn có chắc chắn muốn xoá sản phẩm này?"}
            />
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
