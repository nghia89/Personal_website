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
    function renderExpan(nodeId: number) {
        let idCollap = `multiCollapse${nodeId}`
        return <div data-target={`#${idCollap}`} role="button" aria-expanded="false" data-toggle="collapse" aria-controls={idCollap} >
            {
                (expanded === nodeId) ? <ExpandMoreIcon />
                    : <NavigateNextIcon />
            }
        </div >
    }

    function renderContent(node: CategoryVM, children: Array<TreeCateItem>) {
        return <React.Fragment>
            {
                <li className="cate-treeItem-root">
                    <div className="cate-treeItem-content">
                        <div className="cate-treeItem-iconContainer" >
                            {children[0] && renderExpan(node.id)}
                        </div>
                        <div className="cate-treeItem-label cate-typography-body1">
                            {node.name}
                        </div>
                    </div>
                    <ul className="cate-treeItem-group MuiCollapse-container collapse" id={`multiCollapse${node.id}`}>
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