const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_val = document.getElementById('temp_val');
const today_date = document.getElementById('today_date'); // Added today_date element

// Function to get current date
function getCurrentDate() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[now.getDay()]; // Get the current day of the week
    const date = now.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const formattedDate = `${dayOfWeek}, ${date} ${month} ${year}`;
    return formattedDate;
}

// Function to get current time
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
}

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Write the name of the city Please`;
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=440cbf77a99dd1d0ae9cf1bf76f5af5e`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;

            // Set temp_status icon based on weather condition
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color:#a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }

        } catch {
            city_name.innerText = `Please enter the city name properly`;
        }
    }
    // Set today's date
    today_date.innerText = getCurrentDate();
}

submitBtn.addEventListener("click", getInfo);

// Update current date and time every second
setInterval(() => {
    today_date.innerText = getCurrentDate();
}, 1000);
