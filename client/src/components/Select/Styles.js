
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2, 0, 2, 0),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}))