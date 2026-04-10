import { getDb } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

const MENTORS = [
  { name: "Neelam V.S. Murthy (Babji)", email: "babji@aec.edu.in" },
  { name: "MD Shaifu Zama", email: "shaify@adityauniversity.in" },
  { name: "Kedharasetti Prasanth", email: "kprasanth@aec.edu.in" },
  { name: "Lutukurthi Sathish", email: "satishl@adityauniversity.in" },
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

// ALL tasks — flat stages only, no sub-tasks
const ALL_TASKS = [
  { title: "Design", stages: ["Poster & Brochure Design","Visitor Pass Design","Title Cards Design","Foam Boards","Invitation Designs","Folders"] },
  { title: "Letters", stages: ["Skillup Participation Letters","DriveReady Participation Letters","Internship Letters","Project Space Participation Letters","Visitor Pass Letters"] },
  { title: "Payments", stages: ["Visitors Payment Portal","Skillup Payment"] },
  { title: "Accommodation", stages: ["Boys Hostel","Girls Hostel","Night Stay Mentors"] },
  { title: "Technical Setup", stages: ["LED Display Setup","Sound System Setup","Lighting Arrangement","Internet Setup","Live Streaming Setup"] },
  { title: "Food & Drinks", stages: ["Snacks & Beverages","Dinner Coordination","Soft Drinks Arrangement","Water Bottles & Umbrellas"] },
  { title: "Certificates & ID", stages: ["Certificates Printing","Certificates Segregation & Filing","ID Cards Production"] },
  { title: "Event Operations", stages: ["Event Planning & Execution","Discipline Management","CC Control Room","Project Stats & CC Display"] },
  { title: "Welcome Kit & Merchandise", stages: ["Welcome Kit","T-Shirts Order (900 units)"] },
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
      const allTasks = ALL_TASKS.map((t, i) => ({
        title: t.title,
        hasSubTasks: false,
        subTasks: [],
        stages: buildStages(t.stages),
        responsible: null,
        teamMembers: [],
        order: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      await db.collection('task_items').insertMany(allTasks)
    }

    const mentorCount = await db.collection('task_mentors').countDocuments()
    const taskCount = await db.collection('task_items').countDocuments()
    return NextResponse.json({ message: `Seeded ${mentorCount} mentors and ${taskCount} tasks!`, mentors: mentorCount, tasks: taskCount })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Seed failed: ' + err.message }, { status: 500 })
  }
}