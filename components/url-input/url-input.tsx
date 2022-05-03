import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useEffect, useState } from 'react'
import TinyURL from 'tinyurl'

import { isUrlValid } from '../../utils/utils'

type Props = {
    initUpdate: () => void
}

export default function UrlInput({ initUpdate }: Props) {
    const [isError, setIsError] = useState(false)
    const [value, setValue] = useState('')
    const handleOnBlur = (ev) => {
        if (!isUrlValid(ev.target.value)) {
            setIsError(true)
        }
    }
    useEffect(() => {
        setValue(undefined)
    }, [])
    const handleOnChange = async (ev) => {
        ev.preventDefault()
        if (!isUrlValid(value)) {
            setIsError(true)
            return
        }
        TinyURL.shorten(value, async function (res, err) {
            if (err) console.error(err)
            await axios
                .post(`/api/url/new`, {
                    originalUrl: value,
                    shortedUrl: res,
                })
                .then(() => {
                    setIsError(false)
                    setValue(undefined)
                })
                .then(() => {
                    initUpdate()
                })
        })
    }
    return (
        <Box component="span" sx={{ p: 2 }}>
            <TextField
                id="standard-helperText"
                label="https://example.com"
                variant="standard"
                error={isError}
                onChange={(val) => setValue(val.target.value)}
                onBlur={(e) => handleOnBlur(e)}
                InputProps={{
                    endAdornment: (
                        <Button size="small" onClick={handleOnChange}>
                            Submit
                        </Button>
                    ),
                }}
            />
        </Box>
    )
}
