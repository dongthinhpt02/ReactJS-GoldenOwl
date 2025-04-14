const API_BASE = 'http://localhost:3001';

export const getScoresBySBD = async (sbd: string) => {
  const res = await fetch(`${API_BASE}/score/${sbd}`);
  return res.json();
};

export const getScoreSummary = async () => {
  const res = await fetch(`${API_BASE}/score/subject`);
  return res.json();
};

export const getTop10StudentsA = async () => {
  const res = await fetch(`${API_BASE}/score/top10`);
  return res.json();
};
