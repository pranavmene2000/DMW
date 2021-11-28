import React from 'react';
import { useStyles } from './Styles';
import { InputLabel, Select, FormControl, Paper } from '@material-ui/core';

function Selecter({ ...props }) {
    const classes = useStyles()
    const { count, setCount } = props

    const handleChange = (event) => {
        setCount(event.target.value);
    };

    return (
        <FormControl component={Paper} variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-count-native-simple">Count</InputLabel>
            <Select
                native
                label="Count"
                className={classes.selectEmpty}
                inputProps={{ "data-testid": "select" }}
                value={count}
                onChange={handleChange}
            >
                {[10, 100, 200, 500, 1000, 1500].map((c, i) => (
                    <option data-testid="select-option" key={i} value={c}>{c}</option>
                ))}

            </Select>
        </FormControl>
    )
}

export default Selecter
