import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

const MENTORS = [
  { name: "Neelam V.S. Murthy (Babji)", email: "babji@aec.edu.in" },
  { name: "MD Shaifu Zama", email: "shaify@aec.edu.in" },
  { name: "Kedharasetti Prasanth", email: "kprasanth@aec.edu.in" },
  { name: "Lutukurthi Sathish", email: "sathishl@adityauniversity.in" },
  { name: "Maranala Ashok", email: "ashokm@adityauniversity.in" },
  { name: "Bhallamudi Pavan", email: "pavanb@adityauniversity.in" },
  { name: "Pamarthi V.B. Bobby", email: "bobypamarthi@adityauniversity.in" },
  { name: "Madiki Bobby Kiran", email: "bobbykiran.madiki@adityauniversity.in" },
  { name: "Mulakala V.S. Saikumar", email: "mvssaikumar@adityauniversity.in" },
  { name: "Kundrapu Mutyala Babu", email: "mutyalababu.k@adityauniversity.in" },
  { name: "Surampudi Ganapathi", email: "ganapathisurampudi@adityauniversity.in" },
  { name: "Pasagadi T. Rambabu", email: "rambabutirumala@adityauniversity.in" },
  { name: "Suravarapu Satish", email: "satish.s@adityauniversity.in" },
  { name: "Chollangi Krishnarjuna", email: "krishnarjunac@adityauniversity.in" },
  { name: "Varri Girish", email: "girishv@adityauniversity.in" },
  { name: "Ganapathi Durga Sai Prasad", email: "durgasaiprasad@adityauniversity.in" },
  { name: "Yenuganti V. Vasantharao", email: "vasanthyenuganti@adityauniversity.in" },
  { name: "Buddha Hanumanthu", email: "hanumanthubuddha@aec.edu.in" },
  { name: "Girajala N. Kishore", email: "kishore.g@adityauniversity.in" },
  { name: "Bandaru Venkata Krishna", email: "bvkrishna@aec.edu.in" },
  { name: "Jakke Harshavardhini", email: "harshavardhini.j@adityauniversity.in" },
  { name: "Vegi Divya Jaswanthi", email: "divyajaswanthiv@aec.edu.in" },
  { name: "Kaki Nanda Kumar", email: "nandakumark@adityauniversity.in" },
  { name: "Sangineedi Saikala", email: "saikalas@adityauniversoty.in" },
  { name: "Setti Durga Prasad", email: "durgaprasad.setti@aec.edu.in" },
  { name: "Penke S.R.K.V. Prasad", email: "psrkvprasad@adityauniversity.in" },
  { name: "Munjuluri Madhu Kumar", email: "madhukumar.m@adityauniversity.in" },
  { name: "Ponuku Anil", email: "anilp@adityauniversity.in" },
  { name: "Pilli Srilekha", email: "srilekha.p@adityauniversity.in" },
  { name: "Torati Veerababu", email: "veerababu.torati@adityauniversity.in" },
  { name: "Pratti Naveen Kumar", email: "naveenkumarp@adityauniversity.in" },
  { name: "Rayi Sampath", email: "sampath.r@aec.edu.in" },
  { name: "Jalem Mounika", email: "mounikaj@adityauniversity.in" },
  { name: "Pennada Manikanta Swamy", email: "manikanta.p@adityauniversity.in" },
  { name: "Kandula Baskar Rao", email: "baskarraok@adityauniversity.in" },
  { name: "Pokanati Gangababu", email: "gangababu.p@adityauniversity.in" },
  { name: "Nammi Anitha", email: "anithan@adityauniversity.in" },
  { name: "Jami V.S. Gangadhar", email: "gangadhar.j@adityauniversity.in" },
  { name: "Anala Abhilash", email: "abhilash.a@adityauniversity.in" },
  { name: "Chelluboyena Seeta Mahalakshmi", email: "seetamahalakshmic@adityauniversity.in" },
  { name: "Test - PowerBI", email: "powerbi@technicalhub.io" },
  { name: "Test - Harshavardhini", email: "harshavardhini@technicalhub.io" },
]

const TASKS_ORDERED = [
  "Welcome Kit","Boys Hostel","Girls Hostel","Guests Responsibility",
  "Poster & Brochure Design","Visitor Pass Design","Certificates Printing",
  "Foam Boards","Title Cards Design","Folders","Invitation Designs",
  "Internship Letters","Participation Letters","Visitor Pass Distribution",
  "Visitors Payment Portal","Skillup Payment","Project Street Setup",
  "Certificates Segregation & Filing","Snacks & Beverages","Gifts Arrangement",
  "Live Streaming Setup","Project Reviews","CC Control Room",
  "Attendance Management","Discipline Management","Night Stay Mentors",
  "ID Cards Production","T-Shirts Order (900 units)","Social Media Management",
  "Project Stats & CC Display","LED Display Setup","Sound System Setup",
  "Dinner Coordination","Lighting Arrangement","Event Planning & Execution",
  "Water Bottles & Umbrellas","Scavenger Hunt Coordination",
  "Room Freshener Arrangement","Internet Setup","Soft Drinks Arrangement",
  "Mentor Project Expo",
]

const STAGE_MAP = {
  "welcome kit":["Content Finalization","Vendor Selection","Order Placement","Quality Inspection","Kit Assembly","Labeling & Packing","Distribution Ready"],
  hostel:["Room Allocation Plan","Amenities Setup","Check-in Desk","Signage Placement","Final Walkthrough"],
  guest:["Guest List Confirmation","Travel Coordination","Hospitality Briefing","Welcome & Reception","Feedback Collection"],
  poster:["Content Brief","Concept Drafts","Review & Revisions","Final Approval","Print-Ready Export","Printing","Delivery"],
  "visitor pass design":["Template Design","Data Fields Setup","Sample Print","Approval","Bulk Production"],
  certificate:["Template Design","Name List Compilation","Data Merge & Proof","Test Print","Bulk Printing","Quality Check","Sorting & Filing"],
  foam:["Design Layout","Content Placement","Vendor Selection","Printing","Quality Check","Installation"],
  "title cards":["Design Template","Content Listing","Print & Cut","Lamination","Placement"],
  folder:["Design Selection","Content Compilation","Printing","Assembly","Distribution"],
  invitation:["Design Concept","Content Draft","Review & Approval","Printing","Envelope Prep","Distribution"],
  letter:["Template Creation","Data Collection","Generation","Review","Printing","Signature","Distribution"],
  payment:["Portal Setup","Payment Gateway Integration","Testing","Go Live","Monitoring"],
  "project street":["Layout Planning","Stall Allocation","Infrastructure Setup","Signage","Final Walkthrough"],
  segregation:["Category Definition","Sorting","Filing","Labeling","Storage"],
  snack:["Menu Planning","Vendor Selection","Order Placement","Delivery Coordination","Setup & Display","Replenishment"],
  gift:["Gift Selection","Vendor Negotiation","Order Placement","Quality Check","Packaging","Distribution Plan"],
  streaming:["Equipment Setup","Camera Placement","Sound Check","Platform Configuration","Test Stream","Go Live"],
  review:["Schedule Planning","Panel Assignment","Rubric Preparation","Room Setup","Review Sessions","Score Compilation"],
  "control room":["Equipment Setup","Display Configuration","Communication Test","Monitoring Setup","Staffing"],
  attendance:["System Setup","QR/ID Configuration","Testing","Registration Desk","Daily Tracking"],
  discipline:["Rules Documentation","Team Briefing","Patrol Schedule","Incident Reporting"],
  "night stay":["Roster Planning","Room Assignment","Emergency Protocol","Duty Schedule"],
  "id cards":["Template Design","Photo Collection","Data Entry","Printing","Lamination","Distribution"],
  "t-shirts":["Design Finalization","Size Collection","Vendor Selection","Order Placement","Quality Check","Distribution"],
  "social media":["Content Calendar","Post Creation","Scheduling","Live Coverage","Post-Event Highlights"],
  "project stats":["Data Collection","Dashboard Design","Display Setup","Real-time Updates"],
  led:["Content Design","Display Configuration","Testing","Installation"],
  sound:["Equipment Inventory","Venue Assessment","Setup Plan","Sound Check","Event Support"],
  dinner:["Menu Planning","Venue Setup","Catering Coordination","Seating Arrangement","Service Management"],
  lighting:["Venue Assessment","Equipment Selection","Installation","Testing","Event Support"],
  "event planning":["Timeline Creation","Venue Layout","Vendor Coordination","Rehearsal","Execution","Post-Event Review"],
  water:["Quantity Estimation","Procurement","Storage Setup","Distribution Points"],
  scavenger:["Theme & Clues Design","Route Planning","Prize Arrangement","Volunteer Briefing","Execution"],
  freshener:["Venue Assessment","Product Selection","Placement Plan","Restocking Schedule"],
  internet:["Bandwidth Assessment","Router Placement","Configuration","Speed Testing","Monitoring"],
  "soft drinks":["Quantity Estimation","Vendor Selection","Order Placement","Storage & Cooling","Distribution"],
  "mentor project expo":["Schedule Planning","Booth Assignment","Mentor Briefing","Setup","Expo Execution","Feedback"],
}

function getStages(title) {
  const t = title.toLowerCase()
  for (const [key, stages] of Object.entries(STAGE_MAP)) {
    if (t.includes(key)) {
      return stages.map((s, i) => ({ title: s, status: 'pending', comment: '', completedAt: null, order: i }))
    }
  }
  return [
    { title: 'Planning', status: 'pending', comment: '', completedAt: null, order: 0 },
    { title: 'In Progress', status: 'pending', comment: '', completedAt: null, order: 1 },
    { title: 'Review', status: 'pending', comment: '', completedAt: null, order: 2 },
    { title: 'Complete', status: 'pending', comment: '', completedAt: null, order: 3 },
  ]
}

export async function POST() {
  try {
    const db = await getDb()

    // Seed mentors
    for (const m of MENTORS) {
      await db.collection('task_mentors').updateOne(
        { email: m.email },
        { $setOnInsert: { ...m, registeredAt: null, passwordHash: null } },
        { upsert: true }
      )
    }

    // Seed tasks
    const existingCount = await db.collection('task_items').countDocuments()
    if (existingCount === 0) {
      const tasks = TASKS_ORDERED.map((title, i) => ({
        title,
        stages: getStages(title),
        responsible: null,
        teamMembers: [],
        order: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      await db.collection('task_items').insertMany(tasks)
    }

    const mentorCount = await db.collection('task_mentors').countDocuments()
    const taskCount = await db.collection('task_items').countDocuments()

    return NextResponse.json({ 
      message: `Seeded ${mentorCount} mentors and ${taskCount} tasks successfully!`,
      mentors: mentorCount,
      tasks: taskCount
    })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Seed failed: ' + err.message }, { status: 500 })
  }
}