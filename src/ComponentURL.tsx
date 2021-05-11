import React from "react";
import {
    Avatar,
    Button,
    CircularProgress,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {ComponentURLElem, Loading} from "./Models";
import {green, pink} from "@material-ui/core/colors";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {getRandomInt} from "./lib";

interface ComponentProps {
    componentKey: string,
    componentData: ComponentURLElem,
    setURL: (url: string) => void,
    setLoading: (loading: Loading) => void,
}

const useStyles = makeStyles((theme: Theme) => {
        return createStyles({
            pink: {
                color: theme.palette.getContrastText(pink[500]),
                backgroundColor: pink[500],
            },
            green: {
                color: '#fff',
                backgroundColor: green[500],
            },
        });
    },
);

export const ComponentURL = (props: ComponentProps) => {
    const {componentKey, componentData, setURL, setLoading} = props;
    const classes = useStyles();

    const getUrlWithTimeOut = async () => {
        setLoading("loading");
        const res = getRandomInt(2);
        await setTimeout(() => {
            res ? setLoading("success") : setLoading("fail");
            console.log("request url:", componentData?.url);
        }, getRandomInt(4) * 1000)
    }

    return (<Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
            <Typography variant="body1">{`Загрузка по URL №${componentKey}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <TextField
                variant="standard"
                label="Введите URL запроса"
                fullWidth
                value={componentData ? componentData.url : ''}
                onChange={(e) => setURL(e.target.value)}/>
        </Grid>
        <Grid item xs={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={getUrlWithTimeOut}
                disabled={!componentData || componentData.loading === "loading" || !(componentData.url.length !== 0)}>
                Получить
            </Button>
        </Grid>
        <Grid item xs={1}>
            {componentData?.loading === "loading" && <CircularProgress color="primary"/>}
            {componentData?.loading === "success" && <Avatar className={classes.green}><DoneIcon/></Avatar>}
            {componentData?.loading === "fail" && <Avatar className={classes.pink}><CloseIcon/></Avatar>}
        </Grid>
    </Grid>)
}
