import React, { useState, useEffect, useRef } from 'react'
import { IBaseParams, ITableHead } from '@/models'
import './index.css'
import { formatDate, checkPermission, replaceImgUrl } from '@/helpers/utils';
import { commandId, ImageSize } from '@/constants/utilConstant'
import { Switch, TablePagination, Tooltip } from '@material-ui/core';
import { IconEdit_01, IconEmpty, IConImage, IconTrash } from '@/helpers/svg';
import { Loading, LoadMore } from '../loaders';
import debounce from 'lodash.debounce';

export interface IProps {
    funcId: string,
    data: Array<any>,
    page: number,
    pageSize: number,
    total?: number,
    header: Array<ITableHead>,
    onchangeParam: Function,
    isLoading: boolean,
    isHiddenPagination?: boolean,
    scrollAble?: boolean,
    isLoadMore?: boolean,
    handleEdit?: (id: any) => void,
    handleDelete?: (id: any) => void
}


export default function DivTable(props: IProps) {

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [loadMore, setLoadMore] = useState(false);
    let { page, pageSize, funcId, isHiddenPagination, scrollAble, isLoadMore } = props;


    useEffect(() => {
        resize();
    }, []);


    useEffect(() => {
        if (!isLoadMore && loadMore)
            setLoadMore(false)
    }, [isLoadMore]);



    function handleScroll(e) {
        const currentScrollY = e.target.scrollTop;
        const currentScrollHeight = e.target.scrollHeight;
        const height = e.target.clientHeight;
        const currentHeight = (currentScrollHeight - currentScrollY - 150)
        if (currentHeight < height && !loadMore) {
            setLoadMore(true);
        }
    }

    useEffect(() => {
        if (loadMore) {
            fetchData(page, pageSize)
        }
    }, [loadMore]);

    function resize() {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    }

    function fetchData(page, pageSize) {
        let objParams: IBaseParams = {
            page: page + 1,
            pageSize: pageSize
        };
        props.onchangeParam(objParams, loadMore)
    }


    function handleChangePage(event, newPage) {
        fetchData(newPage, pageSize)
    }

    function handleChangeRowsPerPage(event) {
        fetchData(0, +event.target.value)
    }

    function handleEdit(id: any) {
        if (checkPermission(funcId, commandId.update) && props.handleEdit)
            props.handleEdit(id)
    }

    function renderCell(type, value, index, id) {
        if (type === "stt")
            return <div key={"r_cel" + index} onClick={() => handleEdit(id)} className="divTableCell center">{index + 1}</div>
        else if (type === "date")
            return <div key={"r_cel" + index} onClick={() => handleEdit(id)} className="divTableCell center">{formatDate(value, null)}</div>
        else if (type === "image")
            return <div key={"r_cel" + index} onClick={() => handleEdit(id)} className="divTableCell center" style={{ width: '200px' }}>
                {value ? <img height="40px" src={replaceImgUrl(value, ImageSize.small)} /> : IConImage(36, '#8c8c8c')}
            </div>
        else if (type === "status")
            return <div key={"r_cel" + index} onClick={() => handleEdit(id)} className="divTableCell center" style={{ width: '100px' }} >
                <Switch checked={value === 1 ? true : false} color="primary" />
            </div>
        else return <div key={"r_cel" + index} onClick={() => handleEdit(id)} className="divTableCell center">{value}</div>
    }

    function renderContentTable() {
        return props.data.map((item, index) => (
            <div className="divTableRow cursor text-center cursor" key={`r${index}`} >
                {
                    props.header.map((header, indexCel) => {
                        return renderCell(header["type"], item[header["fieldName"]], (index + indexCel), item["id"])
                    })
                }
                <div className="divTableCell center">
                    {
                        (checkPermission(funcId, commandId.update) && (props.handleEdit) && <Tooltip title="Sửa" aria-label="Sửa">
                            <span onClick={() => props.handleEdit && props.handleEdit(item["id"])} className="px-2 cursor" >{IconEdit_01(20)}</span>
                        </Tooltip>)
                    }

                    {(checkPermission(funcId, commandId.delete) && (props.handleDelete) &&
                        <Tooltip title="Xoá" aria-label="Xoá">
                            <span onClick={() => props.handleDelete && props.handleDelete(item["id"])} className="px-2 cursor" >{IconTrash(20)}</span>
                        </Tooltip>)
                    }
                </div>
            </div>

        ))
    }


    function renderContent() {
        let widthContent = dimensions.width - 620;
        return <div className="divTable">
            <div className="divTableBodyHead text-center" >
                <div className="divTableRow">
                    {props.header.map((item, index) => {
                        return <div key={`h${index}`} className=" divTableHead center item-head-sticky">{item.name}</div>
                    })}
                    {(props.handleDelete || props.handleEdit) && <div key={`action`} className="divTableHead center item-head-sticky">#</div>}
                </div>
            </div>
            <div className="divTableBody" >
                {(props.isLoading && !loadMore) ?
                    <div className="content_table_data_empty mt-5" style={{ width: widthContent }}>
                        <Loading />
                    </div>
                    :
                    props.data.length > 0 ?
                        renderContentTable()
                        :
                        <div className="content_table_data_empty" style={{ width: widthContent }}>
                            <span>
                                {IconEmpty((dimensions.height - 550) < 0 ? 10 : (dimensions.height - 550))}
                            </span>
                            <p className="mx-5 font-weight-bold text-dark">Danh sách đang trống</p>
                        </div>
                }
            </div>
        </div>
    }

    function renderLabelPage(paginationInfo) {
        return <span>
            {`${paginationInfo.page + 1} - ${paginationInfo.to}`} của {paginationInfo.count}
        </span>
    }

    const callbackDebounce = debounce(handleScroll, 200);
    const heightDeduction = 270;
    return (
        <div>
            <div className="divTable-wraper" >
                <div onScroll={(e) => scrollAble && callbackDebounce(e)} style={{ overflow: 'auto', height: (dimensions.height - heightDeduction), borderBottom: '1px solid rgb(241, 242, 246)', borderRadius: '10px' }}>
                    {renderContent()}
                </div>
                {
                    loadMore && <LoadMore />
                }

                {
                    !isHiddenPagination && <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        component="div"
                        labelRowsPerPage={<span>Hiển thị:</span>}
                        labelDisplayedRows={(paginationInfo) => renderLabelPage(paginationInfo)}
                        count={props.total ? props.total : 0}
                        rowsPerPage={pageSize}
                        page={page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

                }
            </div>

        </div >

    )
}
