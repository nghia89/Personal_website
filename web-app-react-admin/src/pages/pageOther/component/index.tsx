import { AlertDialogSlide, DatePickers, Editor, FileUpload, InputComponent, SearchProduct, useNotification } from '@/components';
import { PATH } from '@/constants/paths';
import { IBreadcrumbs, ISelectVM } from '@/models/commonM';
import React, { useState, useEffect, Fragment } from 'react'
import { setBreadcrumb } from '@/reducer/breadcrumbs/breadcrumb.thunks';
import { connect } from 'react-redux';
import { PageOtherVM } from '@/models';
import { validateField } from '@/helpers/utils';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { apiPageOther, apiCatalogOther } from '@/apis';
import { env } from '@/environments/config';
import { validatePageOther } from '@/models/validateField';
import { Loading } from '@/components/loaders';


interface IProps {
    match: { params: { id: any } }
    setBreadcrumb: (payload: IBreadcrumbs[]) => {}
}

const initData: PageOtherVM = {
    name: '',
    alias: '',
    content: '',
    sortOrder: 0

}
let refs: any = {}
function PageOtherCreateAndEdit(props: IProps) {

    const dispatch = useNotification();
    let history = useHistory();
    const [data, setData] = useState<PageOtherVM>(initData);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAlert, setIsAlert] = useState<boolean>(false)
    const [dataCatalogOther, setDataCatalogOther] = useState<ISelectVM[]>([])

    useEffect(() => {
        props.setBreadcrumb([
            { name: 'Danh sách các trang khác', path: PATH.SETTING_PAGES },
            { name: 'Tạo mới trang' }
        ]);
        getData(props.match.params.id)
    }, [])

    async function saveData() {
        if (!validateFields()) {
            setIsLoading(true)
            if (data.id) {
                await apiPageOther.update(data).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Cập trang thành công.')
                        setData(initData)
                        getData(data.id)
                    } else dispatch('ERROR', rsp.message)
                })
            } else {
                await apiPageOther.create(data).then((rsp) => {
                    if (!rsp.isError) {
                        dispatch('SUCCESS', 'Thêm trang thành công.')
                        history.push(`${PATH.SETTING_PAGES}/${rsp.data.id}`);
                    } else dispatch('ERROR', rsp.message)
                })
            }
        }
    }

    async function handleDelete() {
        var data = await apiPageOther.delete(props.match?.params?.id);
        if (!data.isError) {
            dispatch('SUCCESS', 'Xóa sản phẩm thành công')
            setIsAlert(false)
            history.push(`${PATH.SETTING_PAGES}`);
        }
    }

    async function getData(id) {
        if (id) {
            let rsp = await apiPageOther.getById(id);
            if (!rsp.isError) {
                setData(rsp.data)
                setIsLoading(false)
            }
        } else setIsLoading(false)

        await apiCatalogOther.getAll().then((rsp) => {
            if (!rsp.isError) {
                let { data } = rsp
                data?.forEach((e) => {
                    dataCatalogOther.push({ value: e.id, label: e.name })
                });
                setDataCatalogOther([...dataCatalogOther])
            }
        })
    }

    function validateFields() {
        let messError = validateField(validatePageOther, refs);
        if (messError)
            dispatch('ERROR', messError)
        return messError

    }

    function handleOnchangeValue(e) {
        let name = e.target.name;

        data[name] = e.target.value;
        setData({ ...data });
    }

    function handleOnchange(name: string, value: any) {
        if (name)
            data[name] = value;
        setData({ ...data });
    }


    function renderHeader() {
        return <div className="pb-3 d-flex justify-content-end align-items-center">
            {data.id && <div>
                <button onClick={async () => setIsAlert(true)} type="button" className="mx-3 hms-btn-button btn btn-danger">Xóa</button>
            </div>}
            <div>
                <button onClick={async () => await saveData()} type="button" className="mx-3 hms-btn-button btn btn-primary">{data.id ? 'Cập nhật' : 'Lưu'}</button>
            </div>
        </div>
    }

    function renderContent() {
        let valueOption = dataCatalogOther.find(x => x.value == data.catalogOtherId)
        return <Fragment>
            <div className="col-10 mx-auto">
                <div className="wrapper-content mb-5">
                    <div className="ms-2 ">
                        <div className=" mb-3  border-line-bottom">
                            <span className="ui-information-title   mb-3 ">Thông Tin Chung</span>
                        </div>
                        <div className="row">
                            <div className=" col-12 pb-3">
                                <InputComponent
                                    label="Tên trang"
                                    name="name"
                                    inputRef={(r) => refs['name'] = r}
                                    onChange={(e) => handleOnchangeValue(e)}
                                    placeholder="Ví dụ: Chính sách bảo hành"
                                    value={data.name}
                                />
                            </div>

                            <div className=" col-6 pb-3">
                                <label className="color-black mb-3">Thuộc danh mục</label>
                                <Select
                                    ref={(r) => refs['catalogOtherId'] = r}
                                    className="basic-single "
                                    placeholder="Chọn giá trị..."
                                    classNamePrefix="select"
                                    value={valueOption}
                                    options={dataCatalogOther}
                                    onChange={(selectedOption) => handleOnchange("catalogOtherId", selectedOption.value)}
                                />
                            </div>
                            <div>
                                <label className="color-black mb-3">Nội dung</label>
                                <Editor data={data?.content} onChange={(data) => handleOnchange("content", data)} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    }

    return <Fragment>
        {
            isLoading ? <div className="justify-content-center d-flex mt-5 pt-5"><Loading /></div> :
                <div className="row">
                    {renderHeader()}
                    {renderContent()}
                    <AlertDialogSlide
                        isOpen={isAlert}
                        handleClose={() => setIsAlert(false)}
                        handleConfirm={() => handleDelete()}
                        note={"Bạn có chắc chắn muốn xoá sản phẩm này?"}
                    />
                </div>
        }

    </Fragment >
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    setBreadcrumb
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOtherCreateAndEdit)
