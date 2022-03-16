import validUrl from 'valid-url'

type Props = {
  url: string
}

type Data = { shortifyUrl: string }

export const fetchShortifyUrl = ({ url }: Props): Promise<Data> => {
  if (!validUrl.isWebUri(url)) {
    return Promise.reject(new Error('Not valid URL'))
  }

  return Promise.resolve({
    shortifyUrl: url,
  })
}
