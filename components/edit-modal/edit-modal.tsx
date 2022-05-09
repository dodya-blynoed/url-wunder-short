import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { UrlItem } from '../../types/url-type'
import { CONTEXT_ROOT_LINK } from '../../utils/constants'

type Props = {
    open: boolean
    item?: UrlItem
    onClose: () => void
    onSubmit: () => void
}

export default function EditModal({ open, item, onClose, onSubmit }: Props) {
    const [value, setValue] = useState('')
    const handleSave = async () => {
        console.log('item', value)

        await axios.put(`/api/url/${item.id}`, {
            shortedUrl: value,
        })
        onSubmit()
        onClose()
    }
    useEffect(() => {
        setValue(item?.shortedUrl)
    }, [item])
    return (
        <Dialog open={open}>
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
                                {CONTEXT_ROOT_LINK}
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
