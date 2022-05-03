import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { createShortedUrl, isUrlValid } from '../../utils/utils'

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
        createShortedUrl()
            .then((res) => {
                console.log('url from ', value, ' to ', res)
                axios
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
            .catch((err) => console.error('Error while creating new link'))
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
                        <Button
                            size="small"
                            onClick={handleOnChange}
                            variant="outlined"
                        >
                            Submit
                        </Button>
                    ),
                }}
            />
        </Box>
    )
}
