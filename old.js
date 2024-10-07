const date = new Date();
var todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


const div = document.getElementById("mydiv");
const table = document.getElementById("table");

function getHeight(promptText = "Enter the height in feet",mode=0) {
    const the_height = prompt(promptText);
    const parse = (/^(?:[0-9]{1,}'[0-9]{1,2})|(?:^[0-9]{1,}$)$/g).exec(the_height);
    if (parse !== null) {
        if (parse[0].includes("'") && parse[0].split("'").length == 2){
            if (mode == 1){
                return [Number.parseFloat(parse[0].split("'")[0])+(Number.parseFloat(parse[0].split("'")[1])/12),the_height]
            } else {
                return Number.parseFloat(parse[0].split("'")[0])+(Number.parseFloat(parse[0].split("'")[1])/12)
            }
        } else {
            if (mode == 1){
                return [Number.parseFloat(parse[0]),the_height]
            } else {
                return Number.parseFloat(parse[0])
            }
        }
    } else {
        mylog("Please enter a valid height.");
    }
}
function stop() {
    throw new Error("stopped execution")
}
function parseStr(a) {
    if (a.includes("'") && a.split("'").length == 2){
        return Number.parseFloat(a.split("'")[0])+(Number.parseFloat(a.split("'")[1])/12)
    } else {
        return Number.parseFloat(a)
    }
}
function getWeight() {
    let weight = Number.parseFloat(prompt("Enter the weight in kg: "));
    if (isNaN(weight)) {
        mylog("Please enter a valid weight.");
    }else {
        return weight
    }
}

function calculateBMI(height  ,weight) {
    return  [weight/Math.pow((height * 30.48) / 100, 2), height, weight];
    
}
function describeBMI(array) {
    const [bmi ,height ,weight] = array;
    let bmiString = `Your Body Mass Index is ${round2(bmi)}\n`
    if (bmi <= 18.5) {
        return bmiString+"You are underweight.";
    } else if (bmi <= 24.9) {
        return bmiString+"You are healthy.";
    } else if (bmi <= 29.9) {
        return bmiString+`You are over weight.
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height)} kg`;
    } else if (bmi > 29.9) {
        return bmiString+`You are obese.
        To be healthy your BMI should be between 18.5 and 24.9
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height)} kg`;
    } 
}

document.getElementById("calc").addEventListener("click", function () {
    div.innerHTML = "";
    let heighta= getHeight("Enter the height in feet",1) ?? stop() 
    let height = heighta[1]
    let weight = getWeight() ??stop()
    if (localStorage.getItem("height") != null) {
        localStorage.setItem("height",localStorage.getItem("height")+"@"+`{ "Date":"${todayDate}","Weight":${weight},"Height":"${height}"}`)
    } else {
        localStorage.setItem("height",`{ "Date":"${todayDate}","Weight":${weight},"Height":"${height}"}`);
    }
    mylog( describeBMI(calculateBMI(heighta[0] ,weight)) );
})
document.getElementById("savheight").addEventListener("click", function () {
    div.innerHTML = ""; 
    let h = getHeight("Enter height to save",1)
    if (h != undefined){
        localStorage.setItem('sheight',h[1]);
    }
});

document.getElementById("recalc").addEventListener("click", function () {
    div.innerHTML = "";
    if (localStorage.getItem("sheight") !== null){
        let weight = getWeight() ?? stop()
        let height = localStorage.getItem("sheight")
        if (localStorage.getItem("height") != null) {
            localStorage.setItem("height",localStorage.getItem("height")+"@"+`{ "Date":"${todayDate}","Weight":${weight},"Height":"${height}"}`)
        } else {
            localStorage.setItem("height",`{ "Date":"${todayDate}","Weight":${weight},"Height":"${height}"}`);
        }
        mylog(describeBMI(calculateBMI(Number.parseFloat(parseStr(localStorage.getItem("sheight"))),weight)));
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
