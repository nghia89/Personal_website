import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconChevronDown, IConImage, IconSearch } from '@/helpers/svg'
import './index.scss'
import { IBaseParams, ProductVM } from '@/models';
import { apiProduct } from '@/apis/index'
import { replaceImgUrl, SerializeParam } from '@/helpers/utils';
import { LoadMore, SpinnerLoading } from '../loaders';
import { useNotification } from '../notifications/notificationProvider';
import { debounce } from '@material-ui/core';
import { ImageSize } from '@/constants/utilConstant';

interface IProps {
    dataValue: ProductVM[]
    handleOnchange: Function
}

let isFirst = false
export default function SearchProduct(props: IProps) {
    const dispatch = useNotification();

    const inputRef: any = useRef(null);
    const [isShowDropdown, setShowDropdown] = React.useState<boolean>(false);
    const [data, setData] = useState<ProductVM[]>([]);
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isLoadMore, setIsLoadMore] = useState(false)

    useEffect(() => {
        isFirst = false
    }, [])

    useEffect(() => {
        if (isShowDropdown && inputRef) {
            inputRef?.current?.focus();
        }

    }, [isShowDropdown])

    useEffect(() => {
        if (isFirst)
            fetchApi()
        isFirst = true
    }, [params.page, params.query])

    useEffect(() => {
        if (isLoadMore) {
            params.page += 1
            setParams({ ...params })
        }
    }, [isLoadMore]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowDropdown(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function handleSearch(e) {
        let textSearch = e.target.value
        params.query = textSearch;
        params.page = 1
        setData([])
        setParams({ ...params })
    }


    function handleScroll(e) {
        const currentScrollY = e.target.scrollTop;
        const currentScrollHeight = e.target.scrollHeight;
        const height = e.target.clientHeight;
        const currentHeight = (currentScrollHeight - currentScrollY - 150)
        if (currentHeight < height && !isLoadMore) {
            setIsLoadMore(true);
        }
    }

    async function fetchApi() {
        if (!isLoading && !isLoadMore) setLoading(true)
        let serialParam = SerializeParam(params);
        let newParam = { ...params };
        await apiProduct.getPaging(serialParam).then((rsp) => {
            if (!rsp.isError) {
                setLoading(false)
                let newData = data.concat(rsp.data.data)
                setData([...newData])

                setParams(newParam)
                setIsLoadMore(false)
            } else {
                setLoading(false)
                setIsLoadMore(false)
                dispatch('ERROR', 'Có lỗi xảy ra.')
            }
        })
    }

    function handleShowDropdown() {
        if (!data[0])
            fetchApi()
        setShowDropdown(!isShowDropdown)
    }

    function renderItem() {
        const callbackDebounce = debounce(handleScroll, 200);
        return <div
            className="box-item-menu p-2"
            onScroll={(e) => callbackDebounce(e)}
        >
            {
                data.map((item, index) => {
                    let check = props.dataValue.findIndex(x => x.id == item.id) > -1 ? true : false;
                    return <div
                        key={`product-item${index}`}
                        onClick={() => props.handleOnchange(item)}
                        className={`item-menu cursor ps-3 px-3 pt-2 pb-2 d-flex align-items-center justify-content-between ${check ? 'check' : ''}`}>
                        <div>
                            {item.name}
                        </div>
                        <span>
                            {check && IconCheck(16)}
                        </span>
                    </div>
                })
            }
            {isLoadMore && <LoadMore />}
        </div>
    }


    function renderContent() {
        if (isLoading) return <SpinnerLoading />
        return renderItem()
    }


    let classMenu = `dropdown-menu dropdown-menu-custom ${isShowDropdown ? 'show' : ''}`;

    const callbackSearch = debounce(handleSearch, 300);
    let lengthProduct = props.dataValue.length;
    return (
        <div>
            <div className="col">
                <div className="dropdown">
                    <div
                        onClick={() => handleShowDropdown()}
                        className={`treeView_wrapper_input d-flex p-2 align-items-center justify-content-between cursor ${isShowDropdown ? 'focus-dropdown' : ''}`}>
                        <div style={{ display: 'contents', fontWeight: lengthProduct > 0 ? 500 : 0 }}>
                            {lengthProduct > 0 ? `${lengthProduct} lựa chọn` : ' Chọn sản phẩm'}
                        </div>
                        <div className="cursor-pointer treeView-icon-drop" style={{ width: '30px' }}>
                            {IconChevronDown(16)}
                        </div>
                    </div>
                    <div ref={wrapperRef} className={classMenu} >
                        <div className=" p-3">
                            <div className={`next-input-group ${isShowDropdown ? 'focus-next-input' : ''}`}>
                                <span>{IconSearch(14)}</span>
                                <input ref={inputRef} onChange={(e) => callbackSearch(e)} placeholder="Tìm kiếm" />
                            </div>
                        </div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
