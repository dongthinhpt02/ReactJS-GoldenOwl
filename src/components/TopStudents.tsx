import { useEffect, useState } from 'react';
import { getTop10StudentsA } from '../api/studentApi';

interface Student {
  sbd: string;
  totalScore: number;
}

export default function TopStudents() {
  const [top, setTop] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTop10StudentsA()
      .then((data) => {
        setTop(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load top students.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: '30px', textAlign: 'center' }}>
        <div className="loading-container">
          
          <h2>Thống kê Top 10 khối A</h2>
          <p>Đang tải dữ liệu...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container" style={{ padding: '30px', marginLeft: '50px'  }}>
      <h2>Top 10 học sinh khối A</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>STT</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>SBD</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tổng điểm Toán - Lý - Hóa</th>
          </tr>
        </thead>
        <tbody>
          {top.map((student, idx) => (
            <tr key={student.sbd} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{idx + 1}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.sbd}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

