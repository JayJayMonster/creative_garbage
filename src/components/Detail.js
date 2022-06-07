import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Detail() {
  const url = 'http://145.24.222.40:8000/creativegarbage';
  const [data, setData] = useState([]);
  const [fetchDone, setFetchDone] = useState(false);
  const [fData, setFData] = useState([]);
  const { state } = useLocation();
  const { label } = state;

  // todo props doorgeven en geen state
  const fetchData = () => {
    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        console.log('klaar met laden json');
        //console.log(data);
        setData(data);
      })
      .then(() => {
        searchTag(label);
      })
      .catch(err => console.log(err));
  };

  const searchTag = query => {
    console.log('searching for ' + query);
    let fdata = data.filter(advice => {
      //console.log(advice);
      console.log(advice.trashtag);
      for (let tag of advice.trashtag) {
        console.log(tag);
        if (tag === query) {
          console.log('found some advice');
          return advice;
        }
      }
    });
    console.log('finished searching...');
    setFData(fdata);
    //console.log(fData);
  };

  useEffect(() => {
    searchTag(label);
  }, [fetchDone]);

  // useEffect(() => {
  //   //console.log(id, label);
  //   fetchData();
  // }, []);

  //Map items
  // return <ul>{searchTag(label)}</ul>;
  return (
    <div>
      <h1>Details</h1>
      <button onClick={fetchData}>zoek</button>
    </div>
  );
}
