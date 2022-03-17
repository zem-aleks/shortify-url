import type { NextApiRequest, NextApiResponse } from 'next'
import normalizeUrl from 'normalize-url'

export type LinksPostData = {
  shortifyUrl: string
}

const postLink = (url: string): LinksPostData => {
  const normalizedUrl = normalizeUrl(url)
  return { shortifyUrl: normalizedUrl }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LinksPostData>
) {
  if (req.method === 'POST') {
    return res.status(200).json(postLink(req.body.url))
  }

  return res.status(404)
}
