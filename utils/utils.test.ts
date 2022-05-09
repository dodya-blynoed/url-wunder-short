import { getFullShortedLink, isUrlValid } from './utils'

test('should return valid url', () => {
    expect(isUrlValid('/')).toEqual(false)
})

test('should return invalid url', () => {
    expect(isUrlValid('//')).toEqual(false)
})

test('should return valid shorted link', () => {
    expect(getFullShortedLink('abc')).toEqual(
        'http://localhost/api/link?ref=abc',
    )
})
