import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { apiProductCategory } from '@/apis/index'
import './index.scss'
import { TreeCateItem } from '@/models';
import TreeNode from './treeNode'
const useStylesTree = makeStyles({
    root: {
        minHeight: 200,
        flexGrow: 1,
        minWidth: 400,
        maxWidth: 800,
        color: '#212121',
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
});

interface IProps {
    dataValue?: number
    handleOnchange: Function
}

interface ItemSelect {
    id: number
    name: string
}

let isFirst = false;

export default function TreeViewCategory(props: IProps) {

    const classesTree = useStylesTree();
    const [data, setData] = React.useState<TreeCateItem[]>([]);
    const [selected, setSelected] = React.useState<ItemSelect>();
    const [isShowDropdown, setShowDropdown] = React.useState<boolean>(false);

    useEffect(() => {
        isFirst = false
        handleCallData()
    }, [])


    function handleCheckSelectNode(item) {
        setShowDropdown(false)
        props.handleOnchange(item.id)

        setSelected({ id: item.id, name: item.name })
    }
    async function handleShowDropdown() {
        setShowDropdown(!isShowDropdown);
        handleCallData()
    }

    async function handleCallData() {
        if (data.length <= 0)
            await apiProductCategory.treeViewCate().then((rsp) => {
                if (!rsp.isError) {
                    setData(rsp.data)
                    if (props.dataValue) {
                        var index = rsp.data.findIndex(a => a.item?.id === props.dataValue)
                        if (index > -1)
                            setSelected({ id: rsp.data[index].item?.id, name: rsp.data[index].item?.name })
                    }
                }
            })
    }

    let classShowDropdown = `dropdown-select-custom dropdown-menu p-2  animate slideIn  ${isShowDropdown ? 'show' : ""}`
    return (
        <div className="treeView_wraper">
            <div className="treeView_wraper_input d-flex mb-1">
                <div style={{ display: 'contents' }}
                    onClick={() => handleShowDropdown()}>
                    <input placeholder="Chọn danh mục" value={selected?.name} />
                </div>
                <div onClick={() => handleShowDropdown()} className="cursor-pointer treeView-icon-drop">
                    <ArrowDropDownIcon />
                </div>
            </div>

            <div className={classShowDropdown} >
                <Collapse in={isShowDropdown}>
                    <ul className={classesTree.root}>
                        {data.map((item, index) => {
                            return <TreeNode
                                keyNote={`node${item.item.id}${index}`}
                                item={item.item}
                                children={item.children}
                                handleSetSelected={(item) => handleCheckSelectNode(item)}
                                selected={props.dataValue}
                            />
                        })}
                    </ul>
                </Collapse>

            </div>
        </div >

    );
}