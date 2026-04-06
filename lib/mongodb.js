import { MongoClient } from 'mongodb'
const uri = process.env.MONGODB_URI || 'mongodb://root:projectspace%408991@18.61.205.62:27017,18.61.179.153:27017/project_space_8'
let client
let clientPromise
if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise
export default clientPromise
export async function getDb() {
  const c = await clientPromise
  return c.db('project_space_8')
}