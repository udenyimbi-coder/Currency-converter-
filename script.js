
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convert");
const result = document.getElementById("result");
const rateText = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

async function convertCurrency() {

    const value = Number(amount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!Number.isFinite(value) || value <= 0) {
        result.innerText = "Please enter a valid amount.";
        rateText.innerText = "";
        return;
    }

    result.innerText = "Converting...";
    rateText.innerText = "";

    try {
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates[to]) {
            throw new Error("Exchange rate unavailable");
        }

        const exchangeRate = data.rates[to];
        const converted = value * exchangeRate;

        result.innerText =
            `${converted.toLocaleString(undefined, {
                maximumFractionDigits: 2
            })} ${to}`;

        rateText.innerText =
            `1 ${from} = ${exchangeRate} ${to}`;

    } catch (error) {
        result.innerText = "Unable to convert. Try again.";
        rateText.innerText = "";
    }
}

convertBtn.addEventListener("click", convertCurrency);

swapBtn.addEventListener("click", () => {
    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();
});
