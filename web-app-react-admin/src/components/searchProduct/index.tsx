import React, { useEffect, useRef } from 'react'
import { IconChevronDown, IconSearch } from '@/helpers/svg'
import './index.scss'


interface IProps {
    dataValue?: number
    handleOnchange: Function
}


let isFirst = false;

export default function SearchProduct(props: IProps) {
    const inputRef: any = useRef(null);
    const [isShowDropdown, setShowDropdown] = React.useState<boolean>(false);

    useEffect(() => {
        if (isShowDropdown && inputRef) {
            inputRef?.current?.focus();
        }
    }, [isShowDropdown])

    function handleShowDropdown() {
        setShowDropdown(!isShowDropdown)
    }

    let classMenu = `dropdown-menu dropdown-menu-custom p-3 ${isShowDropdown ? 'show' : ''}`;

    return (
        <div>
            <div className="col">
                <div className="dropdown">
                    <div
                        onClick={() => handleShowDropdown()}
                        className={`treeView_wrapper_input d-flex p-2 align-items-center justify-content-between cursor ${isShowDropdown ? 'focus-dropdown' : ''}`}>
                        <div style={{ display: 'contents' }}>
                            Chọn sản phẩm
                        </div>
                        <div className="cursor-pointer treeView-icon-drop" style={{ width: '30px' }}>
                            {IconChevronDown(16)}
                        </div>
                    </div>
                    <div className={classMenu} >
                        <div className="mb-2">
                            <div className={`next-input-group ${isShowDropdown ? 'focus-dropdown' : ''}`}>
                                <span>{IconSearch(14)}</span>
                                <input ref={inputRef} placeholder="Tìm kiếm" />
                            </div>
                        </div>
                        <div>
                            <div>
                                Action 1
                            </div>
                            <div>
                                Action 2
                            </div>
                            <div>
                                Action3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
