import React, {useState,useEffect} from "react";

const TempApp = () =>
{
    const weatherUrl = process.env.REACT_APP_WEATHER_API;
    const[ city, setCity] = useState('');
    const[ search, setSearch] = useState('Berkeley,IL,US');
    const [weather, setWeather] = useState('');
    const handleChange = (event) => {
        setSearch(event.target.value);
      };
    useEffect(() => {
        
        const fetchApi = async() =>
        {
            const url =`${weatherUrl}/data/2.5/weather?q=${search}&units=imperial&appid=4ebb9418ca605fa1931880e565ec065c`;
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
            setWeather(resJson.weather);

        }
        fetchApi();
    },[search])
    const cityTemp = city.temp + ' ' + '°F';
    const tempMin = 'Low' + ' ' + city.temp_min + '°F';
    const tempMax =  'High' + ' ' + city.temp_max + '°F';
    const tempMinMax = tempMin + ' - ' +  tempMax;
    return (
        <div className="box">
            <div className="InputData">
                <input 
                value={search}
                type="search"
                className="InputField"
                onChange = { handleChange}  />
              
            { 
                !city?
                (   <div>
                    <p><b>Enter Temparature City</b></p>
                    <div id="clouds">
                <div class="cloud x1"></div>
                <div class="cloud x2"></div>
                <div class="cloud x3"></div>
                <div class="cloud x4"></div>
                <div class="cloud x5"></div>
            </div>
            </div>
                ) :
                (
                    <div>
                    <div className="info">
                    <h2 className="location">
                    <i class="fas fa-street-view"></i>{search}
                    </h2>
                    <h1 className="temp">
                     {cityTemp}
                    </h1>
                    <h3 className="tempmin_max">{tempMinMax}</h3>
                    <p>{weather[0].description}</p>
                    <p>{weather.length > 0 && weather.description}</p>
                  
                </div>
                <div className="wave- one"></div>
                
                <div className="wave- two"></div>
                
                <div className="wave- three"></div>
                
                <div id="clouds">
                <div class="cloud x1"></div>
                <div class="cloud x2"></div>
                <div class="cloud x3"></div>
                <div class="cloud x4"></div>
                <div class="cloud x5"></div>
            </div>
            </div> 

                )
            }

            </div> 
        </div>
    )
}
 
export default TempApp;