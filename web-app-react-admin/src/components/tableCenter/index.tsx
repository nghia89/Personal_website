import React, { useEffect } from 'react'
import {
    Table, TableBody, TablePagination, TableCell, makeStyles, TableContainer,
    TableHead, TableRow, Paper, Tooltip, CircularProgress, Switch
} from '@material-ui/core';
import { formatDate, checkPermission, IsNullOrEmpty, replaceImgUrl } from '@/helpers/utils';
import { IBaseParams, ITableHead } from '@/models/index'
import { commandId, ImageSize } from '@/constants/utilConstant'
import { IconEdit, IconEmpty, IconPlushSquare, IconTrash } from '@/helpers/svg';
import { Loading } from '../loaders';




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

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const useStyles = makeStyles({
        root: {
            width: '100%',

        },
        container: {
            height: dimensions.height - 300,
        },
    });

    const classes = useStyles();

    let { page, pageSize, funcId } = props;

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
        else if (type === "image")
            return <TableCell key={"r_cel" + index} className="divTableCell center" style={{ width: '200px' }}>
                <img height="70px" src={replaceImgUrl(value, ImageSize.small)} />
            </TableCell>
        else if (type === "status")
            return <TableCell key={"r_cel" + index} className="divTableCell center" style={{ width: '100px' }} >
                <Switch checked={value === 1 ? true : false} color="primary" />
            </TableCell>
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
                            <span onClick={() => props.handleEdit(item["id"])} className="px-2" >{IconEdit(20)}</span>
                        </Tooltip>
                    }

                    {(checkPermission(funcId, commandId.delete) && !props.isHiddenDelete) &&
                        <Tooltip title="Xoá" aria-label="Xoá">
                            <span onClick={() => props.handleDelete(item["id"])} className="px-2" >{IconTrash(20)}</span>
                        </Tooltip>
                    }
                    {(checkPermission(funcId, commandId.update) && props.handleSetRole) &&
                        <Tooltip title="Gán quyền" aria-label="Gán quyền">
                            <span onClick={() => props.handleSetRole && props.handleSetRole(item)} className="px-2"  >{IconPlushSquare(20)}</span>
                        </Tooltip>
                    }
                </TableCell>
            </TableRow>
        ))

    }


    function renderContent() {
        let widthContent = dimensions.width - 620;
        return <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.header.map((item, index) => {
                                return <TableCell key={`h${index}`} align="center" > {item.name}</TableCell>
                            })}
                            <TableCell key={`h_action`} align="center" ></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        props.isLoading ? <div className="content_table_data_empty mt-5" style={{ width: widthContent }}> <Loading /></div> :
                            props.data.length > 0 ?
                                <TableBody>
                                    {renderContentTable()}
                                </TableBody>
                                : <div className="content_table_data_empty" style={{ width: widthContent }}>
                                    <span>
                                        {IconEmpty(dimensions.height - 550)}
                                    </span>
                                    <p className="mx-5 font-weight-bold text-dark">Danh sách đang trống</p>
                                </div>
                    }

                </Table>
            </TableContainer >
            <TablePagination
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
