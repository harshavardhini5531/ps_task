import { getDb } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDb()
    const notifs = await db.collection('task_notifications').find({}).sort({ createdAt: -1 }).limit(50).toArray()
    return NextResponse.json(notifs)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { id } = await request.json()
    const db = await getDb()
    await db.collection('task_notifications').updateOne({ _id: new ObjectId(id) }, { $set: { read: true } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}