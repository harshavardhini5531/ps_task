import { getDb } from '@/lib/mongodb'
import { sendTaskNotification } from '@/lib/mailer'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const db = await getDb()
    const { action } = body

    if (action === 'assign-responsible') {
      await db.collection('task_items').updateOne(
        { _id: new ObjectId(id) },
        { $set: { responsible: { name: body.name, email: body.email } } }
      )
      await db.collection('task_notifications').insertOne({ message: `${body.name} assigned as responsible for "${body.taskTitle}"`, type: 'assign', read: false, createdAt: new Date() })
      await sendTaskNotification(body.email, body.name, body.taskTitle, 'responsible')
    }

    if (action === 'add-team') {
      await db.collection('task_items').updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { teamMembers: { name: body.name, email: body.email } } }
      )
      await db.collection('task_notifications').insertOne({ message: `${body.name} added to "${body.taskTitle}" team`, type: 'team', read: false, createdAt: new Date() })
      await sendTaskNotification(body.email, body.name, body.taskTitle, 'team')
    }

    if (action === 'remove-team') {
      await db.collection('task_items').updateOne({ _id: new ObjectId(id) }, { $pull: { teamMembers: { email: body.email } } })
    }

    if (action === 'add-stage') {
      await db.collection('task_items').updateOne({ _id: new ObjectId(id) }, { $push: { stages: { title: body.title, status: 'pending', comment: '', proof: null } } })
    }

    if (action === 'edit-stage') {
      await db.collection('task_items').updateOne({ _id: new ObjectId(id), 'stages.title': body.oldTitle }, { $set: { 'stages.$.title': body.newTitle } })
    }

    if (action === 'delete-stage') {
      await db.collection('task_items').updateOne({ _id: new ObjectId(id) }, { $pull: { stages: { title: body.title } } })
    }

    if (action === 'complete-stage') {
      await db.collection('task_items').updateOne({ _id: new ObjectId(id), 'stages.title': body.title }, { $set: { 'stages.$.status': 'done', 'stages.$.comment': body.comment || '', 'stages.$.proof': body.proof || null, 'stages.$.completedAt': new Date() } })
      await db.collection('task_notifications').insertOne({ message: `"${body.title}" completed in "${body.taskTitle}"`, type: 'complete', read: false, createdAt: new Date() })
    }

    const task = await db.collection('task_items').findOne({ _id: new ObjectId(id) })
    return NextResponse.json(task)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}