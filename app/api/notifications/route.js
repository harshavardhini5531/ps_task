import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDb()
    const notifs = await db.collection('task_notifications').find({}).sort({ createdAt: -1 }).limit(50).toArray()
    return NextResponse.json(notifs)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const db = await getDb()
    const body = await req.json()
    const notif = { ...body, createdAt: new Date(), read: false }
    await db.collection('task_notifications').insertOne(notif)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}