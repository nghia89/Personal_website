import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputLabel, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { apiProductCategory } from '@/apis/index'
import './index.scss'
import { TreeCateItem } from '@/models';
import { Skeleton } from '@material-ui/lab';
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
    dataValue?: Number
    handleOnchange: Function
}

let isFirst = false;

export default function TreeViewCategory(props: IProps) {

    const classesTree = useStylesTree();
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string>('');
    const [data, setData] = React.useState<TreeCateItem[]>([]);
    const [isShowDropdown, setShowDropdown] = React.useState<Boolean>(false);
    const [isLoading, setIsLoading] = React.useState<Boolean>(true);

    useEffect(() => {
        isFirst = false
        handleCallData()
    }, [])

    useEffect(() => {
        if (props.dataValue) {
            console.log(props.dataValue);
            setSelected(props.dataValue.toString())

        }
        else setSelected('')
    }, [props.dataValue])

    useEffect(() => {
        if (isFirst)
            handleCheckSelectNode()
        isFirst = true
    }, [expanded])

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        if (nodeIds.length > 0)
            setExpanded(nodeIds);
    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setSelected(nodeIds[0]);
    };

    function handleCheckSelectNode() {
        setShowDropdown(false)
        props.handleOnchange(selected)
    }
    async function handleShowDropdown() {
        setShowDropdown(!isShowDropdown);
        handleCallData()
    }

    async function handleCallData() {
        if (data.length <= 0)
            await apiProductCategory.treeViewCate().then((rsp) => {
                if (!rsp.isError) {
                    setData(rsp)
                    setIsLoading(false)
                } else setIsLoading(false)
            })
    }
    function renderChild(item: Array<TreeCateItem>) {
        return item.map((itemChild) => {
            return <TreeItem color="text.primary" nodeId={itemChild.item.id.toString()} label={itemChild.item.name} >
                {renderChild(itemChild.children)}
            </TreeItem>
        })
    }


    function renderContent() {
        if (isLoading) {
            return <div>
                <Typography variant="h3">
                    <Skeleton />
                </Typography>
                <Typography variant="h2">
                    <Skeleton />
                </Typography>
                <Typography variant="caption">
                    <Skeleton />
                </Typography>
                <Typography variant="caption">
                    <Skeleton />
                </Typography>
                <Typography variant="caption">
                    <Skeleton />
                </Typography>
            </div>
        }
        else {
            return <div>
                {
                    data.map((item, index) => {
                        let itemCate = item.item;
                        return <TreeItem color="text.primary" nodeId={itemCate.id.toString()} label={itemCate.name}>
                            {renderChild(item.children)}
                        </TreeItem>
                    })
                }
            </div >
        }
    }
    let classShowDropdown = `dropdown-menu-custom dropdown-menu p-2  animate slideIn  ${isShowDropdown ? 'show' : ""}`
    return (
        <div className="treeView_wraper">
            <div className="treeView_wraper_input d-flex">
                <div style={{ display: 'contents' }}
                    onClick={() => handleShowDropdown()}>
                    <input placeholder="Chọn danh mục" value="" />
                </div>
                <div onClick={() => handleShowDropdown()} className="cursor-pointer treeView-icon-drop">
                    <ArrowDropDownIcon />
                </div>
            </div>
            <div className={classShowDropdown} >
                <ul className={classesTree.root}>
                    {data.map((item, index) => {
                        return <TreeNode
                            item={item.item}
                            children={item.children}
                        />
                    })}
                </ul>


                {/* <TreeView
                    color="text.primary"
                    className={classesTree.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={[selected]}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    <div className="p-2">
                        {renderContent()}
                    </div>

                </TreeView> */}
            </div>
        </div>

    );
}