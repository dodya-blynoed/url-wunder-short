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
                .then(async (ref) => {
                    const item = db.collection('short-url').doc(ref.id)
                    const date = new Date().toDateString()

                    if (!ref.data().stat) {
                        console.log('create new stat', ref.data())
                        item.update({
                            stat: [],
                        })
                    }

                    await db
                        .collection('short-url')
                        .doc(ref.id)
                        .get()
                        .then((i) => {
                            const stat = i.data().stat
                            console.log('stat', stat)
                            console.log('i.data', i.data())
                            const dateItem = stat.find((u) => u.date === date)
                            let newStat = []
                            if (dateItem) {
                                newStat = stat.map((o) => {
                                    if (o.date === date) {
                                        return {
                                            count: o.count + 1,
                                            date,
                                        }
                                    }
                                    return o
                                })
                            } else {
                                newStat.push({
                                    date,
                                    count: 1,
                                })
                            }
                            item.update({
                                stat: newStat,
                            })
                        })
                })
                .catch((err) => console.error(err))
        }
    } catch (e) {
        res.status(400).end()
    }
}
