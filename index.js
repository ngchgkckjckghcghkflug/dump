const date = new Date();
var todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


const div = document.getElementById("mydiv");
const table = document.getElementById("table");

function mylog(a) {
    div.innerHTML +=  a.split("\n").map(i => '<h1><br>'+i+'<br></h1>').join("");
}

function round2(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
function bmi2kg(bmi, height) {
    return round2(bmi * Math.pow((height * 30.48) / 100, 2));
}
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


function getHeight() {
    const the_height = prompt("Enter the height in feet: ");
    const parse = (/^(?:[0-9]{1,}'[0-1]{1,2})|(?:^[0-9]{1,}$)$/g).exec(the_height);
    if (parse !== null) {
        if (parse[0].includes("'") && parse[0].split("'").length == 2){
            calculate(Number.parseFloat(parse[0].split("'")[0])+(Number.parseFloat(parse[0].split("'")[1])/12))
        } else {
            calculate(Number.parseFloat(parse[0]));
        }
    } else {
        mylog("Please enter a valid height.");
    }
}
function calculate(height) {
    const weight = Number.parseFloat(prompt("Enter the weight in kg: "));
    if (isNaN(weight)) {
        mylog("Please enter a valid weight.");
        return;
    }
    const the_BMI = weight / Math.pow((height * 30.48) / 100, 2);
    mylog(`Your Body Mass Index is ${round2(the_BMI)}`);
    if (the_BMI <= 18.5) {
        mylog("You are underweight.");
    } else if (the_BMI <= 24.9) {
        mylog("You are healthy.");
    } else if (the_BMI <= 29.9) {
        mylog(`You are over weight.
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height)} kg`);
    } else if (the_BMI > 29.9) {
        mylog(`You are obese.
        To be healthy your BMI should be between 18.5 and 24.9
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height)} kg`);
    }
    if (localStorage.getItem("height") != null) {
        localStorage.setItem("height",localStorage.getItem("height")+"@"+`{ "Date":"${todayDate}","Weight":${weight},"Height":${height}}`)
    } else {
        localStorage.setItem("height",`{ "Date":"${todayDate}","Weight":${weight},"Height":${height}}`);
    }
}

document.getElementById("calc").addEventListener("click", function () {
    div.innerHTML = "";
    getHeight();
});
document.getElementById("savheight").addEventListener("click", function () {
    div.innerHTML = "";
    const a = (/^(?:[0-9]{1,}'[0-1]{1,2})|(?:^[0-9]{1,}$)$/g).exec(prompt("Enter the height to save in feet: "));
    if (a !== null) {
        if (a[0].includes("'") && a[0].split("'").length == 2){
           localStorage.setItem('sheight',Number.parseFloat(a[0].split("'")[0])+(Number.parseFloat(a[0].split("'")[1])/12))
        } else {
            localStorage.setItem('sheight',Number.parseFloat(a[0]));
        }
    } else {
        mylog("Please enter a valid height.")
    }
    
    
});
document.getElementById("recalc").addEventListener("click", function () {
    div.innerHTML = "";
    if (localStorage.getItem("sheight") !== null){
        calculate(Number.parseFloat(localStorage.getItem("sheight")));
    }else {
        mylog("Please set a height.")
    }
});
document.getElementById("chistory").addEventListener("click", function () {
    table.innerHTML = "";
    div.innerHTML = "";
});

document.getElementById("history").addEventListener("click", function () {
    table.innerHTML = "";
    div.innerHTML = "";
    const dates = localStorage.getItem("height").split("@").map(i => JSON.parse(i));
    generateTable(table, dates);
    generateTableHead(table, Object.keys(dates[0]));
    
});
