import { getDb } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  try {
    const db = await getDb()
    const { id } = await params
    const body = await req.json()
    const update = { ...body, updatedAt: new Date() }
    delete update._id
    await db.collection('task_items').updateOne({ _id: new ObjectId(id) }, { $set: update })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const db = await getDb()
    const { id } = await params
    await db.collection('task_items').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}