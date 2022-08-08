import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../../../redux/slice/visualSortingSlice';
import {
    makeStyles,
    MenuItem,
    TextField
} from '@material-ui/core';
import styles from './vsSelect.module.css';

interface VSSelectProps {
    label: string;
    options: string[];
    disable: boolean;
}

const useStyles = makeStyles({
    root: {
        width: 200,
        "& .MuiOutlinedInput-input": {
            color: "#FFCB00"
        },
        "& .MuiInputLabel-root": {
            color: "#FFCB00"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFCB00"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#FFCB00"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#FFCB00"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFCB00"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#FFCB00"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#FFCB00"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFCB00"
        },
        "& .MuiSelect-icon": {
            color: "#FFCB00"
        }
    }
})

function VSSelect ({ label, options, disable }: VSSelectProps) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = evt.target;
        setValue(value);
        dispatch(setSortType(value));
    }

    return (
        <>
            <TextField
                className={classes.root}
                value={value}
                onChange={(evt) => {handleChange(evt)}}
                variant="outlined"
                label={label}
                select
                disabled={disable}
            >
                {
                    options.map((option, idx) => {
                        return (
                            <MenuItem value={option} key={idx}>{option}</MenuItem>
                        )
                    })
                }
            </TextField>
        </>
    )
}
export default VSSelect;