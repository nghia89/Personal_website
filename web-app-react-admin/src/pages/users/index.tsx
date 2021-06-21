import React, { useState, useEffect } from 'react'
import { tableHeadUser } from '@/models/tableHead'
import { CircularProgress, TextField, Select, MenuItem } from '@material-ui/core';
import { IBaseParams, RoleVM, UserVM } from '@/models/index';
import { apiRoles, apiUser } from '@/apis/index';
import { SerializeParam, checkPermission } from '@/helpers/utils';
import { TableCenter, AlertDialogSlide, useNotification, SearchComponent } from '@/components/index'
import UserDetail from './component/detail/index'
import UserCreate from './component/create/index'
import { commandId, functionId } from '@/constants/utilConstant'
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
export interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

function User(props: IProps) {
    const dispatch = useNotification();

    const [isLoading, setLoading] = useState(true);
    const [total, seTotal] = useState(0);
    const [data, setData] = useState<Array<UserVM>>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isShowModal, setModal] = useState(false);
    const [idSelect, setIdSelect] = useState('');
    const [searchText, setSearchText] = useState('');
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [isOpenCreate, setOpenCreate] = useState(false);
    const [userItem, setUserItem] = useState<any>();
    const [isShowSetRole, setShowSetRole] = useState(false)
    const [isOpenOption, setOpenOption] = useState(false)
    const [roleId, setRoleId] = useState<string>()
    const [dataRole, setDataRole] = useState<Array<RoleVM>>()


    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách người dùng' }
        ]);

        let param = getParams();
        async function fetchApi() {
            await getData(param)
            await getListRole()
        }
        fetchApi()

    }, [])

    function getParams() {
        let cvParam: IBaseParams = { page: page, pageSize: pageSize, query: searchText };
        return cvParam
    }

    async function getListRole() {
        await apiRoles.getAll().then((rsp) => {
            if (!rsp?.isError)
                setDataRole(rsp.data)
        })
    }

    async function handleDelete(id) {
        await apiUser.delete(id).then(async (rsp) => {
            if (rsp) {
                dispatch('SUCCESS', 'Xoá thành công.')
                setModal(false)
                let param = getParams();
                await getData(param)
            } else { setLoading(false); setModal(false) }
        })
    }
    function handleCloseSlide() {
        setIdSelect('');
        setModal(false)
    }
    function handleCloseTableCenter(id) {
        setIdSelect(id)
        setModal(true)
    }
    function handleCloseTableEdit(id) {
        setIdSelect(id);
        setOpenDrawer(true)
    }
    function getData(param: IBaseParams) {
        if (!isLoading) setLoading(true)

        if (param.page !== page)
            setPage(param.page)
        if (param.pageSize !== pageSize)
            setPageSize(param.pageSize)

        let newParam = SerializeParam({ query: param.query ? param.query : '', page: param.page, pageSize: param.pageSize });
        apiUser.getUserPaging(newParam).then((rsp) => {
            if (!rsp.isError) {
                setData(rsp.data.data)
                seTotal(rsp.data.totalCount)
                setLoading(false)
            } else setLoading(false)
        }).catch(err => {
            console.log('err', err);

        });
        return;
    }

    function handleSetUser(item) {
        setShowSetRole(!isShowSetRole)
        setUserItem(item)
    }

    async function handleAddRoleToUser() {
        await apiUser.addRoleToUser({ roleName: roleId, userId: userItem.id }).then((rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Thêm quyền user thành công.')
                setShowSetRole(!isShowSetRole)
            } else dispatch('ERROR', 'Thêm quyền user thất bại.')
        })
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            let { value } = e.target;
            let param = getParams();
            param.query = value;
            await getData(param)
            setSearchText(value)
        }
    }

    function renderHeader() {
        return <div className="pb-5 d-flex justify-content-between align-items-center">
            <div className="d-flex col-6">
                <SearchComponent
                    placeholder="Nhập tìm kiếm bằng Email, Tên, Sđt. Enter để tìm kiếm... "
                    handleKeyDown={handleKeyDown}
                />
            </div>
            {checkPermission(functionId.user, commandId.create) && <button onClick={() => setOpenCreate(true)} type="button" className="mx-3 btn btn-success">Tạo mới</button>}
        </div>
    }


    function renderContent() {
        return <TableCenter
            funcId={functionId.user}
            data={data}
            header={tableHeadUser}
            fetchData={(value) => getData(value)}
            pageSize={pageSize}
            page={page}
            total={total}
            isLoading={isLoading}
            handleDelete={(id) => handleCloseTableCenter(id)}
            handleEdit={(id) => handleCloseTableEdit(id)}
            handleSetRole={(item) => handleSetUser(item)}
        />
    }

    const handleSetRoleId = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRoleId(event.target.value as string)
    }

    return (
        <div className="align-items-center justify-content-between mb-4">
            {renderHeader()}
            {renderContent()}

            <AlertDialogSlide
                isOpen={isShowModal}
                handleClose={() => handleCloseSlide()}
                handleConfirm={() => handleDelete(idSelect)}
                note={"Bạn có chắc chắn muốn xoá User này?"}
            />
            <AlertDialogSlide
                isOpen={isShowSetRole}
                width='50%'
                title="Cập nhật quyền user"
                handleClose={() => handleSetUser(null)}
                handleConfirm={(item) => handleAddRoleToUser()}>

                <div >
                    <TextField
                        disabled
                        style={{ marginBottom: '25px' }}
                        label="Họ và tên"
                        variant="filled"
                        value={userItem?.fullName}
                        className="form-control"
                    />
                    <TextField
                        disabled
                        style={{ marginBottom: '25px' }}
                        label="UserName"
                        variant="filled"
                        name="dob"
                        value={userItem?.userName}
                        className="form-control"
                    />
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={isOpenOption}
                        onClose={() => setOpenOption(!isOpenOption)}
                        onOpen={() => setOpenOption(!isOpenOption)}
                        value={roleId}
                        onChange={handleSetRoleId}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {dataRole?.map((item, index) => {
                            return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                        })}
                    </Select>
                </div>
            </AlertDialogSlide>
            {isOpenDrawer && <UserDetail
                id={idSelect}
                isOpen={isOpenDrawer}
                handleClose={() => setOpenDrawer(false)}

            />}
            {isOpenCreate && <UserCreate
                isOpen={isOpenCreate}
                handleClose={() => setOpenCreate(false)}
                handleReload={async () => await getData(getParams())}
            />}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(User)


