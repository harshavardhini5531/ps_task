import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

const STAGE_MAP = {
  "welcome kit":["Content Finalization","Vendor Selection","Order Placement","Quality Inspection","Kit Assembly","Labeling & Packing","Distribution Ready"],
  hostel:["Room Allocation Plan","Amenities Setup","Check-in Desk","Signage Placement","Final Walkthrough"],
  guest:["Guest List Confirmation","Travel Coordination","Hospitality Briefing","Welcome & Reception","Feedback Collection"],
  poster:["Content Brief","Concept Drafts","Review & Revisions","Final Approval","Print-Ready Export","Printing","Delivery"],
  brochure:["Content Brief","Concept Drafts","Review & Revisions","Final Approval","Print-Ready Export","Printing","Delivery"],
  design:["Requirement Gathering","Concept Drafts","Internal Review","Revisions","Final Approval","Production"],
  "visitor pass":["Template Design","QR/Security Features","Approval","Bulk Printing","Distribution Setup"],
  certificate:["Template Design","Name List Compilation","Data Merge & Proof","Test Print","Bulk Printing","Quality Check","Sorting & Filing"],
  "foam board":["Content Planning","Layout Design","Review","Printing","Mounting","Installation"],
  "title card":["Layout Design","Review & Approval","Printing","Distribution"],
  folder:["Cover Design","Content Plan","Print & Assembly","Distribution Ready"],
  invitation:["Theme Selection","Draft Design","Review","Digital Distribution","Print Copies"],
  letter:["Template Creation","Data Collection","Generation","Review","Printing","Signatures","Distribution"],
  payment:["Gateway/Portal Setup","Development","Testing","Security Audit","Go Live","Tracking"],
  "project street":["Layout Planning","Stall Construction","Power & Internet","Signage & Decoration","Project Placement","Final Walkthrough"],
  snack:["Menu Planning","Vendor Finalization","Quantity Estimation","Order Placement","Serving Setup","Service Management"],
  beverage:["Menu Planning","Vendor Finalization","Quantity Estimation","Order Placement","Serving Setup","Service Management"],
  gift:["Gift Selection","Vendor & Pricing","Order Placement","Quality Check","Wrapping & Labeling","Distribution Plan"],
  "live stream":["Equipment Check","Camera & Mic Setup","Platform Config","Network Test","Dry Run","Go Live","Recording Backup"],
  streaming:["Equipment Check","Camera & Mic Setup","Platform Config","Network Test","Dry Run","Go Live","Recording Backup"],
  review:["Schedule Creation","Panel Assignment","Evaluation Criteria","Venue Setup","Execution","Score Compilation","Results"],
  "control room":["Room Setup","Monitor Config","Communication System","Testing","Event Day Operation"],
  attendance:["System Setup","Volunteer Briefing","Collection Process","Compilation & Report"],
  discipline:["Rules & Guidelines","Volunteer Deployment","Active Monitoring","Issue Resolution","Report"],
  "id card":["Material Selection","Layout Design","Data Collection","Card Generation","Printing","Lanyard Attachment"],
  "t-shirt":["Design Finalization","Size Collection","Vendor Selection","Order Placement","Quality Check","Sorting","Distribution"],
  "social media":["Content Calendar","Pre-event Posts","Teaser Content","Live Coverage","Post-event Highlights","Analytics"],
  led:["Screen Arrangement","Content Preparation","Installation","Testing","Event Day Management"],
  sound:["Equipment Listing","Vendor/Rental","Installation","Sound Check","Event Day Operation"],
  dinner:["Menu Selection","Caterer Finalization","Headcount","Venue Setup","Service Management"],
  lighting:["Lighting Plan","Equipment Sourcing","Installation","Testing","Event Day"],
  "event planning":["Master Schedule","Venue Layout","Volunteer Assignment","Dry Run","Execution","Debrief"],
  "water bottle":["Quantity Estimation","Procurement","Distribution Points","Refill Management"],
  umbrella:["Quantity Estimation","Procurement","Distribution Points","Collection"],
  scavenger:["Challenge Design","Clue Creation","Placement","Rules & Briefing","Execution","Winner Announcement"],
  freshener:["Product Selection","Procurement","Placement","Refill Check"],
  internet:["Bandwidth Assessment","ISP Coordination","Router Setup","Testing","Monitoring"],
  "soft drink":["Selection & Quantity","Procurement","Storage","Serving Setup","Refill"],
  "night stay":["Mentor Roster","Room Assignment","Emergency Protocol","Shift Schedule"],
  expo:["Assignment","Schedule","Evaluation Forms","Setup","Execution","Results"],
  stats:["Dashboard Design","Data Integration","Display Setup","Testing","Monitoring"],
}

function detectStages(title) {
  const t = title.toLowerCase()
  for (const [key, stages] of Object.entries(STAGE_MAP)) {
    if (t.includes(key)) return stages.map(s => ({ title: s, status: 'pending', comment: '', proof: null }))
  }
  return ['Planning & Requirement','Resource Allocation','Execution','Review & QC','Completion & Handover'].map(s => ({ title: s, status: 'pending', comment: '', proof: null }))
}

export async function GET() {
  try {
    const db = await getDb()
    const tasks = await db.collection('task_items').find({}).sort({ order: 1, createdAt: 1 }).toArray()
    return NextResponse.json(tasks)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json()
    const db = await getDb()
    const count = await db.collection('task_items').countDocuments()
    const task = { title, stages: detectStages(title), responsible: null, teamMembers: [], order: count, createdAt: new Date() }
    const result = await db.collection('task_items').insertOne(task)
    task._id = result.insertedId
    return NextResponse.json(task)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}