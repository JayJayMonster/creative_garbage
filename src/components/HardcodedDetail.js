import { useEffect, useState } from 'react';
import logoUpload2 from '../assets/creative-garbage.png';

export function HardcodedDetail() {
  const url = 'http://145.24.222.40:8000/creativegarbage';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState([logoUpload2]);

  const fetchData = () => {
    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setData(data);
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="nav">
      <h1>Creative Garbage</h1> 
      <img src={selectedLogo} alt="image" width="75px" height="75px" />
      </div>
      <div class="card">
      {/* {data.slice(2, 3).map(item => (
        <
        ))} */}
        {data.slice(2, 3).map(item => (
          <div key={item._id}>
            {/* <h1>{item.title}</h1> */}
            <img src={item.image} alt="banana" width="50%" height="50%"></img>
            <h1>{item.title}</h1>
            <p>{item.paragraphs[0].paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
