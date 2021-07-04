import { ImageUploadCard, useNotification } from '@/components';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { SystemConfigVM } from '@/models';
import { apiSystemConfig } from '@/apis';
import { IBreadcrumbs } from '@/models/commonM';
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { commandId, functionId } from '@/constants/utilConstant';
import { checkPermission } from '@/helpers/utils';
interface IProps {
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}
type NewType = SystemConfigVM | null;

function SystemConfig(props: IProps) {
    const dispatch = useNotification();
    const [data, setData] = useState<SystemConfigVM>();
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isLoadingImg, setisLoadingImg] = useState<Boolean>(false)

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Cấu hình Website' }
        ]);
        getData();
    }, [])

    async function getData() {
        if (!isLoading) setLoading(true)
        await apiSystemConfig.detail().then((rsp) => {
            if (!rsp.isError) {
                setLoading(false)
                setData(rsp.data)
            } else {
                setLoading(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        }).catch(() => { setLoading(false); dispatch('ERROR', 'Có lỗi xảy ra.') })
    }


    async function saveData() {
        if (data?.id) {
            await apiSystemConfig.update(data).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Cập nhật thành công.')
                    return
                } else
                    dispatch('ERROR', 'Có lỗi xảy ra.')
            })
        } else {
            await apiSystemConfig.create(data).then((rsp) => {
                if (!rsp.isError) {
                    dispatch('SUCCESS', 'Thêm thành công.')
                    return
                } else
                    dispatch('ERROR', 'Có lỗi xảy ra.')
            })
        }

    }

    function handleUpload(isLoading, path) {
        if (path != null && !isLoading) {
            setisLoadingImg(false)
            let newFormState: NewType = { ...data };
            newFormState['logo'] = path;
            setData(newFormState);
        } else
            setisLoadingImg(true)
    }


    function handleChange(e) {
        let target = e.target;
        let newFormState: NewType = { ...data };
        if (newFormState)
            newFormState[target.name] = target.value;
        setData(newFormState);
    };

    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            <div>
                {checkPermission(functionId.systemConfig, commandId.update) && <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">Lưu</button>}
            </div>
        </div>
    }

    function renderContent() {
        return <form autoComplete="off">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Tiêu đề</label>
                <input type="title" onChange={(e) => handleChange(e)} name="title" value={data?.title} className="form-control" id="title" aria-describedby="emailHelp" />
            </div>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="keywords" className="form-label">Từ khóa</label>
                    <textarea onChange={(e) => handleChange(e)} name="keywords" value={data?.keywords} className="form-control" id="keywords" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea onChange={(e) => handleChange(e)} name="description" value={data?.description} className="form-control" id="description" />
                </div>
            </div>


            <div className="mb-3">
                <label htmlFor="googleAnalytics" className="form-label">GoogleAnalytics</label>
                <textarea onChange={(e) => handleChange(e)} name="googleAnalytics" value={data?.googleAnalytics} className="form-control" id="googleAnalytics" />
            </div>
            <div className="mb-3">
                <label htmlFor="googleTag" className="form-label">GoogleTag</label>
                <textarea onChange={(e) => handleChange(e)} name="googleTag" value={data?.googletag} className="form-control" id="googleTag" />
            </div>
            <div className="mb-3">
                <label htmlFor="facebookMessager" className="form-label">FacebookMessager</label>
                <textarea onChange={(e) => handleChange(e)} name="facebookMessager" value={data?.facebookMessager} className="form-control" id="facebookMessager" />
            </div>
            <div className="row">
                <div className="col-6" >
                    <label htmlFor="exampleInputPassword1" className="form-label">Logo</label>
                    <div className="row bg-white mb-3" style={{ marginRight: '0px', marginLeft: '0px' }}>
                        <div className="col-2">
                            <ImageUploadCard
                                style={{ justifyContent: 'end' }}
                                isHidenInputUrl
                                handleUpload={(isLoading, listPath) => handleUpload(isLoading, listPath)}
                            />
                        </div>

                        <div className="col-10 justify-content-center pt-2 pb-2">
                            {
                                isLoadingImg ?
                                    <CircularProgress size={68} />
                                    :
                                    <img width={420} src={data?.logo} />

                            }
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                    <input onChange={(e) => handleChange(e)} name="phoneNumber" value={data?.phoneNumber} className="form-control" type="number" id="phoneNumber" />
                </div>
            </div>
        </form>
    }


    return (
        <div className="align-items-center justify-content-between mb-4 col-10 mx-auto">
            {renderHeader()}
            {renderContent()}
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemConfig)

