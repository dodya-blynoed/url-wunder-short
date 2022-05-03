import db from '../../../utils/db'

export default async (req, res) => {
    try {
        const { slug } = req.body
        const entries = await db.collection('short-url').get()
        const entriesData = entries.docs.map((entry) => {
            return entry.data()
        })

        if (entriesData.some((entry) => entry.slug === slug)) {
            res.status(400).end()
        } else {
            const { id } = await db.collection('short-url').add({
                ...req.body,
                created: new Date().toISOString(),
            })
            res.status(200).json({ id })
        }
    } catch (e) {
        res.status(400).end()
    }
}
