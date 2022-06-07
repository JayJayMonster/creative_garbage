import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Detail() {
  const url = 'http://145.24.222.40:8000/creativegarbage';
  const [data, setData] = useState([]);
  const [fetchDone, setFetchDone] = useState(false);
  const [fData, setFData] = useState([]);
  const { state } = useLocation();
  const { id, label } = state;

  // todo props doorgeven en geen state
  const fetchData = () => {
    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        console.log('klaar met laden json');
        console.log(data);
        setData(data);
      })
      .catch(err => console.log(err));
  };

  const searchTag = query => {
    console.log('searching for ' + query);
    let fdata = data.filter(advice => {
      //console.log(advice);
      // console.log(advice.trashtag);
      for (let tag of advice.trashtag) {
        // console.log(tag.tag);
        if (tag.tag === query) {
          // console.log(tag.tag);
          console.log('found some advice');
          return advice
        }
      }
    });
    console.log('finished searching...');
    setFData(fdata);
    console.log(fdata)
    console.log(fdata[0]);
    setFetchDone(true)
  };

  useEffect(() => { fetchData() }, [])
  useEffect(() => { searchTag(label) }, [data])
  

  // useEffect(() => {
  //   searchTag('banaan');
  // }, [fetchDone]);

  // useEffect(() => {
  //   //console.log(id, label);
  //   fetchData();
  // }, []);

  //Map items
  // return <ul>{searchTag(label)}</ul>;

  if (!fetchDone)
    return (
      <div>
        <h1>Loading Data</h1>
        <button onClick={fetchData}>zoek　しにい</button>
      </div>
    );

  return (
    <div>
      <h1>Details</h1>
      <h2>{fData[0].title}</h2>
    </div>
  );
}
