document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#ratesTable tbody");

  fetch("https://api.exchangerate-api.com/v4/latest/INR")
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      tableBody.innerHTML = "";

      const importantCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD"];
      importantCurrencies.forEach(currency => {
        const rate = rates[currency];
        const row = `<tr><td>${currency}</td><td>${rate ? rate.toFixed(4) : "N/A"}</td></tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error(error);
      tableBody.innerHTML = "<tr><td colspan='2'>Unable to load rates</td></tr>";
    });
});

