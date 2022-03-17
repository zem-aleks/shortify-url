import validUrl from 'valid-url'
import axios from 'axios'
import { LinksPostData } from '../../pages/api/links'

type Props = {
  url: string
}

export const fetchShortifyUrl = ({ url }: Props): Promise<LinksPostData> => {
  if (!validUrl.isWebUri(url)) {
    return Promise.reject(new Error('Not valid URL'))
  }

  return axios
    .post<LinksPostData>('/api/links', { url })
    .then((response) => response.data)
}
