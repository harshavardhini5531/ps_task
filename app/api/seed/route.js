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
  "Welcome Kit",
  "Boys Hostel",
  "Girls Hostel",
  "Guests Responsibility",
  "Poster & Brochure Design",
  "Visitor Pass Design",
  "Certificates Printing",
  "Foam Boards",
  "Title Cards Design",
  "Folders",
  "Invitation Designs",
  "Internship Letters",
  "Participation Letters",
  "Visitor Pass Distribution",
  "Visitors Payment Portal",
  "Skillup Payment",
  "Project Street Setup",
  "Certificates Segregation & Filing",
  "Snacks & Beverages",
  "Gifts Arrangement",
  "Live Streaming Setup",
  "Project Reviews",
  "CC Control Room",
  "Attendance Management",
  "Discipline Management",
  "Night Stay Mentors",
  "ID Cards Production",
  "T-Shirts Order (900 units)",
  "Social Media Management",
  "Project Stats & CC Display",
  "LED Display Setup",
  "Sound System Setup",
  "Dinner Coordination",
  "Lighting Arrangement",
  "Event Planning & Execution",
  "Water Bottles & Umbrellas",
  "Scavenger Hunt Coordination",
  "Room Freshener Arrangement",
  "Internet Setup",
  "Soft Drinks Arrangement",
  "Mentor Project Expo",
]

const STAGE_MAP = {
  "welcome kit":["Content Finalization","Vendor Selection","Order Placement","Quality Inspection","Kit Assembly","Labeling & Packing","Distribution Ready"],
  hostel:["Room Allocation Plan","Amenities Setup","Check-in Desk","Signage Placement","Final Walkthrough"],
  guest:["Guest List Confirmation","Travel Coordination","Hospitality Briefing","Welcome & Reception","Feedback Collection"],
  poster:["Content Brief","Concept Drafts","Review & Revisions","Final Approval","Print-Ready Export","Printing","Delivery"],
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
  gift:["Gift Selection","Vendor & Pricing","Order Placement","Quality Check","Wrapping & Labeling","Distribution Plan"],
  "live stream":["Equipment Check","Camera & Mic Setup","Platform Config","Network Test","Dry Run","Go Live","Recording Backup"],
  review:["Schedule Creation","Panel Assignment","Evaluation Criteria","Venue Setup","Execution","Score Compilation","Results"],
  "control room":["Room Setup","Monitor Config","Communication System","Testing","Event Day Operation"],
  attendance:["System Setup","Volunteer Briefing","Collection Process","Compilation & Report"],
  discipline:["Rules & Guidelines","Volunteer Deployment","Active Monitoring","Issue Resolution","Report"],
  "id card":["Material Selection","Layout Design","Data Collection","Card Generation","Printing","Lanyard Attachment"],
  "t-shirt":["Design Finalization","Size Collection","Vendor Selection","Order Placement","Quality Check","Sorting","Distribution"],
  "social media":["Content Calendar","Pre-event Posts","Teaser Content","Live Coverage","Post-event Highlights","Analytics"],
  sound:["Equipment Listing","Vendor/Rental","Installation","Sound Check","Event Day Operation"],
  dinner:["Menu Selection","Caterer Finalization","Headcount","Venue Setup","Service Management"],
  lighting:["Lighting Plan","Equipment Sourcing","Installation","Testing","Event Day"],
  internet:["Bandwidth Assessment","ISP Coordination","Router Setup","Testing","Monitoring"],
  "night stay":["Mentor Roster","Room Assignment","Emergency Protocol","Shift Schedule"],
  expo:["Assignment","Schedule","Evaluation Forms","Setup","Execution","Results"],
  stats:["Dashboard Design","Data Integration","Display Setup","Testing","Monitoring"],
  design:["Requirement Gathering","Concept Drafts","Internal Review","Revisions","Final Approval","Production"],
}

function detectStages(title) {
  const t = title.toLowerCase()
  for (const [key, stages] of Object.entries(STAGE_MAP)) {
    if (t.includes(key)) return stages.map(s => ({ title: s, status: 'pending', comment: '', proof: null }))
  }
  return ['Planning & Requirement','Resource Allocation','Execution','Review & QC','Completion & Handover'].map(s => ({ title: s, status: 'pending', comment: '', proof: null }))
}

export async function POST() {
  try {
    const db = await getDb()
    await db.collection('task_mentors').deleteMany({})
    await db.collection('task_mentors').insertMany(MENTORS)
    await db.collection('task_items').deleteMany({})
    const taskDocs = TASKS_ORDERED.map((title, i) => ({ title, stages: detectStages(title), responsible: null, teamMembers: [], order: i, createdAt: new Date() }))
    await db.collection('task_items').insertMany(taskDocs)
    const mC = await db.collection('task_mentors').countDocuments()
    const tC = await db.collection('task_items').countDocuments()
    return NextResponse.json({ message: `Seeded ${mC} mentors (incl. 2 test) and ${tC} tasks` })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}