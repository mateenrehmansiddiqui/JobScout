// Mock user data
export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Software Engineer',
  avatar: 'https://i.pravatar.cc/150?img=1',
  stats: {
    totalInterviews: 12,
    bestScore: 85,
    currentStreak: 5,
    percentileRank: 68,
  },
};

// Mock session data
export const mockSessions = [
  {
    id: 1,
    date: '2024-01-03',
    role: 'Frontend Developer',
    type: 'Technical',
    score: 78,
    duration: '45 min',
    percentile: 65,
  },
  {
    id: 2,
    date: '2024-01-02',
    role: 'Full Stack Engineer',
    type: 'Behavioral',
    score: 82,
    duration: '30 min',
    percentile: 72,
  },
  // Add more mock sessions
];

// Mock questions
export const mockQuestions = [
  {
    id: 1,
    text: 'Tell me about yourself and your experience.',
    type: 'behavioral',
    category: 'Introduction',
  },
  {
    id: 2,
    text: 'Explain the difference between let, const, and var in JavaScript.',
    type: 'technical',
    category: 'JavaScript Fundamentals',
  },
  // Add more questions
];