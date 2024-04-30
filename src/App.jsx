import { useEffect,useState, useRef } from 'react'
import './App.css'
import  axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {
const [isLoading, setIsLoading] = useState(true);
const [hasError, setHasError] = useState(false);
const [showMessage, setshowMessage] = useState(false);
const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temp, setTemp] = useState()
const [inputValue, setInputValue] = useState();

  useEffect(()=>{
    setTimeout(()=>{
      setshowMessage(true)
    }, 3000)
    const success = pos =>{
      setCoords({ 
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }
    const error =()=>{
      setHasError(true)
      setIsLoading(false)
    }
  navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(()=>{
    if(coords){
      const API_KEY = 'e26c3c1b2bf93ad3dce26f871c48b659'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(url)
      .then(res => { 
         setWeather(res.data)
         const celsius = (res.data.main.temp - 273.15).toFixed(1)
         const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
         setTemp({celsius, fahrenheit})
      })
      .catch(err => console.log(err))
      .finally(()=> setIsLoading(false))
    }
}, [coords])

console.log(weather)

const inputCountry = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputCountry.current.value.toLowerCase().trim());
  };

  useEffect(() => {
    if (inputValue) {
      const API_KEY = 'e26c3c1b2bf93ad3dce26f871c48b659'

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}`
        )
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * 9/5 + 32).toFixed(1);
          setTemp({ celsius, fahrenheit }); 
          setHasError(false);
        })
        .catch((e) => {
          console.log(e);
          setHasError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [inputValue]);

  return  (
    <div>
      {isLoading? (
        <section className="">
          <article className="flex items-center bg-indigo-500 h-screen flex items-center justify-center rounded-md">
            <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm25.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-4 text-white font-poppins">Loading...</span>
          </article>
          {showMessage && (
            <article className="flex items-center bg-red-500 h-screen flex items-center justify-center rounded-md">
              <div className="">
                <h3 className="ml-4 text-white font-poppins">Please, active your location</h3>
              </div>
            </article>
          )}
        </section>
      ) : hasError? (
        <section className="bg-[url(/src/images/error_404.png)] bg-cover bg-center h-screen flex items-center justify-center rounded-md"></section>
      ) : (
        <section className="search">
          <article className="inline-flex  gap-[640px] absolute top-[45px] left-[306px] translate-x-[-180px]">
            <div className="relative w-fit [font-family:'Poppins-Bold',Helvetica] font-bold text-[#3c3c3c] text-[25px] tracking-[0] leading-[normal] translate-x-[110px]">
              <h1 className="font-extrabold">Weather App</h1>
            </div>

             <form className="inline-flex justify-end gap-[15px]" onSubmit={handleSubmit}>
               <input className=" w-[400px] gap-[10px] px-[19px] py-[16px] bg-white rounded-[15px] overflow-hidden border border-solid border-[#8a8a8a] w-fit mt-[-1.00px] font-light text-[#bbbbbb] text-[17px] tracking-[0] whitespace-nowrap" placeholder="Search your city . . ." type="text" ref={inputCountry} />
                  <button className="w-[120px] h-[55px] items-center justify-center gap-[10px] px-[20px] py-[16px] relative bg-[#9c83ff] rounded-[15px] overflow-hidden [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-[21px] tracking-[0] leading-[0]"
                  onClick={handleSubmit}>Search</button>
            </form>
            
          </article>
          {weather && <WeatherCard weather={weather} temp={temp} />}
        </section>
      )}
    </div>
  )
}
export default App



