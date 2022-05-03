import db from '../../utils/db'

export default async (req, res) => {
    try {
        const { ref } = req.query
        console.log('link plugin', ref)

        if (req.method === 'GET') {
            const doc = await db
                .collection('short-url')
                .where('shortedUrl', '==', ref)
                .get()
                .then((l) => {
                    if (l.empty) res.status(404).end()
                    const newRef = l.docs[0]
                    const newLink = newRef.data().originalUrl

                    res.redirect(newLink)
                    return newRef
                })
                .then((ref) => {
                    db.collection('short-url')
                        .doc(ref.id)
                        .update({
                            // shortedUrl: TINY_URL + req.body.shortedUrl,
                            count: (ref.data().count || 0) + 1,
                        })
                })
                .catch((err) => console.error(err))
        }
    } catch (e) {
        res.status(400).end()
    }
}
