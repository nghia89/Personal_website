import React, { useState, useEffect } from 'react'
import { Checkbox } from '@material-ui/core';
import { PermissionVM, PermissionRequest, FunctionVM } from '@/models/index';
import { apiPermission, apiRoles, apiFunction } from '@/apis/index';
import { useNotification, DrawerLayout } from '@/components/index'
import { commandCode, commandId, functionId } from '@/constants/utilConstant';
import { checkPermission } from '@/helpers/utils';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Animations } from '@/components/loaders'

export interface IProps {
    id: string,
    isOpen: boolean
    handleClose: Function
}
const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        margin: 'auto'
    }
});

export default function PermissionDetail(props: IProps) {
    const dispatch = useNotification();
    const classes = useStyles();

    let { id, isOpen } = props;
    const [isLoading, setLoading] = useState(false);
    const [isEdit, setEdit] = useState(true);
    const [data, setData] = useState<Array<PermissionVM>>([]);
    const [functionRoot, setFunctionRoot] = useState<FunctionVM[]>([])

    useEffect(() => {
        getFuncRoot()
        getData()
    }, [])

    async function getFuncRoot() {
        let data = await apiFunction.getFuncRoot();
        if (!data.isError) {
            setFunctionRoot(data.data)
        }
    }

    async function getData() {
        if (!isLoading) setLoading(true)
        await apiPermission.getPermission(id).then((rsp) => {
            if (!rsp.isError) {
                setData(rsp.data);
                setLoading(false)
            } else setLoading(false)
        })
    }

    function handleClose() {
        setEdit(true);
        props.handleClose()
    }

    async function saveData() {
        if (!isLoading) setLoading(true)
        let perRequest: Array<PermissionRequest> = [];

        let listPermissionView = data.filter(a => a.hasView === true);
        let listPermissionCreate = data.filter(a => a.hasCreate === true);
        let listPermissionUpdate = data.filter(a => a.hasUpdate === true);
        let listPermissionDelete = data.filter(a => a.hasDelete === true);

        listPermissionView.forEach(a => perRequest.push({
            FunctionId: a.id,
            CommandId: commandId.view
        } as PermissionRequest));

        listPermissionCreate.forEach(a => perRequest.push({
            FunctionId: a.id,
            CommandId: commandId.create
        } as PermissionRequest));

        listPermissionUpdate.forEach(a => perRequest.push({
            FunctionId: a.id,
            CommandId: commandId.update
        } as PermissionRequest));
        listPermissionDelete.forEach(a => perRequest.push({
            FunctionId: a.id,
            CommandId: commandId.delete
        } as PermissionRequest));

        await apiRoles.updatePermissionByRole(id, perRequest).then((rsp) => {
            if (rsp) {
                dispatch('SUCCESS', 'Phân quyền thành công.');
                setLoading(false)
                setEdit(true)
            } else setLoading(false)
        })
    }

    function handleChangeNodeRoot(rootId: string, command: string, statusActive: boolean, index: number) {
        if (isEdit)
            setEdit(false)

        let dataNew = [...data]
        let child = dataNew.filter(a => a.parentId === rootId);
        if (child) {
            switch (command) {
                case commandId.view:
                    dataNew[index].hasView = !statusActive
                    child.map((a) => a.hasView = !statusActive)
                    break;
                case commandId.update:
                    dataNew[index].hasUpdate = !statusActive
                    child.map((a) => a.hasUpdate = !statusActive)
                    break;
                case commandId.create:
                    dataNew[index].hasCreate = !statusActive
                    child.map((a) => a.hasCreate = !statusActive)
                    break;
                case commandId.delete:
                    dataNew[index].hasDelete = !statusActive
                    child.map((a) => a.hasDelete = !statusActive)
                    break;
            }
            setData(dataNew);
        }
    }

    function handleChange(funcId: string | undefined, command: string) {
        if (isEdit)
            setEdit(false)

        let dataNew = [...data]
        let index = dataNew.findIndex(a => a.id === funcId);
        if (index >= 0) {
            switch (command) {
                case commandId.view:
                    data[index]["hasView"] = !data[index]["hasView"];
                    break;
                case commandId.update:
                    data[index]["hasUpdate"] = !data[index]["hasUpdate"];
                    break;
                case commandId.create:
                    data[index]["hasCreate"] = !data[index]["hasCreate"];
                    break;
                case commandId.delete:
                    data[index]["hasDelete"] = !data[index]["hasDelete"];
                    break;
            }
            setData(dataNew);
        }
    }

    function checkPerFuncToAction(child: PermissionVM[] | undefined, command) {
        if (!child || !commandId) return false;
        let isCheck = false;
        switch (command) {
            case commandId.view:
                let checkView = child.findIndex(a => a.hasView === false);
                isCheck = checkView < 0 ? true : false;
                break;
            case commandId.update:
                let checkUpdate = child.findIndex(a => a.hasUpdate === false);
                isCheck = checkUpdate < 0 ? true : false
                break;
            case commandId.create:
                let checkCreate = child.findIndex(a => a.hasCreate === false);
                isCheck = checkCreate < 0 ? true : false
                break
            case commandId.delete:
                let checkDelete = child.findIndex(a => a.hasDelete === false);
                isCheck = checkDelete < 0 ? true : false
                break
        }
        return isCheck;
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-1 text-gray-800">Quảng lý phân quyền</h1>
            <div>
                {checkPermission(functionId.permission, commandId.update) && <button disabled={isEdit} onClick={() => saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>}
                <button onClick={() => handleClose()} type="button" className="mx-3 hms-btn-button btn btn-light">Đóng</button>
            </div>
        </div>
    }


    function renderContent() {
        return <TreeView
            className={classes.root}
            defaultExpanded={['root0', 'root1']}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {
                functionRoot.map((root, index) => {
                    let child = data?.filter(a => a.parentId === root.id);
                    let key = `root${index}`;
                    return <TreeItem nodeId={key} label={root.name}>
                        <div className="row">
                            <div className="col-4" />
                            <div className="col-8 row">
                                {
                                    commandCode.map((cm) => {
                                        let statusActive = checkPerFuncToAction(child, cm.id);
                                        return <div key={`cm${cm.id}_${index}`} className="col ">
                                            <Checkbox checked={statusActive} onChange={() => handleChangeNodeRoot(root.id, cm.id, statusActive, index)} name="checkedB" color="primary" />
                                            <label>{cm.name}</label>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        {
                            child?.map((child, indexC) => {
                                let keyC = `child${index + indexC}_${child.id}`;
                                return <div key={keyC} className="row align-items-center important_card card mb-2 h-10 ">
                                    <div className="col-4">
                                        <span>{child.name}</span>
                                    </div>
                                    <div className="col-8 row">
                                        <div className="col">
                                            <Checkbox checked={child.hasView} onChange={() => handleChange(child.id, commandId.view)} name="checkedB" color="primary" />
                                        </div>
                                        <div className="col">
                                            <Checkbox checked={child.hasCreate} onChange={() => handleChange(child.id, commandId.create)} name="checkedB" color="primary" />
                                        </div>
                                        <div className="col">
                                            <Checkbox checked={child.hasUpdate} onChange={() => handleChange(child.id, commandId.update)} name="checkedB" color="primary" />
                                        </div>
                                        <div className="col">
                                            <Checkbox checked={child.hasDelete} onChange={() => handleChange(child.id, commandId.delete)} name="checkedB" color="primary" />
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </TreeItem>
                })
            }

        </TreeView>
    }

    function renderLoading() {
        return <Animations W={500} />
    }

    return <DrawerLayout
        isOpen={isOpen}
        width={window.innerWidth / 2 + 'px'}
    >
        <div className="drawer-container">
            <div className="row">
                <div className="col-12 mt-3">
                    {renderHeader()}
                    {isLoading ? renderLoading() : renderContent()}
                </div>
            </div>
        </div>

    </DrawerLayout>
}