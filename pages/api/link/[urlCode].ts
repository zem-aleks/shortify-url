import type { NextApiRequest, NextApiResponse } from 'next'
import { findUrlByCode, increaseUrlVisitsCount } from '../../../services/links'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { urlCode } = req.query

  if (urlCode && req.method === 'GET') {
    const shortifyUrl = await findUrlByCode(urlCode as string)
    if (shortifyUrl) {
      await increaseUrlVisitsCount(shortifyUrl)
      const { _id, ...data } = shortifyUrl
      return res.status(200).json(data)
    }
  }

  return res.status(404)
}
