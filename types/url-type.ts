export type UrlItem = {
    id: string
    description?: string
    originalUrl: string
    shortedUrl?: string
    stat?: [{ date: string; count: number }]
}
