import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import { InputBase, InputLabel } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.scss'
const useStylesTree = makeStyles({
    root: {
        minHeight: 200,
        flexGrow: 1,
        minWidth: 400,
        maxWidth: 800,
    },
});
const useStylesFrom = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);
interface IProps {

}

export default function TreeViewCategory(props: IProps) {

    const classesTree = useStylesTree();
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isShowDropdown, setShowDropdown] = React.useState<Boolean>(false);

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
        console.log('handleToggle', nodeIds);

    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setSelected(nodeIds);
        console.log('handleSelect', nodeIds);
    };
    let classShowDropdown = `dropdown-menu-custom dropdown-menu  animate slideIn  ${isShowDropdown ? 'show' : ""}`
    return (
        <div className="treeView_wraper">
            <div className="treeView_wraper_input d-flex">
                <div style={{ display: 'contents' }}
                    onClick={() => setShowDropdown(!isShowDropdown)}>
                    <input placeholder="Chọn danh mục" value="" />
                </div>
                <div className="treeView-icon-drop">
                    <ArrowDropDownIcon />
                </div>
            </div>
            <div className={classShowDropdown} >
                <TreeView
                    className={classesTree.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="Calendar" />
                        <TreeItem nodeId="3" label="Chrome" />
                        <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="6" label="Material-UI">
                            <TreeItem nodeId="7" label="src">
                                <TreeItem nodeId="8" label="index.js" />
                                <TreeItem nodeId="9" label="tree-view.js" />
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>
        </div>

    );
}