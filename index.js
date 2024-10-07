document.getElementById("calc").addEventListener("click", () =>{
    div.innerHTML = ""; 
    let height = (/^(?:[0-9]{1,}'[0-9]{1,2})|(?:^[0-9]{1,}$)$/g.exec(prompt('Enter your height in feet'))??[""]).map((e=>e.includes("'")?[Number(e.split("'")[0])+Number(e.split("'")[1])/12,e]:isNaN(Number.parseFloat(e))?"bad":[Number(e),e]))[0]
    if (height == "bad"){
        mylog("Please enter a valid height")
        return 
    } 
    doBMIprocess(height)
})
document.getElementById("savheight").addEventListener("click", () =>{
    div.innerHTML = ""; 
    let height = (/^(?:[0-9]{1,}'[0-9]{1,2})|(?:^[0-9]{1,}$)$/g.exec(prompt("Please enter a height to set"))??[""]).map((a=>a.includes("'")?a.split("'")[0]+a.split("'")[1]:isNaN(Number.parseFloat(a))?"bad":a))[0]
    if (height == 'bad'){
        mylog("Please enter a valid height")
        return 
    }
    localStorage.setItem('savedHeight',height);

})
document.getElementById("recalc").addEventListener("click",() =>{
    div.innerHTML = ""; 
    let height = ([localStorage.getItem("savedHeight")??""]).map((e=>e.includes("'")?[Number(e.split("'")[0])+Number(e.split("'")[1])/12,e]:isNaN(Number.parseFloat(e))?"bad":[Number(e),e]))[0];
    if (height == "bad"){
        mylog("Please set a height")
        return 
    } 
    doBMIprocess(height) 
})
document.getElementById("history").addEventListener("click", () =>{
    table.innerHTML = "";
    div.innerHTML = "";
    const dates = localStorage.getItem("history").split("@").map((i) =>{
        try {
            return JSON.parse(i)
        } catch (error) {
            console.log(error)
            return ''
        }
    });
    
    generateTable(table, dates);
    generateTableHead(table, Object.keys(dates[0]));
})
document.getElementById("clear").addEventListener("click", () =>{
    table.innerHTML = "";
    div.innerHTML = "";
})

const table = document.getElementById("table");
const newDate = new Date();
const date = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
const div = document.getElementById("mydiv");

function mylog(a) {
    div.innerHTML +=  a.split("\n").map(i => '<h1><br>'+i+'<br></h1>').join("");
}
function bmi2kg(bmi, height) {
    return round2(bmi * Math.pow((height * 30.48) / 100, 2));
}
function round2(num) {
    return +(Math.round(num + "e+2") + "e-2");
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
function doBMIprocess(height) {
    let weight = [prompt('Enter your weight in kg')??""].map((N=>isNaN(Number.parseFloat(N))||isNaN(Number(N))?"bad":Number(N)))[0]
    if (weight == 'bad'){
        mylog("Please enter a valid weight")
        return
    }
    let bmi = weight/Math.pow((height[0] * 30.48) / 100, 2)
    mylog(`Your Body Mass Index is ${round2(bmi)}`)
    if (bmi <= 18.5) {
        mylog("You are underweight.");
    } else if (bmi <= 24.9) {
        mylog("You are healthy.");
    } else if (bmi <= 29.9) {
        mylog(`You are over weight.
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height[0]))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height[0])} kg`);
    } else if (bmi > 29.9) {
        mylog(`You are obese.
        To be healthy your BMI should be between 18.5 and 24.9
        To be healthy you need to lose ${round2(weight - bmi2kg(24.9, height[0]))} kg
        To be healthy your weight should be ${bmi2kg(24.9, height[0])} kg`);
    }
    if (localStorage.getItem("history") != null) {
        localStorage.setItem("history",localStorage.getItem("history")+"@"+`{ "Date":"${date}","Weight":${weight},"Height":${height[1]}}`)
    } else {
        localStorage.setItem("history",`{ "Date":"${date}","Weight":${weight},"Height":${height[1]}}`);
    }
 
}