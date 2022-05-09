export const CONTEXT_ROOT =
    typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_BASE_URL
        : window.location.origin
export const CONTEXT_ROOT_LINK = `${CONTEXT_ROOT}/api/link?ref=`
