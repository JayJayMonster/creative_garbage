import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Detail() {
  const url = 'http://145.24.222.40:8000/creativegarbage';
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const { id, label } = state;

  async function fetchData() {
    await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log(err));
  }

  const searchTag = query => {
    console.log('searching for ' + query);
    let fdata = data.filter(advice => {
      for (let tag of advice.trashtag) {
        console.log(advice.trashtag);
        if (tag === query) {
          console.log('found some advice');
          return advice;
        }
      }
    });

    setData(fdata);
  };
  useEffect(() => {
    console.log(id, label);
    fetchData();
    searchTag(label);
  }, []);

  //Map items
  // return <ul>{searchTag(label)}</ul>;
  return (
    <div>
      <h1>Details</h1>
    </div>
  );
}
