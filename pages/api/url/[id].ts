import db from '../../../utils/db'

export default async (req, res) => {
    const { id } = req.query
    console.log('req.body', req.body)

    try {
        if (req.method === 'POST') {
            console.log('data on post', req.body)
            await db.collection('short-url').add({
                ...req.body,
                date: new Date().toISOString(),
            })
        }
        if (req.method === 'PUT') {
            await db.collection('short-url').doc(id).update({
                // shortedUrl: TINY_URL + req.body.shortedUrl,
                updated: new Date().toISOString(),
            })
        } else if (req.method === 'GET') {
            const doc = await db.collection('short-url').doc(id).get()
            if (!doc.exists) {
                res.status(404).end()
            } else {
                res.status(200).json(doc.data())
            }
        } else if (req.method === 'DELETE') {
            await db.collection('short-url').doc(id).delete()
        }
        res.status(200).end()
    } catch (e) {
        res.status(400).end()
    }
}
