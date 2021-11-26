import React from 'react'
import SearchBar from "material-ui-search-bar";
import { useStyles } from './Styles'

function Searchbar({ ...props }) {
    const { text, setText, setData } = props
    const classes = useStyles();

    const handleCancel = () => {
        setText("")
        setData(null)
    }

    return (
        <div className={classes.searchbarWrapper}>
            <SearchBar
                value={text}
                placeholder="Enter keyword here..."
                onChange={(newValue) => setText(newValue)}
                onCancelSearch={handleCancel}
            />
        </div>
    )
}

export default Searchbar
