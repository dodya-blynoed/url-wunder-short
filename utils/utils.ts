export const isUrlValid = (url: string) => {
    try {
        return Boolean(new URL(url))
    } catch (e) {
        return false
    }
}
