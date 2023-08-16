import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  let temp = null;
  let temp_min = null;
  let temp_max = null;
  let emoji = null;
  let dateTime;
  let toUtc;
  let currentLocalTime;
  let selectedDate;
  let date;
  let time;
  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${location}`
      );
      setData(response.data);
      setLocation("");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (data.main) {
    temp = (data.main.temp - 273.15).toFixed(2);
    temp_min = (data.main.temp_min - 273.15).toFixed(2);
    temp_max = (data.main.temp_max - 273.15).toFixed(2);
    emoji = data.weather[0].icon;
    dateTime = new Date(data.dt * 1000);
    toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
    currentLocalTime = toUtc + 1000 * data.timezone;
    selectedDate = new Date(currentLocalTime);
    date = selectedDate.toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    time = selectedDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <>
      <div className="card text-white text-center border-0">
        <div className="d-flex flex-column align-items-center justify-content-start card-img-overlay ">
          <form onSubmit={fetchWeather}>
            <div className="input-group mb-4 w-100 mx-auto ">
              <input
                type="search"
                className="form-control position-sticky "
                placeholder="Enter location"
                aria-label="Enteer location"
                aria-describedby="basic-addon2"
                name="search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="input-group-text"
                id="basic-addon2"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          {data.main ? (
            <div className="bg-dark bg-opacity-50 px-4 py-2">
              <h2 className="card-title mt-3">{data.name}</h2>
              {data.main ? (
                <p className="card-text lead">
                  {date} ,{time}{" "}
                </p>
              ) : null}
              {emoji ? (
                <img
                  src={`http://openweathermap.org/img/w/${emoji}.png`}
                  alt="..."
                  className="w-50 h-25"
                />
              ) : null}
              {temp ? <h1>{temp} &deg;C</h1> : null}
              {data.weather ? (
                <p className="lead fw-bolder mb-1"> {data.weather[0].main}</p>
              ) : null}
              {temp_min ? (
                <span className="card-text lead">{temp_min} &deg;C to </span>
              ) : null}
              {temp_max ? (
                <span className="card-text lead">{temp_max} &deg;C </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Search;
