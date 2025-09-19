// MentorDashboardUIKit.jsx
// Ready-to-use React + Tailwind UI Kit (single-file)
// Preserves original structure; updated with brand colors, responsive layout, and gradient ProgressRing.

import React, { useState, useRef } from 'react';
import { FaBell, FaSearch, FaMoon, FaSun, FaUserCircle, FaTimes, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";

// ---------- Brand Colors (fallbacks included) ----------
const COLORS = {
  bg: '#F6F3EE',        // page background / whitespace / section dividers
  cta: '#F5B82E',       // high-visibility CTAs
  success: '#32B768',   // growth / positive
  dark: '#2E3438',      // main text / headers / dark backgrounds
  premium: '#C48A6A',   // logo accents / premium CTAs
  alert: '#E54B3B',     // alerts / urgency
};

// 🔵 Account Settings Modal
const AccountSettingsModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Update Account Settings
        </h2>
        <form className="space-y-4">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 border rounded-md p-2"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Helen Robert"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#F5B82E]"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="helen.robert@email.com"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#F5B82E]"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              defaultValue="Senior Mentor"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#F5B82E]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#F5B82E] text-white hover:bg-[#e0a525]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🔵 Mentor Profile Dropdown
const MentorProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    alert("Logging out... Redirecting to sign-in page.");
    // In real app: use navigate("/login") or auth logout here
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <div
        className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm cursor-pointer"
        style={{ border: `1px solid ${COLORS.bg}` }}
        onClick={() => setOpen(!open)}
      >
        <div className=''>
        <img
              src="https://images.unsplash.com/photo-1618018352910-72bdafdc82a6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mentor"
              className="w-8 h-8 rounded-full border-[2px] border-[#32B768]"
            />
        </div>
        <div className="text-sm font-medium" style={{ color: COLORS.dark }}>
          Helen Robert
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border p-4 z-50">
          {/* Profile Details */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1618018352910-72bdafdc82a6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mentor"
              className="w-12 h-12 rounded-full border-[2px] border-[#32B768]"
            />
            <div>
              <p className="font-semibold text-gray-800">Helen Robert</p>
              <p className="text-sm text-gray-500">helen.robert@email.com</p>
              <p className="text-xs text-gray-400">Senior Mentor</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => {
                setSettingsOpen(true);
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Account Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <AccountSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

// ---------- Helper Components ----------
const IconButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md hover:bg-[rgba(0,0,0,0.04)] ${className}`}
    aria-hidden
  >
    {children}
  </button>
);

const StatCard = ({ title, value, hint, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-4 shadow-sm ${className}`} style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}`, ...style }}>
    <div className="text-sm font-medium" style={{ color: COLORS.dark }}>{title}</div>
    <div className="mt-2 text-2xl font-bold" style={{ color: COLORS.dark }}>{value}</div>
    {hint && <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{hint}</div>}
  </div>
);

// Gradient progress ring using SVG
const ProgressRing = ({ size = 48, stroke = 6, progress = 0, idSuffix = 'g' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (progress / 100) * c;
  const gradId = `brandGradient-${idSuffix}`;

  return (
    <svg width={size} height={size} className="inline-block">
      <defs>
        <linearGradient id={gradId} x1="0%" x2="100%">
          <stop offset="0%" stopColor={COLORS.success} />
          <stop offset="55%" stopColor={COLORS.premium} />
          <stop offset="100%" stopColor={COLORS.cta} />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={r} stroke="#E6EEF4" strokeWidth={stroke} fill="none" />
        <circle
          r={r}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
      </g>
    </svg>
  );
};

// Set up localization
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Example events
const events = [
  {
    id: 1,
    title: "Mentorship Session with John",
    start: new Date(2025, 8, 20, 10, 0), // year, month (0-indexed), day, hr, min
    end: new Date(2025, 8, 20, 11, 0),
  },
  {
    id: 2,
    title: "Assignment Review",
    start: new Date(2025, 8, 22, 14, 0),
    end: new Date(2025, 8, 22, 15, 0),
  },
];

// ---------- Mock Data (kept from original) ----------
const mockMentees = [
  { id: 1, name: 'Aisha Bello', progress: 72, lastLogin: '2d ago', stage: 'Module 3' },
  { id: 2, name: 'John Okoro', progress: 45, lastLogin: '4d ago', stage: 'Module 2' },
  { id: 3, name: 'Ngozi Eze', progress: 88, lastLogin: '1d ago', stage: 'Module 4' },
  { id: 4, name: 'David Musa', progress: 23, lastLogin: '8d ago', stage: 'Module 1' },
];

const mockSubmissions = [
  { id: 's1', mentee: 'Aisha Bello', title: 'Reflection - Glory', type: 'Reflection', status: 'Pending' },
  { id: 's2', mentee: 'John Okoro', title: 'Assignment 2', type: 'Assignment', status: 'Pending' },
  { id: 's3', mentee: 'Ngozi Eze', title: 'Assessment - Intake', type: 'Assessment', status: 'Reviewed' },
];

const mockNotifications = [
  { id: 1, message: "Session with John Doe starts in 30 minutes.", time: "10:30 AM" },
  { id: 2, message: "New assignment submission from Grace.", time: "Yesterday" },
  { id: 3, message: "You received a 5-star review from Paul.", time: "2 days ago" },
];

// ---------- Main UI Kit Component (updated, responsive, branded) ----------
export default function MentorDashboardUIKit() {
  const [dark, setDark] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [query, setQuery] = useState('');
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [showRecommend, setShowRecommend] = useState(false);
  const [recommendedCourse, setRecommendedCourse] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const videoRef = useRef(null);

  const filtered = mockMentees.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  const approveSubmission = (id) => {
    setSubmissions((s) => s.map((it) => (it.id === id ? { ...it, status: 'Approved' } : it)));
  };

  const returnSubmission = (id) => {
    setSubmissions((s) => s.map((it) => (it.id === id ? { ...it, status: 'Returned' } : it)));
  };

  return (
    <div className={dark ? 'dark' : ''} style={{ backgroundColor: COLORS.bg, color: COLORS.dark, minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-6">

        {/* Header */}
        <header style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: `1px solid ${COLORS.bg}` }} className="p-4 mb-6 shadow-sm flex items-center justify-between flex-col md:flex-row gap-3">
          <div className="flex items-center gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: COLORS.premium }} className="flex items-center justify-center text-white font-bold">V</div>
              <div>
                <div className="text-lg font-bold" style={{ color: COLORS.dark }}>Mentor Dashboard</div>
                <div className="text-sm text-gray-500 hidden md:block">Manage your mentees and sessions</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mentees, courses..."
                className="rounded-full pl-10 pr-4 py-2 w-full md:w-72 text-sm bg-white shadow-sm"
                style={{ border: `1px solid ${COLORS.bg}` }}
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* 🔔 Notifications with Dropdown */}
            <div className="relative">
              <IconButton onClick={() => setShowNotifications(!showNotifications)}>
                <FaBell style={{ color: COLORS.dark }} />
                {mockNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#E54B3B] text-white text-xs rounded-full px-1">
                    {mockNotifications.length}
                  </span>
                )}
              </IconButton>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b font-semibold text-gray-700">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto divide-y">
                    {mockNotifications.map((note) => (
                      <li key={note.id} className="p-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">{note.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                      </li>
                    ))}
                  </ul>
                  <Link to="/notifications">
                  <div className="p-3 text-center text-sm text-blue-600 hover:underline cursor-pointer">
                    View all
                  </div>
                  </Link>
                </div>
              )}
            </div>

            <IconButton onClick={() => setDark((d) => !d)}>
              {dark ? <FaSun style={{ color: COLORS.dark }} /> : <FaMoon style={{ color: COLORS.dark }} />}
            </IconButton>

            <MentorProfileDropdown />
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left Panel */}
          <aside className="col-span-12 md:col-span-3 space-y-4">
            {/* Mentees Card */}
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm h-auto flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.dark }}>Mentees</h3>
                <div className="text-sm text-gray-400">{filtered.length} results</div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {filtered.map((m) => (
                  <div key={m.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2 rounded-lg" style={{ backgroundColor: COLORS.bg }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D1F7E0] to-[#EADDD0] flex items-center justify-center text-white font-semibold" style={{ background: `linear-gradient(135deg, ${COLORS.success}33, ${COLORS.premium}33)` }}>{m.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                      <div>
                        <div className="font-medium" style={{ color: COLORS.dark }}>{m.name}</div>
                        <div className="text-xs text-gray-500">{m.stage} • <span className="text-xs">{m.lastLogin}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <div className="flex items-center gap-2">
                        <ProgressRing progress={m.progress} idSuffix={m.id} />
                        <div className="text-sm font-semibold" style={{ color: COLORS.dark }}>{m.progress}%</div>
                      </div>
                      <button
                        className="text-sm px-3 py-1 rounded-md"
                        style={{ backgroundColor: 'transparent', border: `1px solid ${COLORS.cta}`, color: COLORS.dark }}
                        onClick={() => setSelectedMentee(m)}
                      >
                        View
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Submissions Card */}
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.dark }}>Submissions</h3>
                <div className="text-sm text-gray-400">{submissions.length}</div>
              </div>

              <div className="space-y-3">
                {submissions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-3 p-2 rounded-lg" style={{ backgroundColor: COLORS.bg }}>
                    <div>
                      <div className="font-medium" style={{ color: COLORS.dark }}>{s.title}</div>
                      <div className="text-xs text-gray-500">{s.mentee} • {s.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-xs px-2 py-1 rounded-full`} style={{ backgroundColor: s.status === 'Pending' ? '#FFF5D5' : s.status === 'Approved' ? '#E6F9EE' : '#F3F4F6', color: s.status === 'Pending' ? '#B9770E' : s.status === 'Approved' ? COLORS.success : '#374151' }}>{s.status}</div>
                      <button onClick={() => approveSubmission(s.id)} className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.04)]"><FaStar style={{ color: COLORS.premium }} /></button>
                      <button onClick={() => returnSubmission(s.id)} className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.04)]"><FaTimes style={{ color: COLORS.alert }} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Panel */}
          <main className="col-span-12 md:col-span-6 space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Utilization" value="72%" hint="Sessions booked vs available" style={{ background: `linear-gradient(90deg, ${COLORS.cta}, ${COLORS.premium})`, color: '#fff' }} />
              <StatCard title="Avg. Rating" value="4.7" hint="From learners" />
              <StatCard title="Active Mentees" value="24" hint="Currently active" />
              <StatCard title="At-risk" value="3" hint="Needs attention" />
            </div>

            {/* Calendar + Session Tracker */}
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-4">
                <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
                    <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>
                        Upcoming Sessions
                    </h4>

                    {/* Real Calendar */}
                    <div className="border rounded-lg p-4 bg-white">
                        <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        />
                    </div>
                    </div>


                <div className="w-full lg:w-1/3 pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l" style={{ borderColor: COLORS.bg }}>
                  <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Session Tracker</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center justify-between"><div>2025-09-10 • Aisha</div><div className="text-green-600">Completed</div></div>
                    <div className="flex items-center justify-between"><div>2025-09-08 • John</div><div className="text-red-600">Canceled</div></div>
                    <div className="flex items-center justify-between"><div>2025-09-02 • Ngozi</div><div className="text-yellow-600">Pending</div></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Feedback Tools */}
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Quick Review</h4>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> <FaStar className="text-yellow-400" /> <FaStar className="text-yellow-400" /> <FaStar className="text-gray-300" /> <FaStar className="text-gray-300" />
                </div>
                <input className="flex-1 rounded-md border px-3 py-2 w-full md:w-auto" placeholder="Write a quick comment" />
                <button className="px-4 py-2 rounded-md" style={{ backgroundColor: COLORS.cta, color: '#fff' }}>Submit</button>
              </div>
            </div>

          </main>

          {/* Right Panel */}
          <aside className="col-span-12 md:col-span-3 space-y-4">
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Mentee Engagement</h4>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold" style={{ color: COLORS.dark }}>82%</div>
                  <div className="text-xs text-gray-500">Attendance</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Assignment completion</div>
                  <div className="h-2 bg-gray-200 rounded mt-2 overflow-hidden"><div style={{width:'68%'}} className="h-full" style={{backgroundColor: COLORS.success}} /></div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Reviews & Ratings</h4>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: COLORS.dark }}>4.7</div>
                <div className="text-sm text-gray-500">Average rating</div>
              </div>
              <div className="mt-4 text-sm text-gray-500 space-y-2">
                <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>
                  "Excellent mentor — very helpful!" — Aisha
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>
                  "Great feedback on assignments" — John
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.bg}` }} className="rounded-2xl p-4 shadow-sm">
              <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 rounded" style={{ backgroundColor: COLORS.bg }}>Onboarding Guide</div>
                <div className="p-2 rounded" style={{ backgroundColor: COLORS.bg }}>Help Center</div>
                <div className="p-2 rounded" style={{ backgroundColor: COLORS.bg }}>Contact Admin</div>
              </div>
            </div>

          </aside>

        </div>

        {/* Footer */}
        <footer className="mt-6 text-sm text-gray-500 text-center">
          © 2025 Mentor Platform • Onboarding Guide • Help Center • <span style={{ color: COLORS.cta }}>Contact Admin</span>
        </footer>

        {/* Mentee Detail Drawer */}
        {selectedMentee && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="w-full md:w-[420px] h-full bg-white p-6 shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: `linear-gradient(135deg, ${COLORS.success}, ${COLORS.premium})` }}>{selectedMentee.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: COLORS.dark }}>{selectedMentee.name}</div>
                    <div className="text-xs text-gray-500">{selectedMentee.stage} • {selectedMentee.lastLogin}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedMentee(null)} className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.04)]"><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Progress</div>
                  <div className="mt-2 flex items-center gap-3"><ProgressRing progress={selectedMentee.progress} idSuffix={`detail-${selectedMentee.id}`} /><div className="font-semibold text-xl" style={{ color: COLORS.dark }}>{selectedMentee.progress}%</div></div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Intake Assessment</div>
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>Q: What motivates you? <div className="text-xs text-gray-500 mt-1">A: To build a career in product design.</div></div>
                    <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>Q: Time availability? <div className="text-xs text-gray-500 mt-1">A: 10 hours/week.</div></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Courses & Assignments</div>
                    <button onClick={() => setShowRecommend(true)} className="text-sm" style={{ color: COLORS.cta }}>Recommend Course</button>
                  </div>

                  <div className="mt-2 space-y-3">
                    <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>
                      <div className="flex items-center justify-between"><div><div className="font-medium">Course: UI Fundamentals</div><div className="text-xs text-gray-500">Assignment 2 • Due 2025-09-20</div></div>
                        <div className="flex items-center gap-2"><input placeholder="Score (0-100)" className="w-20 px-2 py-1 border rounded"/><button className="px-3 py-1 rounded" style={{ backgroundColor: COLORS.cta, color: '#fff' }}>Save</button></div>
                      </div>
                    </div>

                    <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>
                      <div className="flex items-center justify-between"><div><div className="font-medium">Course: Product Design</div><div className="text-xs text-gray-500">Reflection • Submitted</div></div>
                        <div className="flex items-center gap-2"><button className="px-3 py-1 rounded" style={{ backgroundColor: COLORS.premium, color: '#fff' }}>Open</button></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div onClick={() => setSelectedMentee(null)} className="flex-1 bg-black/30" />
          </div>
        )}

        {/* Recommend Course Modal */}
        {showRecommend && (
          <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: COLORS.dark }}>Recommend Course</h3>
                <button onClick={() => setShowRecommend(false)} className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.04)]"><FaTimes /></button>
              </div>

              <div className="space-y-3">
                <input value={recommendedCourse} onChange={(e)=>setRecommendedCourse(e.target.value)} placeholder="Search library..." className="w-full px-4 py-2 rounded-md border" style={{ borderColor: COLORS.bg }} />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>UI Fundamentals</div>
                  <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>Product Design</div>
                  <div className="p-3 rounded" style={{ backgroundColor: COLORS.bg }}>Career Skills</div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button onClick={() => { alert('Course recommended: '+recommendedCourse); setShowRecommend(false); }} className="px-4 py-2 rounded-md" style={{ backgroundColor: COLORS.cta, color: '#fff' }}>Recommend</button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
