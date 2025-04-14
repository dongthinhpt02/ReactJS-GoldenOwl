import { useState } from 'react';
import { getScoresBySBD } from '../api/studentApi';

export default function ScoreBySBD() {
  const [sbd, setSbd] = useState('');
  const [data, setData] = useState<any>(null);

  const handleFetch = async () => {
    const res = await getScoresBySBD(sbd);
    setData(res);
  };

  const subjectLabels: Record<string, string> = {
    toan: 'Toán',
    ngu_van: 'Ngữ văn',
    ngoai_ngu: 'Ngoại ngữ',
    vat_li: 'Vật lí',
    hoa_hoc: 'Hóa học',
    sinh_hoc: 'Sinh học',
    lich_su: 'Lịch sử',
    dia_li: 'Địa lí',
    gdcd: 'GDCD'
  };

  return (
    <div className="container" style={{ padding: '30px',marginLeft: '50px', textAlign : 'left'}}>
      <div style={{ padding: '30px',marginLeft: '50px', border: '1px outset #ddd', borderRadius: '5px' }}>
        <h2>User Registration</h2>
        <h5>Registration Number :</h5>
        <input style={{ padding: '10px', width: '200px', marginTop: '10px' }}
          value={sbd}
          onChange={e => setSbd(e.target.value)}
          placeholder="Enter registration number"
        />
        <button onClick={handleFetch} style={{ marginLeft: '10px', width : '70px',height : '38px' }}>Submit</button>
        </div>
      

      <div className="container" style={{ marginTop : '30px',padding: '30px',marginLeft: '50px', textAlign : 'left', border: '1px outset #ddd', borderRadius: '5px'}}>
        <h2>Detail Scores</h2>
        <h5>Detailed view of search score here!</h5>

        {data && (
          <div style={{ marginTop: '20px' }}>
            <p><strong>SBD:</strong> {data.sbd}</p>
            <p><strong>Mã ngoại ngữ:</strong> {data.ma_ngoai_ngu}</p>
            <h4>Điểm từng môn:</h4>
            <ul>
              {Object.entries(data.scores).map(([subject, score]) => (
                <li key={subject}>
                  <strong>{subjectLabels[subject] || subject}:</strong> {String(score ?? 'Không có điểm')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
