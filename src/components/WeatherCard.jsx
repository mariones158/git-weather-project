import { useState } from "react";
import "/src/components/styles/WeatherCard.css";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const changeTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (

/*     seccion de color fondo y medidas */

    <main className="bg-[#FFF9E4] w-full h-full h-screen">
      <section className="min-h-0 h-[900px] flex flex-col items-center justify-center mx-auto">
      

{/* seccion donde muestra imagen, temperatura, y ciudad */}

<article className=" absolute w-[70%] h-[342px] top-[145px]  bg-[url(/src/images/chilly-dayTime.jpg)] bg-cover rounded-[50px]">
  <div className="absolute w-[100%] h-[342px] top-0 left-0 rounded-[50px] [background:linear-gradient(180deg,rgba(94,94,94,0)_0%,rgba(79.75,79.84,81.97,0.56)_46.4%,rgb(68.74,68.9,72.67)_100%)]"></div>
  <div className="inline-flex flex-col items-start absolute top-[38px] left-[44px]">

   <div>
   <img src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
   </div>

  <div className="relative w-fit [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-[95px] tracking-normal leading-[normal]">
  <h2 className="card__temp">{isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`}</h2>
  </div>

  <div className="relative w-fit font-medium text-white text-[25px] tracking-normal leading-[normal]">
  <h2>{weather?.name}, {weather?.sys.country}</h2>
  </div>

  <div className="relative w-fit font-normal text-white text-[25px] tracking-normal leading-normal">
  <h3 className="info__title">🌤 {weather?.weather[0].description}</h3>
</div>
</div>
</article>

{/* seccion de boton de cambio*/}

<article className="absolute w-[420px] h-[269px] top-[532px] left-[306px] translate-x-[-80px] bg-[#e7e7ff] rounded-[50px]">

<div className="inline-flex items-center justify-center gap-[10px] px-[40px] py-[20px] relative top-[103px] left-[55px] hover:brightness-150 transition duration-300 ease-in-out bg-violet-600 cursor-pointer rounded-[15px] overflow-hidden shadow-[0px_4px_5px_#00000073]" onClick={changeTemperature}>
  <button className="relative w-[230px] h-[25px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-[21px] tracking-normal leading-[22.8px] whitespace-nowrap">Change to {isCelsius? '°F' : '°C'}</button>
</div>
</article>

{/* seccion de una card estado del viento, nubes y humedad*/}

        <article className="absolute  top-[532px] left-[801px] translate-x-[-120px] rounded-[50px]">

            <div className="absolute w-[610px] h-[269px] top-0 left-0 bg-white rounded-[50px] shadow-[0px_1px_25px_#0000000d]">
            <div className="inline-flex items-center gap-[25px] absolute top-[160px] left-[90px]">
              <img  className="relative w-[50px] h-[50px]" alt="Solar cloud sun" src="./src/images/icon_winds.png" />
                   
              <div className="inline-flex flex-col items-start relative flex-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                  Wind Speed
                </div>
                <div className="[font-family:'Poppins-Bold',Helvetica] font-bold relative w-fit text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                {weather?.wind.speed}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-[25px] absolute top-[60px] left-[90px]">
             <img  className="relative w-[50px] h-[50px]" alt="Solar cloud sun" src="./src/images/icon_clouds.png" />
              <div className="inline-flex flex-col items-start relative flex-0">
                <div className="mt-[-1.00px] [font-family:'Poppins-Regular',Helvetica] font-normal relative w-fit text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                  Clouds
                </div>
                <div className="[font-family:'Poppins-Bold',Helvetica] font-bold relative w-fit text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                {weather?.clouds.all}
                </div>
              </div>
            </div>



            <div className="inline-flex items-center gap-[25px] absolute top-[60px] left-[389px]">
            <img  className="relative w-[50px] h-[50px]" alt="Solar cloud sun" src="./src/images/icon_clouds.png" />   
                       
              <div className="inline-flex flex-col items-start relative flex-0">
                <div className="mt-[-1.00px] [font-family:'Poppins-Regular',Helvetica] font-normal relative w-fit text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                Pressure
                </div>
                <div className="[font-family:'Poppins-Bold',Helvetica] font-bold relative w-fit text-[#3c3c3c] text-[16px] tracking-normal leading-[normal]">
                {weather?.main.pressure}
                </div>
              </div>
            </div>
       
          </div>
        </article>

      </section>
    </main>

);
};

export default WeatherCard;


