import db from '../../utils/db';

export default async (req, res) => {
    try {
        const entries = await db.collection('short-url').get();

        const entriesData = entries.docs.map(entry =>{
            console.log('entry id', entry.id)
            return {
                id: entry.id,
            ...entry.data()
            }
        });
        res.status(200).json({ entriesData });
    } catch (e) {
        res.status(400).end();
    }
}
