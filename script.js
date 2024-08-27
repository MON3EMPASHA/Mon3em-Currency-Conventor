const convertBtn = document.getElementById("convertBtn");
const exchangeBtn = document.getElementById("exchangeBtn");
const convertForm = document.getElementById("convert_form");
const exchangeForm = document.getElementById("exchange_form");
const result = document.getElementById("Result");

convertBtn.addEventListener("click", () => {
  if (!convertBtn.classList.contains("active")) {
    exchangeBtn.classList.remove("active");
    convertBtn.classList.add("active");
    exchangeForm.classList.add("hidden");
    convertForm.classList.remove("hidden");
    result.innerHTML = "";
  }
});

exchangeBtn.addEventListener("click", () => {
  if (!exchangeBtn.classList.contains("active")) {
    convertBtn.classList.remove("active");
    exchangeBtn.classList.add("active");
    convertForm.classList.add("hidden");
    exchangeForm.classList.remove("hidden");
    result.innerHTML = "";
  }
});

convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = document.getElementById("enteredAmount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (amount > 0) {
    const apiKey = "a54c4f3f47a7652d2b77c755";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

    axios
      .get(url)
      .then((response) => {
        const rate = response.data.conversion_rate;
        const convertedAmount = (rate * amount).toFixed(2);
        result.innerHTML = `<p>${amount} ${from} is approximately <strong>${convertedAmount} ${to}</strong>.</p><br>
        ${from === "EGP" || to === "EGP" ? "Tahya Masr " : ""}`;
        result.style.textAlign = "center";
      })
      .catch((error) => {
        result.innerHTML = `<p class="error">Error fetching conversion rate. Please try again later.</p>`;
        console.error(error);
      });
  } else {
    result.innerHTML = `<p class="error">Please enter a valid amount.</p>`;
  }
});

exchangeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const baseCurrency = document.getElementById("BaseCurrency").value;
  const apiKey = "a54c4f3f47a7652d2b77c755";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

  axios
    .get(url)
    .then((response) => {
      const rates = response.data.conversion_rates;
      let output = `<h2>Exchange Rates for ${baseCurrency}</h2><ul>`;
      for (const currency in rates) {
        output += `<li>1 ${baseCurrency} = ${rates[currency]} ${currency}</li>`;
      }
      output += `</ul>`;
      result.innerHTML = output;
    })
    .catch((error) => {
      result.innerHTML = `<p class="error">Error fetching exchange rates. Please try again later.</p>`;
      console.error(error);
    });
});
