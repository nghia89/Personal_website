import React from 'react'
import {
    Table, TableBody, TablePagination, TableCell, makeStyles, TableContainer,
    TableHead, TableRow, Paper, Tooltip, CircularProgress
} from '@material-ui/core';
import { formatDate, checkPermission } from '@/helpers/utils';
import { IBaseParams, ITableHead } from '@/models/index'
import { commandId } from '@/constants/utilConstant'
import { IconEmppty } from '@/helpers/svg';


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


export interface IProps {
    funcId: string,
    data: Array<any>,
    page: number,
    pageSize: number,
    total?: number,
    header: Array<ITableHead>,
    fetchData: Function,
    isLoading: boolean,
    isHiddenEdit?: boolean,
    isHiddenDelete?: boolean,
    handleEdit: (id: any) => void,
    handleDelete: (id: any) => void,
    handleSetRole?: (item: any) => void
}

export default function TableCenter(props: IProps) {
    const classes = useStyles();

    let { page, pageSize, funcId } = props;

    // useEffect(()=>{
    //     window.addEventListener('resize', () => resize())
    // })

    // function resize() {
    //     let clh = 0;
    //     if (!IsNullOrEmpty(document.getElementById('react-table_filter_container'))) {
    //         clh = document.getElementById('react-table_filter_container').clientHeight;
    //     }
    //     let heightTitle = 0;
    //     if (!IsNullOrEmpty(document.getElementsByClassName('ui-title-bar-container')[0])) {
    //         heightTitle = document.getElementsByClassName('ui-title-bar-container')[0].clientHeight;
    //     }
    //     clh += 155 + heightTitle + heightPaging;
    //     let heighttable = window.innerHeight - clh;

    // }

    function fetchData(page, pageSize) {
        let objParams: IBaseParams = {
            page: page + 1,
            pageSize: pageSize
        };
        props.fetchData(objParams)
    }

    function handleChangePage(event, newPage) {
        fetchData(newPage, pageSize)
    }

    function handleChangeRowsPerPage(event) {
        fetchData(0, +event.target.value)
    }




    function renderCell(type, value, index) {
        if (type === "stt")
            return <TableCell key={"r_cel" + index} align="center">{index + 1}</TableCell>
        else if (type === "date")
            return <TableCell key={"r_cel" + index} align="center">{formatDate(value, null)}</TableCell>
        else if (type === "dateTime")
            return <TableCell key={"r_cel" + index} align="center">{formatDate(value, 'DD/MM/YYYY HH:MM')}</TableCell>
        else return <TableCell key={"r_cel" + index} align="center">{value}</TableCell>
    }

    function renderContentTable() {
        return props.data.map((item, index) => (
            <TableRow key={`r${index}`}>
                {
                    props.header.map((header, indexCel) => {
                        return renderCell(header["type"], item[header["fieldName"]], (index + indexCel))
                    })
                }
                <TableCell key={`r_action`} align="center" >
                    {
                        (checkPermission(funcId, commandId.update) && !props.isHiddenEdit) && <Tooltip title="Sửa" aria-label="Sửa">
                            <span onClick={() => props.handleEdit(item["id"])} className="material-icons cursor p-2">edit</span>
                        </Tooltip>
                    }

                    {(checkPermission(funcId, commandId.delete) && !props.isHiddenDelete) &&
                        <Tooltip title="Xoá" aria-label="Xoá">
                            <span onClick={() => props.handleDelete(item["id"])} className="material-icons cursor p-2">delete</span>
                        </Tooltip>
                    }
                    {(checkPermission(funcId, commandId.update) && props.handleSetRole) &&
                        <Tooltip title="Gán quyền" aria-label="Gán quyền">
                            <span onClick={() => props.handleSetRole && props.handleSetRole(item)} className="material-icons cursor p-2">manage_accounts</span>
                        </Tooltip>
                    }
                </TableCell>
            </TableRow>
        ))

    }


    function renderContent() {
        return <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" className={classes.table} >
                    <TableHead>
                        <TableRow>
                            {props.header.map((item, index) => {
                                return <TableCell key={`h${index}`} align="center" > {item.name}</TableCell>
                            })}
                            <TableCell key={`h_action`} align="center" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.isLoading ? <div className="content_table_data_empty"><CircularProgress /></div> :
                                props.data.length > 0 ?
                                    renderContentTable()
                                    : <div className="content_table_data_empty">
                                        <span>
                                            {IconEmppty()}
                                        </span>
                                        <p className="ml-5 font-weight-bold text-dark">Danh sách đang trống</p>
                                    </div>
                        }
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                labelRowsPerPage={<span>Hiển thị:</span>}
                labelDisplayedRows={(paginationInfo) => renderLabelPage(paginationInfo)}
                count={props.total ? props.total : 0}
                rowsPerPage={props.pageSize}
                page={page - 1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    }

    function renderLabelPage(paginationInfo) {
        return <span>
            {`${paginationInfo.page + 1} - ${paginationInfo.to}`} của {paginationInfo.count}
        </span>
    }



    return (
        renderContent()
    )
}
