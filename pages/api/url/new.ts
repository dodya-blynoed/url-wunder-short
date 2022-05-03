import db from '../../../utils/db'

export default async (req, res) => {
    try {
        console.log('data on post', req.body)
        await db.collection('short-url').add({
            ...req.body,
            date: new Date().toISOString(),
        })
        res.status(200).end()
    } catch (e) {
        res.status(400).end()
    }
}
