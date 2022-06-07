import { useEffect, useState } from 'react';

export function HardcodedDetail() {
  const url = 'http://145.24.222.40:8000/creativegarbage';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      {data.slice(2, 3).map(item => (
        <div key={item._id}>
          <h1>{item.title}</h1>
          <img src={item.image} alt="banana" width="50%" height="50%"></img>
          <p>{item.paragraphs[0].paragraph}</p>
        </div>
      ))}
    </div>
  );
}
