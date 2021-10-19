import React from 'react';
import { useStyles } from './Styles';
import { InputLabel, Select, FormControl, Paper } from '@material-ui/core';

function Selecter({ ...props }) {
    const classes = useStyles()
    const { count, setCount } = props

    const handleChange = (event) => {
        console.log(event.target.value)
        setCount(event.target.value);
    };

    return (
        <FormControl component={Paper} variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-count-native-simple">Count</InputLabel>
            <Select
                native
                label="Count"
                className={classes.selectEmpty}
                value={count}
                onChange={handleChange}
            >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(c =>
                    <option value={c}>{c}</option>
                )}
            </Select>
        </FormControl>
    )
}

export default Selecter
