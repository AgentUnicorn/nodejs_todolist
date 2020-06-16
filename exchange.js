const fs = require("fs")
const fetch = require("node-fetch");

const API_KEY = "3421a16517d249feb8127f3795ec8667"

async function getExchange(amount, currency){
    console.log(`${amount} USD to ${currency} is `)
    const url = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`
    let response = await fetch(url);
    let data = await response.json();
    let result = amount * data.rates[currency]
    console.log(result)
}

if(process.argv[2] === "start"){
    let amount = process.argv[3] || null
    let rate = process.argv[4] || null
    if(amount){
        console.log("Result:")
        getExchange(amount, rate)
    } else {
        console.log("You need to enter an amount")
    }
} else {
    console.log("Cannot excute the process")
}