import shortid from 'shortid'

import { CONTEXT_ROOT } from './constants'

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

export const getFullShortedLink = (suffix: string): string => {
    const newLink = `${CONTEXT_ROOT}/api/link?ref=${suffix}`
    if (isUrlValid(newLink)) return newLink
}
