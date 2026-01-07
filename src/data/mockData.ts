// Mock data for HealVorteX Dashboard

export type PatientStatus = "normal" | "warning" | "critical";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  roomNumber: string;
  admissionDate: string;
  lastUpdated: string;
  heartRate: number;
  temperature: number;
  bloodPressure: string;
  oxygenSaturation: number;
  status: PatientStatus;
  condition: string;
  avatar?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: "critical" | "moderate" | "normal";
  reason: string;
  timestamp: string;
  isAcknowledged: boolean;
  isResolved: boolean;
}

export interface InquiryResponse {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  questions: {
    question: string;
    answer: string;
    isAbnormal: boolean;
  }[];
  riskLevel: "low" | "medium" | "high";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: "doctor" | "patient";
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatConversation {
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

// Mock Patients
export const patients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    roomNumber: "301-A",
    admissionDate: "2026-01-02",
    lastUpdated: "2 min ago",
    heartRate: 72,
    temperature: 98.6,
    bloodPressure: "120/80",
    oxygenSaturation: 98,
    status: "normal",
    condition: "Post-operative recovery",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 62,
    gender: "Male",
    roomNumber: "205-B",
    admissionDate: "2026-01-05",
    lastUpdated: "1 min ago",
    heartRate: 112,
    temperature: 101.2,
    bloodPressure: "145/95",
    oxygenSaturation: 92,
    status: "critical",
    condition: "Pneumonia",
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    age: 34,
    gender: "Female",
    roomNumber: "412-A",
    admissionDate: "2026-01-06",
    lastUpdated: "5 min ago",
    heartRate: 88,
    temperature: 99.8,
    bloodPressure: "130/85",
    oxygenSaturation: 95,
    status: "warning",
    condition: "Respiratory infection",
  },
  {
    id: "P004",
    name: "James Wilson",
    age: 78,
    gender: "Male",
    roomNumber: "108-C",
    admissionDate: "2025-12-28",
    lastUpdated: "3 min ago",
    heartRate: 68,
    temperature: 98.4,
    bloodPressure: "118/76",
    oxygenSaturation: 97,
    status: "normal",
    condition: "Cardiac monitoring",
  },
  {
    id: "P005",
    name: "Maria Garcia",
    age: 52,
    gender: "Female",
    roomNumber: "315-B",
    admissionDate: "2026-01-04",
    lastUpdated: "1 min ago",
    heartRate: 105,
    temperature: 100.4,
    bloodPressure: "138/88",
    oxygenSaturation: 93,
    status: "warning",
    condition: "Diabetes management",
  },
  {
    id: "P006",
    name: "Robert Thompson",
    age: 56,
    gender: "Male",
    roomNumber: "220-A",
    admissionDate: "2026-01-01",
    lastUpdated: "8 min ago",
    heartRate: 125,
    temperature: 102.1,
    bloodPressure: "160/100",
    oxygenSaturation: 89,
    status: "critical",
    condition: "Sepsis",
  },
];

// Mock Alerts
export const alerts: Alert[] = [
  {
    id: "A001",
    patientId: "P002",
    patientName: "Michael Chen",
    type: "critical",
    reason: "Heart rate elevated above 110 BPM for 15 minutes",
    timestamp: "2 min ago",
    isAcknowledged: false,
    isResolved: false,
  },
  {
    id: "A002",
    patientId: "P006",
    patientName: "Robert Thompson",
    type: "critical",
    reason: "Oxygen saturation dropped below 90%",
    timestamp: "5 min ago",
    isAcknowledged: true,
    isResolved: false,
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Emily Rodriguez",
    type: "moderate",
    reason: "Temperature rising - now at 99.8°F",
    timestamp: "12 min ago",
    isAcknowledged: false,
    isResolved: false,
  },
  {
    id: "A004",
    patientId: "P005",
    patientName: "Maria Garcia",
    type: "moderate",
    reason: "Blood glucose levels above normal range",
    timestamp: "25 min ago",
    isAcknowledged: true,
    isResolved: false,
  },
  {
    id: "A005",
    patientId: "P001",
    patientName: "Sarah Johnson",
    type: "normal",
    reason: "Scheduled medication reminder",
    timestamp: "1 hour ago",
    isAcknowledged: true,
    isResolved: true,
  },
  {
    id: "A006",
    patientId: "P004",
    patientName: "James Wilson",
    type: "normal",
    reason: "Vitals check completed - all normal",
    timestamp: "2 hours ago",
    isAcknowledged: true,
    isResolved: true,
  },
];

// Mock Inquiry Responses
export const inquiryResponses: InquiryResponse[] = [
  {
    id: "I001",
    patientId: "P002",
    patientName: "Michael Chen",
    date: "2026-01-07",
    questions: [
      { question: "How would you rate your pain level (1-10)?", answer: "7", isAbnormal: true },
      { question: "Any difficulty breathing?", answer: "Yes, moderate", isAbnormal: true },
      { question: "Did you sleep well last night?", answer: "No, woke up multiple times", isAbnormal: true },
      { question: "Any nausea or vomiting?", answer: "Mild nausea", isAbnormal: false },
    ],
    riskLevel: "high",
  },
  {
    id: "I002",
    patientId: "P003",
    patientName: "Emily Rodriguez",
    date: "2026-01-07",
    questions: [
      { question: "How would you rate your pain level (1-10)?", answer: "4", isAbnormal: false },
      { question: "Any difficulty breathing?", answer: "Slight congestion", isAbnormal: false },
      { question: "Did you sleep well last night?", answer: "Yes, slept 6 hours", isAbnormal: false },
      { question: "Any new symptoms?", answer: "Mild headache", isAbnormal: true },
    ],
    riskLevel: "medium",
  },
  {
    id: "I003",
    patientId: "P001",
    patientName: "Sarah Johnson",
    date: "2026-01-07",
    questions: [
      { question: "How would you rate your pain level (1-10)?", answer: "2", isAbnormal: false },
      { question: "Any difficulty breathing?", answer: "No", isAbnormal: false },
      { question: "Did you sleep well last night?", answer: "Yes, 8 hours", isAbnormal: false },
      { question: "How is your appetite?", answer: "Good, ate breakfast", isAbnormal: false },
    ],
    riskLevel: "low",
  },
];

// Mock Chat Conversations
export const chatConversations: ChatConversation[] = [
  {
    patientId: "P002",
    patientName: "Michael Chen",
    lastMessage: "I'm still having trouble breathing",
    lastMessageTime: "5 min ago",
    unreadCount: 2,
    messages: [
      {
        id: "M001",
        senderId: "P002",
        senderType: "patient",
        message: "Good morning, doctor. I'm not feeling well today.",
        timestamp: "9:15 AM",
        isRead: true,
      },
      {
        id: "M002",
        senderId: "D001",
        senderType: "doctor",
        message: "Good morning, Michael. Can you describe your symptoms?",
        timestamp: "9:18 AM",
        isRead: true,
      },
      {
        id: "M003",
        senderId: "P002",
        senderType: "patient",
        message: "I'm still having trouble breathing",
        timestamp: "9:22 AM",
        isRead: false,
      },
    ],
  },
  {
    patientId: "P001",
    patientName: "Sarah Johnson",
    lastMessage: "Thank you, doctor!",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    messages: [
      {
        id: "M004",
        senderId: "D001",
        senderType: "doctor",
        message: "Your recovery is going well. Keep up the exercises.",
        timestamp: "8:00 AM",
        isRead: true,
      },
      {
        id: "M005",
        senderId: "P001",
        senderType: "patient",
        message: "Thank you, doctor!",
        timestamp: "8:05 AM",
        isRead: true,
      },
    ],
  },
  {
    patientId: "P006",
    patientName: "Robert Thompson",
    lastMessage: "The new medication is helping",
    lastMessageTime: "30 min ago",
    unreadCount: 1,
    messages: [
      {
        id: "M006",
        senderId: "P006",
        senderType: "patient",
        message: "The new medication is helping",
        timestamp: "9:00 AM",
        isRead: false,
      },
    ],
  },
];

// Dashboard Stats
export const dashboardStats = {
  totalPatients: 48,
  criticalAlerts: 3,
  activeCases: 12,
  aiSystemStatus: "Online" as const,
  systemHealth: 98.5,
};

// Vitals History for charts (last 24 hours)
export const vitalsHistory = {
  heartRate: [
    { time: "00:00", value: 68 },
    { time: "02:00", value: 65 },
    { time: "04:00", value: 62 },
    { time: "06:00", value: 70 },
    { time: "08:00", value: 78 },
    { time: "10:00", value: 82 },
    { time: "12:00", value: 85 },
    { time: "14:00", value: 88 },
    { time: "16:00", value: 84 },
    { time: "18:00", value: 80 },
    { time: "20:00", value: 75 },
    { time: "22:00", value: 72 },
  ],
  temperature: [
    { time: "00:00", value: 98.4 },
    { time: "02:00", value: 98.2 },
    { time: "04:00", value: 98.0 },
    { time: "06:00", value: 98.6 },
    { time: "08:00", value: 99.2 },
    { time: "10:00", value: 99.8 },
    { time: "12:00", value: 100.2 },
    { time: "14:00", value: 100.6 },
    { time: "16:00", value: 100.4 },
    { time: "18:00", value: 100.0 },
    { time: "20:00", value: 99.6 },
    { time: "22:00", value: 99.2 },
  ],
  oxygenSaturation: [
    { time: "00:00", value: 97 },
    { time: "02:00", value: 96 },
    { time: "04:00", value: 95 },
    { time: "06:00", value: 94 },
    { time: "08:00", value: 93 },
    { time: "10:00", value: 92 },
    { time: "12:00", value: 91 },
    { time: "14:00", value: 92 },
    { time: "16:00", value: 93 },
    { time: "18:00", value: 94 },
    { time: "20:00", value: 95 },
    { time: "22:00", value: 96 },
  ],
};
