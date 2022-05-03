import shortid from 'shortid'

export const isUrlValid = (url: string) => {
    try {
        return Boolean(new URL(url))
    } catch (e) {
        return false
    }
}

export const createShortedUrl = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(shortid.generate())
        } catch (e) {
            reject(e)
        }
    })
}
