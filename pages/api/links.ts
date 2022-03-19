import type { NextApiRequest, NextApiResponse } from 'next'
import normalizeUrl from 'normalize-url'
import { isWebUri } from 'valid-url'
import {
  createUrl,
  findUrl,
  getLatestUrls,
  increaseUrlRequestCount,
} from '../../services/links'
import { ShortifyUrl } from '../../models/ShortifyUrl'

const postUrl = async (url: string): Promise<ShortifyUrl> => {
  if (!isWebUri(url)) {
    return Promise.reject('URL is not valid')
  }

  const normalizedUrl = normalizeUrl(url)
  const existingUrl = await findUrl(normalizedUrl)

  if (existingUrl) {
    await increaseUrlRequestCount(existingUrl)
    return existingUrl
  }

  return await createUrl(normalizedUrl)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const shortifyUrl = await postUrl(req.body.url)
    return res.status(200).json(shortifyUrl)
  }

  if (req.method === 'GET') {
    const urls = await getLatestUrls(100)
    return res.status(200).json(urls)
  }

  return res.status(404)
}
