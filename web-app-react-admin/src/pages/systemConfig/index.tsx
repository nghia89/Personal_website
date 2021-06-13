import { AlertDialogSlide, SearchComponent, TableCenter, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { CircularProgress, TextField } from '@material-ui/core';
import { tableHeadCategory } from '@/models/tableHead';
import React, { useEffect, useState } from 'react';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { IBaseParams, SystemConfigVM } from '@/models';
import { apiSystemConfig } from '@/apis';
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}
type NewType = SystemConfigVM | null;

function SystemConfig(props: IProps) {
    const dispatch = useNotification();
    const [data, setData] = useState<SystemConfigVM>();
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Cấu hình Website' }
        ]);
        getData();
    }, [])

    async function getData() {
        if (!isLoading) setLoading(true)
        await apiSystemConfig.detail().then((rsp) => {
            if (!rsp.error) {
                setLoading(false)
                setData(rsp.data.data)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        }).catch(() => { setLoading(false); dispatch('ERROR', 'Có lỗi xảy ra.') })
    }

    function handleChange(e) {
        let target = e.target;
        let newFormState: NewType = { ...data };
        if (newFormState)
            newFormState[target.name] = target.value;
        setData(newFormState);
    };

    function renderContent() {
        return <form autoComplete="off">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Tiêu đề</label>
                <input type="email" className="form-control" id="title" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="keywords" className="form-label">Từ khóa</label>
                <input className="form-control" id="keywords" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Mô tả</label>
                <input className="form-control" id="description" />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                <input className="form-control" id="phoneNumber" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Logo</label>
                <input className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="googleAnalytics" className="form-label">GoogleAnalytics</label>
                <textarea className="form-control" id="googleAnalytics" name="googleAnalytics" />
            </div>
            <div className="mb-3">
                <label htmlFor="googleAnaTag" className="form-label">GoogleTag</label>
                <textarea className="form-control" id="googleAnaTag" />
            </div>
            <div className="mb-3">
                <label htmlFor="facebookMessager" className="form-label">FacebookMessager</label>
                <textarea className="form-control" id="facebookMessager" />
            </div>
        </form>
    }


    return (
        <div className="align-items-center justify-content-between mb-4">
            {isLoading ? <div className="d-flex justify-content-center">
                <CircularProgress />
            </div> :
                renderContent()}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemConfig)

