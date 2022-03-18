import { Db, MongoClient } from 'mongodb'

// declare _mongoConnection variable on the global level
declare global {
  var _mongoConnection: Promise<MongoClient> | undefined
}

export const connect = (): Promise<MongoClient> => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Connection is not established because of a wrong configuration'
    )
  }

  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (process.env.NODE_ENV === 'development' && global._mongoConnection) {
    return global._mongoConnection
  }

  const client = new MongoClient(process.env.MONGODB_URI)
  const connection = client.connect()
  global._mongoConnection = connection
  return connection
}

export const getDb = async (): Promise<Db> => {
  const connection = await connect()
  return connection.db()
}
