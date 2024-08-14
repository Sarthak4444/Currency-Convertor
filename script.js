const base_url = "https://latest.currency-api.pages.dev/v1/currencies/";

const convertBtn = document.getElementById("convert-btn");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const output = document.getElementById("output");
const dropDown = document.querySelectorAll("select");

for (let select of dropDown) {
  for (currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    select.appendChild(option);
  }
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  });
}

const changeFlag = (target) => {
  let code = target.value;
  let curCode = countryList[code];
  const flag = target.parentElement.querySelector(".flag");
  flag.src = `https://flagsapi.com/${curCode}/flat/64.png`;
};

convertBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const amountValue = amount.value;
  if (amountValue === "" || amountValue <= 0)
    return alert("Please enter a valid amount");
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;
  const url = `${base_url}${fromCurrencyValue.toLowerCase()}.json`;
  let fromValue;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.values(data));
      const curf = fromCurrencyValue.toLowerCase();
      const curt = toCurrencyValue.toLowerCase();
      const d = data[curf][curt];
      fromValue = amountValue * d;
      output.innerText = `${amountValue} ${fromCurrencyValue} = ${fromValue} ${toCurrencyValue}`;
    });
    
});
