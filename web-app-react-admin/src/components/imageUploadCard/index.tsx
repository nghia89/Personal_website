// imports the React Javascript Library
import React, { useState, useEffect } from "react";

import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";


import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";



// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//Tabs
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { apiUploadFile } from '@/apis/index';
import { useNotification } from '@/components/index'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            margin: theme.spacing(1)
        },
        iconHover: {
            margin: theme.spacing(1),
            "&:hover": {
                color: red[800]
            }
        },
        cardHeader: {
            textalign: "center",
            align: "center",
            backgroundColor: "white"
        },
        input: {
            display: "none"
        },
        title: {
            color: blue[800],
            fontWeight: "bold",
            fontFamily: "Montserrat",
            align: "center"
        },
        button: {
            color: blue[900],
            margin: 10
        },
        secondaryButton: {
            color: "gray",
            margin: 10
        },
        typography: {
            margin: theme.spacing(1),
            backgroundColor: "default"
        },

        searchRoot: {
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400
        },
        searchInput: {
            marginLeft: 8,
            flex: 1
        },
        searchIconButton: {
            padding: 10
        },
        searchDivider: {
            width: 1,
            height: 28,
            margin: 4
        }
    }),
);

interface IProps {
    isMultiple?: boolean,
    handleUpload: Function,
    isHidenInputUrl?: boolean,
    style?: any
}

let isFirst = false;
function ImageUploadCard(props: IProps) {
    let dispatch = useNotification();
    const classes = useStyles();
    const [mainState, setMainState] = useState<String>("initial")
    const [isLoadingUploaded, setIsLoadingUploaded] = useState<Boolean>(false)
    const [selectedFile, setSelectedFile] = useState<string>()

    useEffect(() => {
        if (isFirst) {
            if (!isLoadingUploaded && selectedFile) {
                isFirst = false;
                props.handleUpload(isLoadingUploaded, selectedFile)
            }
            else if (isLoadingUploaded) props.handleUpload(isLoadingUploaded, null)
        }
        isFirst = true;
    }, [isLoadingUploaded, selectedFile])

    async function handleUploadClick(event) {
        setIsLoadingUploaded(true)
        const formData = new FormData();
        const { files: newFiles } = event.target;
        if (props.isMultiple)
            newFiles.forEach(element => {
                formData.append('File', element);
            });
        else formData.append('File', newFiles[0]);

        await apiUploadFile.UploadImage(formData).then((rsp) => {
            if (!rsp.isError) {
                dispatch('SUCCESS', 'Thêm ảnh thành công.')
                if (props.isMultiple)
                    setSelectedFile(rsp.data)
                else
                    setSelectedFile(rsp.data[0]?.path)
                setIsLoadingUploaded(false)
            }
        })

    };

    function handleSearchClick() {
        setMainState("search");
    };

    function renderInitialState() {
        return (
            <React.Fragment>
                <CardContent>
                    <Grid style={props.style} container justify="center" alignItems="center">
                        <input
                            accept="all"
                            className={classes.input}
                            id="contained-button-file"
                            multiple={props.isMultiple}
                            type="file"
                            onChange={handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                        {!props.isHidenInputUrl && <Fab className={classes.button} onClick={handleSearchClick}>
                            <SearchIcon />
                        </Fab>}

                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }


    function handleImageSearch(value) {
        setSelectedFile(value)
    }

    function handleSeachClose() {
        setMainState("initial")
        setSelectedFile('')
    };

    function renderSearchState() {
        return (
            <Paper className={classes.searchRoot} elevation={1}>
                <InputBase onChange={(e) => handleImageSearch(e.target.value)} className={classes.searchInput} placeholder="Image URL" />
                {/* <IconButton
                    className={classes.button}
                    aria-label="Search"
                    onClick={handleImageSearch}
                >
                    <SearchIcon />
                </IconButton> */}
                <Divider className={classes.searchDivider} />
                <IconButton
                    color="primary"
                    className={classes.secondaryButton}
                    aria-label="Close"
                    onClick={handleSeachClose}
                >
                    <CloseIcon />
                </IconButton>
            </Paper>
        );
    }

    return (
        <React.Fragment>
            {mainState === "initial" && renderInitialState()}
            {mainState === "search" && renderSearchState()}
        </React.Fragment>
    );
}

export default ImageUploadCard;
