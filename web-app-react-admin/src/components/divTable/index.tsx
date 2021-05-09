import React from 'react'
import { IBaseParams, ITableHead } from '@/models'
import './index.css'
import { formatDate, checkPermission } from '@/helpers/utils';
import { commandId } from '@/constants/utilConstant'
import { CircularProgress } from '@material-ui/core';
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
    handleEdit?: (id: any) => void,
    handleDelete?: (id: any) => void
}

export default function DivTable(props: IProps) {

    let { page, pageSize, funcId } = props;

    function fetchData(page, pageSize) {
        let objParams: IBaseParams = {
            page: page + 1,
            pageSize: pageSize
        };
        props.onchangeParam(objParams)
    }



    function renderCell(type, value, index) {
        if (type === "stt")
            return <div key={"r_cel" + index} className="divTableCell center">{index + 1}</div>
        else if (type === "date")
            return <div key={"r_cel" + index} className="divTableCell center">{formatDate(value, null)}</div>
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
                    <div className="content_table_data_empty">
                        <CircularProgress />
                    </div>
                    :
                    props.data.length > 0 ?
                        renderContentTable() :
                        <div className="content_table_data_empty">
                            <span>
                                {IconEmppty()}
                            </span>
                            <p className="ml-5">Danh sách đang trống</p>
                        </div>
                }
            </div>
        </div>
    }

    return (
        renderContent()
    )
}
