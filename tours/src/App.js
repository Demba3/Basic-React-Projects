import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'



function App() {
  const [isError, setIsError] = useState(false);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => {
      if(tour.id !== id)
        return tour;
    })
    setTours(newTours);
  }

  const getTours = async () => {
    try{
      const res = await fetch(url);
      const tours = await res.json();
      setTours(tours);
      setLoading(false);
    }catch (error){
      setIsError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTours();
  })
  if(loading){
    return <main>
      <Loading />
    </main>
  }
  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={getTours}>Refersh</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} removeTour={removeTour} />
  </main>
}


export default App
