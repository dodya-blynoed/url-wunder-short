import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import {UrlItem} from "../../types/url-type";
import Link from 'next/link'

type Props = {
    urls: UrlItem[];
}
export default function UrlTable ({urls}: Props) {
    const handleEdit = (row: UrlItem) => console.log(row)
    const handleDelete = (row: UrlItem) => console.log(row)
    return (
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
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.originalUrl}</TableCell>
                        <TableCell align="right">{row.shortedUrl}</TableCell>
                        <TableCell align="right">
                            <Button size="small" onClick={() => handleEdit(row)}>Edit</Button>
                        </TableCell>
                        <TableCell align="right">
                            <Link href={`/stat/${row.id}`}>
                                <Button size="small" href={`/stat/${row.id}`}>Stat</Button>
                            </Link>
                        </TableCell>
                        <TableCell align="right">
                            <Link href={`/stat/${row.id}`}>
                                <Button size="small" onClick={() => handleDelete(row)}>Delete</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
