import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { UrlItem } from '../../types/url-type'
import { CONTEXT_ROOT } from '../../utils/constants'

type Props = {
    open: boolean
    item?: UrlItem
    onClose: () => void
    onSubmit: () => void
}

export default function EditModal({ open, item, onClose, onSubmit }: Props) {
    const [value, setValue] = useState('')
    const handleSave = async () => {
        // TinyURL.
        await axios.put(`/api/url/${item.id}`, {
            shortedUrl: value,
        })
        onSubmit()
        onClose()
    }
    console.log('CONTEXT_ROOT', CONTEXT_ROOT)
    useEffect(() => {
        setValue(item?.shortedUrl.split(CONTEXT_ROOT)[1])
    }, [item])
    return (
        <Dialog open={open}>
            <DialogTitle>Edit URL</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To edit shortened link put new value below:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Change shortened URL address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {CONTEXT_ROOT}
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
