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

const PARENT_TASKS = [
  {
    title: "Design",
    subTasks: [
      { title: "Poster & Brochure Design", stages: ["Content Brief","Concept Drafts","Review & Revisions","Final Approval","Print-Ready Export","Printing","Delivery"] },
      { title: "Visitor Pass Design", stages: ["Template Design","Data Fields Setup","Sample Print","Approval","Bulk Production"] },
      { title: "Title Cards Design", stages: ["Design Template","Content Listing","Print & Cut","Lamination","Placement"] },
      { title: "Foam Boards", stages: ["Design Layout","Content Placement","Vendor Selection","Printing","Quality Check","Installation"] },
      { title: "Invitation Designs", stages: ["Design Concept","Content Draft","Review & Approval","Printing","Envelope Prep","Distribution"] },
      { title: "Folders", stages: ["Design Selection","Content Compilation","Printing","Assembly","Distribution"] },
    ]
  },
  {
    title: "Letters",
    subTasks: [
      { title: "Internship Letters", stages: ["Template Creation","Data Collection","Generation","Review","Printing","Signature","Distribution"] },
      { title: "Participation Letters", stages: ["Template Creation","Data Collection","Generation","Review","Printing","Signature","Distribution"] },
    ]
  },
  {
    title: "Payments",
    subTasks: [
      { title: "Visitors Payment Portal", stages: ["Portal Setup","Payment Gateway Integration","Testing","Go Live","Monitoring"] },
      { title: "Skillup Payment", stages: ["Portal Setup","Payment Gateway Integration","Testing","Go Live","Monitoring"] },
    ]
  },
  {
    title: "Accommodation",
    subTasks: [
      { title: "Boys Hostel", stages: ["Room Allocation Plan","Amenities Setup","Check-in Desk","Signage Placement","Final Walkthrough"] },
      { title: "Girls Hostel", stages: ["Room Allocation Plan","Amenities Setup","Check-in Desk","Signage Placement","Final Walkthrough"] },
      { title: "Night Stay Mentors", stages: ["Roster Planning","Room Assignment","Emergency Protocol","Duty Schedule"] },
    ]
  },
  {
    title: "Technical Setup",
    subTasks: [
      { title: "LED Display Setup", stages: ["Content Design","Display Configuration","Testing","Installation"] },
      { title: "Sound System Setup", stages: ["Equipment Inventory","Venue Assessment","Setup Plan","Sound Check","Event Support"] },
      { title: "Lighting Arrangement", stages: ["Venue Assessment","Equipment Selection","Installation","Testing","Event Support"] },
      { title: "Internet Setup", stages: ["Bandwidth Assessment","Router Placement","Configuration","Speed Testing","Monitoring"] },
      { title: "Live Streaming Setup", stages: ["Equipment Setup","Camera Placement","Sound Check","Platform Configuration","Test Stream","Go Live"] },
    ]
  },
  {
    title: "Food & Drinks",
    subTasks: [
      { title: "Snacks & Beverages", stages: ["Menu Planning","Vendor Selection","Order Placement","Delivery Coordination","Setup & Display","Replenishment"] },
      { title: "Dinner Coordination", stages: ["Menu Planning","Venue Setup","Catering Coordination","Seating Arrangement","Service Management"] },
      { title: "Soft Drinks Arrangement", stages: ["Quantity Estimation","Vendor Selection","Order Placement","Storage & Cooling","Distribution"] },
      { title: "Water Bottles & Umbrellas", stages: ["Quantity Estimation","Procurement","Storage Setup","Distribution Points"] },
    ]
  },
  {
    title: "Certificates & ID",
    subTasks: [
      { title: "Certificates Printing", stages: ["Template Design","Name List Compilation","Data Merge & Proof","Test Print","Bulk Printing","Quality Check","Sorting & Filing"] },
      { title: "Certificates Segregation & Filing", stages: ["Category Definition","Sorting","Filing","Labeling","Storage"] },
      { title: "ID Cards Production", stages: ["Template Design","Photo Collection","Data Entry","Printing","Lamination","Distribution"] },
    ]
  },
  {
    title: "Event Operations",
    subTasks: [
      { title: "Event Planning & Execution", stages: ["Timeline Creation","Venue Layout","Vendor Coordination","Rehearsal","Execution","Post-Event Review"] },
      { title: "Discipline Management", stages: ["Rules Documentation","Team Briefing","Patrol Schedule","Incident Reporting"] },
      { title: "CC Control Room", stages: ["Equipment Setup","Display Configuration","Communication Test","Monitoring Setup","Staffing"] },
      { title: "Project Stats & CC Display", stages: ["Data Collection","Dashboard Design","Display Setup","Real-time Updates"] },
    ]
  },
  {
    title: "Welcome Kit & Merchandise",
    subTasks: [
      { title: "Welcome Kit", stages: ["Content Finalization","Vendor Selection","Order Placement","Quality Inspection","Kit Assembly","Labeling & Packing","Distribution Ready"] },
      { title: "T-Shirts Order (900 units)", stages: ["Design Finalization","Size Collection","Vendor Selection","Order Placement","Quality Check","Distribution"] },
    ]
  },
  {
    title: "Amenities",
    subTasks: [
      { title: "Room Freshener Arrangement", stages: ["Venue Assessment","Product Selection","Placement Plan","Restocking Schedule"] },
      { title: "Scavenger Hunt Coordination", stages: ["Theme & Clues Design","Route Planning","Prize Arrangement","Volunteer Briefing","Execution"] },
    ]
  },
]

const REGULAR_TASKS = [
  { title: "Guests Responsibility", stages: ["Guest List Confirmation","Travel Coordination","Hospitality Briefing","Welcome & Reception","Feedback Collection"] },
  { title: "Visitor Pass Distribution", stages: ["Pass Printing","Sorting by Category","Distribution Desk Setup","Distribution","Tracking"] },
  { title: "Project Street Setup", stages: ["Layout Planning","Stall Allocation","Infrastructure Setup","Signage","Final Walkthrough"] },
  { title: "Gifts Arrangement", stages: ["Gift Selection","Vendor Negotiation","Order Placement","Quality Check","Packaging","Distribution Plan"] },
  { title: "Project Reviews", stages: ["Schedule Planning","Panel Assignment","Rubric Preparation","Room Setup","Review Sessions","Score Compilation"] },
  { title: "Social Media Management", stages: ["Content Calendar","Post Creation","Scheduling","Live Coverage","Post-Event Highlights"] },
  { title: "Attendance Management", stages: ["System Setup","QR/ID Configuration","Testing","Registration Desk","Daily Tracking","Report Generation"] },
  { title: "Mentor Project Expo", stages: ["Schedule Planning","Booth Assignment","Mentor Briefing","Setup","Expo Execution","Feedback"] },
]

function buildStages(names) {
  return names.map((s, i) => ({
    title: s, status: "todo", comment: "", completedAt: null, assignedTo: null, order: i, createdAt: new Date().toISOString()
  }))
}

export async function POST() {
  try {
    const db = await getDb()

    for (const m of MENTORS) {
      await db.collection('task_mentors').updateOne(
        { email: m.email },
        { $setOnInsert: { ...m, registeredAt: null, passwordHash: null } },
        { upsert: true }
      )
    }

    const existingCount = await db.collection('task_items').countDocuments()
    if (existingCount === 0) {
      let order = 1
      const allTasks = []

      for (const pt of PARENT_TASKS) {
        const subTasks = pt.subTasks.map((st, i) => ({
          title: st.title,
          stages: buildStages(st.stages),
          responsible: null,
          teamMembers: [],
          order: i + 1,
        }))
        allTasks.push({
          title: pt.title,
          hasSubTasks: true,
          subTasks,
          stages: [],
          responsible: null,
          teamMembers: [],
          order: order++,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      for (const rt of REGULAR_TASKS) {
        allTasks.push({
          title: rt.title,
          hasSubTasks: false,
          subTasks: [],
          stages: buildStages(rt.stages),
          responsible: null,
          teamMembers: [],
          order: order++,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      await db.collection('task_items').insertMany(allTasks)
    }

    const mentorCount = await db.collection('task_mentors').countDocuments()
    const taskCount = await db.collection('task_items').countDocuments()

    return NextResponse.json({
      message: `Seeded ${mentorCount} mentors and ${taskCount} tasks!`,
      mentors: mentorCount, tasks: taskCount
    })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Seed failed: ' + err.message }, { status: 500 })
  }
}