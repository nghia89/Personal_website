import React, { useEffect, useState } from 'react'
import { IBaseParams, ITableHead } from '@/models'
import './index.css'
import { formatDate, checkPermission } from '@/helpers/utils';
import { commandId } from '@/constants/utilConstant'
import { CircularProgress, makeStyles, TableContainer, TablePagination } from '@material-ui/core';
import { IconEmppty } from '@/helpers/svg';

export interface IProps {
    funcId: string,
    data: Array<any>,
    page: number,
    pageSize: number,
    total?: number,
    header: Array<ITableHead>,
    onchangeParam: Function,
    isLoading: boolean,
    isPagination?: boolean,
    handleEdit?: (id: any) => void,
    handleDelete?: (id: any) => void
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }, root: {
        width: '100%',

    },
    container: {
        minHeight: 495,
    },
});

export default function DivTable(props: IProps) {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    console.log('props', props);

    let { page, pageSize, funcId, isPagination } = props;


    useEffect(() => {
        resize()
    }, []);

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
        props.onchangeParam(objParams)
    }


    function handleChangePage(event, newPage) {
        fetchData(newPage, pageSize)
    }

    function handleChangeRowsPerPage(event) {
        fetchData(0, +event.target.value)
    }


    function renderCell(type, value, index) {
        if (type === "stt")
            return <div key={"r_cel" + index} className="divTableCell center">{index + 1}</div>
        else if (type === "date")
            return <div key={"r_cel" + index} className="divTableCell center">{formatDate(value, null)}</div>
        else if (type === "image")
            return <div key={"r_cel" + index} className="divTableCell center" style={{ width: '200px' }}>
                <img height="100px" src={value} />
            </div>
        else return <div key={"r_cel" + index} className="divTableCell center">{value}</div>
    }

    function renderContentTable() {
        return props.data.map((item, index) => (
            <div onClick={() => props.handleEdit && props.handleEdit(item["id"])} className="divTableRow" key={`r${index}`}>
                {
                    props.header.map((header, indexCel) => {
                        return renderCell(header["type"], item[header["fieldName"]], (index + indexCel))
                    })
                }
                {
                    (props.handleDelete) && <div className="divTableCell center">
                        {checkPermission(funcId, commandId.delete) && <span onClick={() => props.handleDelete && props.handleDelete(item["id"])} className="material-icons cursor p-2">delete</span>}
                    </div>
                }
            </div>
        ))
    }


    function renderContent() {
        return <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    {props.header.map((item, index) => {
                        return <div key={`h${index}`} className=" divTableCell center divTableHeading">{item.name}</div>
                    })}
                </div>
                {props.isLoading ?
                    <div className="content_table_data_empty" style={{ width: dimensions.width - 300 }}>
                        <CircularProgress />
                    </div>
                    :
                    props.data.length > 0 ?
                        renderContentTable() :
                        <div className="content_table_data_empty" style={{ width: dimensions.width - 300 }}>
                            <span>
                                {IconEmppty()}
                            </span>
                            <p className="ml-5 font-weight-bold text-dark">Danh sách đang trống</p>
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


    return (
        <div>
            <div style={{ minHeight: (dimensions.height - 280) }}>
                {renderContent()}
            </div>
            {!isPagination && <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                labelRowsPerPage={<span>Hiển thị:</span>}
                labelDisplayedRows={(paginationInfo) => renderLabelPage(paginationInfo)}
                count={props.total ? props.total : 0}
                rowsPerPage={props.pageSize}
                page={page - 1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            }
        </div>

    )
}
