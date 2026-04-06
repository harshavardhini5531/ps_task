import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await getDb()
    const tasks = await db.collection('task_items').find({}).sort({ order: 1 }).toArray()
    return NextResponse.json(tasks)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const db = await getDb()
    const body = await req.json()
    const count = await db.collection('task_items').countDocuments()
    const task = {
      title: body.title,
      stages: body.stages || [],
      responsible: body.responsible || null,
      teamMembers: body.teamMembers || [],
      order: count + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await db.collection('task_items').insertOne(task)
    return NextResponse.json({ ...task, _id: result.insertedId })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}