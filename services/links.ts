import { WithId } from 'mongodb'
import { ShortifyUrl } from '../models/ShortifyUrl'
import { getDb } from '../database/mongodb'
import { nanoid } from 'nanoid'

export const increaseUrlRequestCount = async (
  shortifyUrl: WithId<ShortifyUrl>
) => {
  const database = await getDb()
  return database.collection<ShortifyUrl>('links').updateOne(
    { _id: shortifyUrl._id },
    {
      $set: {
        creationRequestsCount: shortifyUrl.creationRequestsCount + 1,
      },
    }
  )
}

export const increaseUrlVisitsCount = async (
  shortifyUrl: WithId<ShortifyUrl>
) => {
  const database = await getDb()
  return database.collection<ShortifyUrl>('links').updateOne(
    { _id: shortifyUrl._id },
    {
      $set: {
        visitsCount: shortifyUrl.visitsCount + 1,
      },
    }
  )
}

export const findUrl = async (
  url: string
): Promise<WithId<ShortifyUrl> | null> => {
  const database = await getDb()
  return database.collection<ShortifyUrl>('links').findOne({ url: url })
}

export const findUrlByCode = async (
  code: string
): Promise<WithId<ShortifyUrl> | null> => {
  const database = await getDb()
  return database.collection<ShortifyUrl>('links').findOne({ code: code })
}

export const createUrl = async (url: string): Promise<ShortifyUrl> => {
  const database = await getDb()
  const newUrl: ShortifyUrl = {
    url,
    code: nanoid(8),
    creationRequestsCount: 1,
    visitsCount: 0,
    createdAt: new Date(),
  }
  await database.collection<ShortifyUrl>('links').insertOne(newUrl)
  return newUrl
}

export const getLatestUrls = async (
  limit: number
): Promise<WithId<ShortifyUrl>[]> => {
  const database = await getDb()
  return database
    .collection<ShortifyUrl>('links')
    .find()
    .limit(limit)
    .sort({ createdAt: -1 })
    .toArray()
}
