import { useEffect, useState } from 'react';
import { getScoreSummary } from '../api/studentApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các phần tử Chart.js cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ScoreSummary {
  Good: number;
  Quite: number;
  Average: number;
  Poor: number;
}

export default function ScoreSummary() {
  const [summary, setSummary] = useState<Record<string, ScoreSummary> | null>(null);

  useEffect(() => {
    getScoreSummary().then(setSummary);
  }, []);

  if (!summary) {
    return (
      <div className="container">
        <h2 style={{ padding: '30px' }}>Thống kê điểm theo môn</h2>
        <p>Đang tải dữ liệu...</p>
          <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px', marginLeft: '50px'  }}>
      <h2 style={{ padding: '10px', border: '1px solid #ddd' }}>Thống kê điểm theo môn</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Môn học</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Good</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quite</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Average</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Poor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([subject, scores], idx) => (
            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {subject === 'toan' ? 'Toán' :
                 subject === 'vat_li' ? 'Vật lý' :
                 subject === 'hoa_hoc' ? 'Hóa học' :
                 subject === 'sinh_hoc' ? 'Sinh học' :
                 subject === 'lich_su' ? 'Lịch sử' :
                 subject === 'dia_li' ? 'Địa lý' :
                 subject === 'ngoai_ngu' ? 'Ngoại ngữ' :
                 subject === 'gdcd' ? 'GDCD' :
                 subject === 'ngu_van' ? 'Ngữ văn' : subject}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{scores.Good}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{scores.Quite}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{scores.Average}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{scores.Poor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thêm biểu đồ cho từng môn học */}
      {Object.entries(summary).map(([subject, scores], idx) => (
        <div key={idx} style={{ marginTop: '30px' }}>
          <h3>{subject === 'toan' ? 'Toán' :
                 subject === 'vat_li' ? 'Vật lý' :
                 subject === 'hoa_hoc' ? 'Hóa học' :
                 subject === 'sinh_hoc' ? 'Sinh học' :
                 subject === 'lich_su' ? 'Lịch sử' :
                 subject === 'dia_li' ? 'Địa lý' :
                 subject === 'ngoai_ngu' ? 'Ngoại ngữ' :
                 subject === 'gdcd' ? 'GDCD' :
                 subject === 'ngu_van' ? 'Ngữ văn' : subject}</h3>
          <div className="chart-container">
          <Bar
            data={{
              labels: ['Good', 'Quite', 'Average', 'Poor'],
              datasets: [
                {
                  label: 'Số lượng học sinh',
                  data: [scores.Good, scores.Quite, scores.Average, scores.Poor],
                  backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'],
                  borderColor: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `${subject === 'toan' ? 'Toán' : subject === 'vat_li' ? 'Vật lý' : subject === 'hoa_hoc' ? 'Hóa học' : subject}`
                },
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw} học sinh`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
        </div>
      ))}

      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
        <p><strong>Chú thích phân loại điểm:</strong></p>
        <ul>
          <li><strong>Good</strong>: Từ 8 đến 10 điểm</li>
          <li><strong>Quite</strong>: Từ 6 đến 8 điểm</li>
          <li><strong>Average</strong>: Từ 4 đến 6 điểm</li>
          <li><strong>Poor</strong>: Dưới 4 điểm</li>
        </ul>
      </div>
    </div>
  );
}
