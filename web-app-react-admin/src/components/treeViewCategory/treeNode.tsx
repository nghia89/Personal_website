import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import { Collapse, InputBase, InputLabel, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { apiProductCategory } from '@/apis/index'
import './index.scss'
import { TreeCateItem, CategoryVM } from '@/models';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { TreeCategoryVM } from '@/models/productCategory';


interface IProps {
    item: TreeCategoryVM
    children: Array<TreeCateItem>
    keyNote: string
    handleSetSelected: Function
    selected?: number
}

export default function TreeNode(props: IProps) {

    const [expanded, setExpanded] = React.useState<number[]>([]);

    function TreeItem(children: Array<TreeCateItem>) {
        return <React.Fragment>
            {children.map((item, index) => {
                return renderContent(item.item, item.children, `child${item.item.id}${index}`)
            })}
        </React.Fragment>
    }

    function handleSetExpan(nodeId: number) {
        let index = expanded.findIndex(a => a == nodeId);
        if (index > -1) {
            let newExpan = [...expanded]
            newExpan.splice(index, 1);
            setExpanded(newExpan)
        } else setExpanded([...expanded, nodeId])

    }
    function handleCheckSelect(node: TreeCategoryVM, isSelect) {
        if (isSelect) handleSetExpan(node.id)
        else props.handleSetSelected({ id: node.id, name: node.name })
    }

    function renderExpan(nodeId: number, isExpand) {
        return <div onClick={() => handleSetExpan(nodeId)} >
            {
                (isExpand) ? <ExpandMoreIcon /> : <NavigateNextIcon />
            }
        </div >
    }
    function renderContent(node: TreeCategoryVM, children: Array<TreeCateItem>, keyNote: string) {
        let isExpand = expanded.includes(node.id) ? true : false;
        let isChild = (children[0] != undefined) ? true : false;
        let itemRootClass = `cate-treeItem-root${props.selected == node.id ? ' cate-tree-selected' : ''}`
        return <React.Fragment key={keyNote} >
            {
                <li className={itemRootClass}>
                    <div className="cate-treeItem-content">
                        <div className="cate-treeItem-iconContainer"  >
                            {isChild && renderExpan(node.id, isExpand)}
                        </div>
                        <div onClick={() => handleCheckSelect(node, isChild)} className="cate-treeItem-label cate-typography-body1">
                            {node.name}
                        </div>
                    </div>
                    <ul className="cate-treeItem-group ">
                        <Collapse in={isExpand}>
                            {TreeItem(children)}
                        </Collapse>
                    </ul>
                </li>
            }
        </React.Fragment>

    }

    return (
        renderContent(props.item, props.children, props.keyNote)
    );
}