import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputLabel, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { apiProductCategory } from '@/apis/index'
import './index.scss'
import { TreeCateItem, CategoryVM } from '@/models';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


interface IProps {
    item: CategoryVM
    children: Array<TreeCateItem>
    key: string
}


export default function TreeNode(props: IProps) {

    const [expanded, setExpanded] = React.useState<number>(0);
    const [selected, setSelected] = React.useState<number>(0);

    function TreeItem(children: Array<TreeCateItem>) {
        return <React.Fragment>
            {children.map((item, index) => {
                return renderContent(item.item, item.children)
            })}
        </React.Fragment>
    }
    function renderExpan(nodeId: number, isExpand) {
        let idCollap = `multiCollapse${nodeId}`
        return <div onClick={() => setExpanded(expanded == nodeId ? 0 : nodeId)} data-target={`#${idCollap}`} role="button" aria-expanded={isExpand} data-toggle="collapse" aria-controls={idCollap} >
            {
                (isExpand) ? <ExpandMoreIcon /> : <NavigateNextIcon />
            }
        </div >
    }

    function renderContent(node: CategoryVM, children: Array<TreeCateItem>) {
        let isExpand = expanded == node.id ? true : false;
        let expanClass = `cate-treeItem-group MuiCollapse-container collapse ${isExpand ? 'show' : ''}`
        return <React.Fragment>
            {
                <li key={props.key} className="cate-treeItem-root">
                    <div className="cate-treeItem-content">
                        <div className="cate-treeItem-iconContainer"  >
                            {children[0] && renderExpan(node.id, isExpand)}
                        </div>
                        <div className="cate-treeItem-label cate-typography-body1">
                            {node.name}
                        </div>
                    </div>
                    <ul className={expanClass} id={`multiCollapse${node.id}`}>
                        {TreeItem(children)}
                    </ul>
                </li>
            }
        </React.Fragment>

    }

    return (
        renderContent(props.item, props.children)
    );
}