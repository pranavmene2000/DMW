import { Button } from '@material-ui/core'
import React from 'react'

function ButtonBase({ ...props }) {
    const {
        text,
        textTransform
    } = props

    return (
        <Button
            {...props}
            disableElevation={true}
            disableFocusRipple={true}
            disableRipple={true}
            style={{ textTransform }}
        >
            {text}
        </Button>
    )
}

export default ButtonBase
