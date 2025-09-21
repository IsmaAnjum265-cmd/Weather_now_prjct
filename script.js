// Replace with your free API key from https://openweathermap.org/api
const API_KEY = "YOUR_API_KEY";  

async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");
  const errorMsg = document.getElementById("error");

  if (!city) {
    errorMsg.textContent = "⚠️ Please enter a city name";
    resultDiv.innerHTML = "";
    return;
  }

  try {
    errorMsg.textContent = "";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    resultDiv.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>${data.main.temp}°C</strong></p>
      <p>${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    errorMsg.textContent = "❌ " + err.message;
    resultDiv.innerHTML = "";
  }
}
