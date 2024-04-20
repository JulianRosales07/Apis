const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

let dataFromBack = {};

const mapRatesKeys = () => {
    return new Promise((resolve) => {
        fetch(  
            `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/USD`
          )
              .then((res) => res.json())
              .then((data) => {
              const { conversion_rates: rates } = data;
            let renderRates ="";

        for (let key in rates) {
          renderRates +=
           key === "USD"
             ? `<option value="${key}" selected>${key}</option>`
             : `<option value="${key}">${key}</option>`;
        }         
    currencyOneEl.innerHTML = renderRates;
    currencyTwoEl.innerHTML = renderRates;
    resolve();
       });
    });
};

const getData = () => {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
    )
    .then((res) => res.json())
    .then((data) => {
       dataFromBack = { ...data.conversion_rates };
        calculate(dataFromBack, currencyTwo);
    });
};

const calculate = (data, currencyTwo) => {
 const rate = data[currencyTwo];
 amountTwoEl.value = (+amountOneEl.value * rate).toFixed(2);
 rateEl.innerText = "1 " + currencyOneEl.options[currencyOneEl.selectedIndex].text + " = " + rate + " " + currencyTwoEl.options[currencyTwoEl.selectedIndex].text;
};

const runCalculate = () => {
    calculate(dataFromBack, currencyTwoEl.value);
};

const swapCurrency = () => 
{
    let tempId = currencyOneEl.selectedIndex;
    currencyOneEl.selectedIndex = currencyTwoEl.selectedIndex;
    currencyTwoEl.selectedIndex = tempId;
    getData();
    runCalculate();
}

mapRatesKeys().then(() => getData());

swapEl.addEventListener("click", swapCurrency);

amountOneEl.addEventListener("input", runCalculate);
currencyOneEl.addEventListener("change", getData);
currencyTwoEl.addEventListener("change", runCalculate);