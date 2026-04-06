import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDb()
    const mentors = await db.collection('task_mentors').find({}).sort({ name: 1 }).toArray()
    return NextResponse.json(mentors)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}