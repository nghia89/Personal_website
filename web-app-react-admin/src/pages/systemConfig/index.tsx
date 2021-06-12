import { AlertDialogSlide, SearchComponent, TableCenter, useNotification } from '@/components';
import { commandId, functionId } from '@/constants/utilConstant';
import { CircularProgress, TextField } from '@material-ui/core';
import { tableHeadCategory } from '@/models/tableHead';
import React, { useEffect, useState } from 'react';
import { checkPermission, SerializeParam } from '@/helpers/utils';
import { IBaseParams, SystemConfigVM } from '@/models';
import { apiSystemConfig } from '@/apis';
import './index.css'
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
        return <form noValidate autoComplete="off">
            <div className="row">
                <div className="col">
                    <TextField
                        label="Tên"
                        name="name"
                        value={data?.title}
                        variant="outlined"
                        size="small"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
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

