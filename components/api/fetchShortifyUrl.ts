import validUrl from 'valid-url'
import axios from 'axios'
import { ShortifyUrl } from '../../models/ShortifyUrl'

type Props = {
  url: string
}

export const fetchShortifyUrl = ({ url }: Props): Promise<ShortifyUrl> => {
  if (!validUrl.isWebUri(url)) {
    return Promise.reject(new Error('Not valid URL'))
  }

  return axios
    .post<ShortifyUrl>('/api/links', { url })
    .then((response) => response.data)
}
