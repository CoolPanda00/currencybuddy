// /js/rates.js

async function getExchangeRates(base = "USD") {
  const apiKey = "YOUR_API_KEY"; // replace with your API key
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      displayRates(data.conversion_rates);
    } else {
      console.error("API Error:", data["error-type"]);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

function displayRates(rates) {
  const ratesContainer = document.getElementById("rates-container");
  ratesContainer.innerHTML = "";

  for (let [currency, rate] of Object.entries(rates)) {
    const row = document.createElement("div");
    row.classList.add("rate-row");
    row.innerHTML = `<strong>${currency}</strong>: ${rate}`;
    ratesContainer.appendChild(row);
  }
}

// Call on page load
window.onload = () => {
  getExchangeRates();
}
