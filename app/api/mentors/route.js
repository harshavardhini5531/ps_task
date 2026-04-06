import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDb()
    const mentors = await db.collection('task_mentors').find({}).project({ passwordHash: 0 }).toArray()
    return NextResponse.json(mentors)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch mentors' }, { status: 500 })
  }
}