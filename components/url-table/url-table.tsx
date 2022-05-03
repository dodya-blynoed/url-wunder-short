import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { UrlItem } from '../../types/url-type'
import { getFullShortedLink } from '../../utils/utils'
import EditModal from '../edit-modal/edit-modal'

type Props = {
    urls: UrlItem[]
    initUpdate: () => void
}

export default function UrlTable({ urls, initUpdate }: Props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [item, setItem] = useState(undefined)
    const [hasCopied, setHasCopied] = useState(false)
    const handleEdit = (row: UrlItem) => {
        setItem(row)
        setIsEditModalOpen(true)
    }
    const handleDelete = async (row: UrlItem) => {
        console.log(row)
        const res = await axios.delete(`/api/url/${row.id}`)
        console.log(res)
        initUpdate()
    }
    const handleCancelEdit = () => {
        setIsEditModalOpen(false)
        setItem(undefined)
    }
    return (
        <>
            <EditModal
                open={isEditModalOpen}
                item={item}
                onClose={handleCancelEdit}
                onSubmit={initUpdate}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Original URL</TableCell>
                        <TableCell align="right">Shortened URL</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Show statistics</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {urls.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell
                                align="right"
                                sx={{ maxWidth: 400, wordBreak: 'break-all' }}
                            >
                                {row.originalUrl}
                            </TableCell>
                            <TableCell align="right">
                                <CopyToClipboard
                                    text={row.shortedUrl}
                                    onCopy={() => {
                                        setHasCopied(true)
                                        setTimeout(() => {
                                            setHasCopied(false)
                                        }, 2000)
                                    }}
                                >
                                    <>
                                        <Link
                                            href={getFullShortedLink(
                                                row.shortedUrl,
                                            )}
                                        >
                                            {getFullShortedLink(row.shortedUrl)}
                                        </Link>
                                        <Button
                                            size="small"
                                            variant="contained"
                                        >
                                            {hasCopied ? 'Copied' : 'Copy'}
                                        </Button>
                                    </>
                                </CopyToClipboard>
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    size="small"
                                    onClick={() => handleEdit(row)}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <Link href={`/stat/${row.id}`}>
                                    <Button
                                        size="small"
                                        href={`/stat/${row.id}`}
                                    >
                                        Stat
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    size="small"
                                    onClick={() => handleDelete(row)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
