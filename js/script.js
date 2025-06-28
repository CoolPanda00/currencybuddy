document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#ratesTable tbody");
  
  // Show loading state
  function showLoading() {
    tableBody.innerHTML = "<tr><td colspan='2' style='text-align: center; padding: 2rem;'>Loading exchange rates...</td></tr>";
  }
  
  // Show error state
  function showError(message) {
    tableBody.innerHTML = `<tr><td colspan='2' style='text-align: center; padding: 2rem; color: #ff6b6b;'>${message}</td></tr>`;
  }
  
  // Fetch and display exchange rates
  async function fetchExchangeRates() {
    showLoading();
    
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const rates = data.rates;
      
      // Clear loading state
      tableBody.innerHTML = "";
      
      // Important currencies to display
      const importantCurrencies = [
        { code: "USD", name: "US Dollar" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "British Pound" },
        { code: "JPY", name: "Japanese Yen" },
        { code: "AUD", name: "Australian Dollar" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "SGD", name: "Singapore Dollar" },
        { code: "CHF", name: "Swiss Franc" }
      ];
      
      importantCurrencies.forEach(currency => {
        const rate = rates[currency.code];
        if (rate) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>
              <strong>${currency.code}</strong>
              <br>
              <small style="opacity: 0.7;">${currency.name}</small>
            </td>
            <td>
              <strong>${rate.toFixed(4)}</strong>
              <br>
              <small style="opacity: 0.7;">1 INR = ${rate.toFixed(4)} ${currency.code}</small>
            </td>
          `;
          tableBody.appendChild(row);
        }
      });
      
      // Add last updated time
      const lastUpdated = new Date().toLocaleString();
      const updateRow = document.createElement("tr");
      updateRow.innerHTML = `
        <td colspan="2" style="text-align: center; font-style: italic; opacity: 0.7; border-top: 2px solid #444;">
          Last updated: ${lastUpdated}
        </td>
      `;
      tableBody.appendChild(updateRow);
      
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      showError("Unable to load exchange rates. Please check your internet connection and try again.");
    }
  }
  
  // Initial load
  fetchExchangeRates();
  
  // Refresh rates every 5 minutes
  setInterval(fetchExchangeRates, 5 * 60 * 1000);
});