const date = new Date();
var currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

function mylog(a) {
    var div = document.getElementById("mydiv");
    div.innerHTML += "<h1><br>" + a + "</br></h1>";
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

var the_BMI, the_height, the_heights, the_weight;

function getHeight() {
    the_height = prompt("Enter the height in feet: ");
    const parse = (/^(?:[0-9]{1,}'[0-1]{1,2})|(?:^[0-9]{1,}$)$/g).exec(the_height);
    if (parse !== null) {
        myFunction(Number.parseFloat(parse[0]));
    } else {
        mylog("Please enter a valid height.");
    }
}
function myFunction(the_height) {
    the_weight = Number.parseFloat(prompt("Enter the weight in kg: "));
    if (isNaN(the_weight)) {
        mylog("Please enter a valid weight.");
        return;
    }
    the_BMI = the_weight / Math.pow((the_height * 30.48) / 100, 2);
    mylog(`Your Body Mass Index is ${round2(the_BMI)}`);
    if (the_BMI <= 18.5) {
        mylog("You are underweight.");
    } else if (the_BMI <= 24.9) {
        mylog("You are healthy.");
    } else if (the_BMI <= 29.9) {
        mylog("You are over weight.");
        mylog(
            `To be healthy you need to lose ${round2(the_weight - bmi2kg(24.9, the_height))} kg`,
        );
        mylog(
            `To be healthy your weight should be ${bmi2kg(24.9, the_height)} kg`,
        );
    } else if (the_BMI > 29.9) {
        mylog("You are obese.");
        mylog("To be healthy your BMI should be between 18.5 and 24.9");
        mylog(
            `To be healthy you need to lose ${round2(the_weight - bmi2kg(24.9, the_height))} kg`,
        );
        mylog(
            `To be healthy your weight should be ${bmi2kg(24.9, the_height)} kg`,
        );
    }
    if (localStorage.getItem("height") != null) {
        localStorage.setItem(
            "height",
            localStorage.getItem("height") +
                "@" +
                `{ "Date":"${currentDate}","Weight":${the_weight},"Height":${the_height}}`,
        );
    } else
        localStorage.setItem(
            "height",
            `{ "Date":"${currentDate}","Weight":${the_weight},"Height":${the_height}}`,
        );
}

document.getElementById("calc").addEventListener("click", function () {
    document.getElementById("mydiv").innerHTML = "";
    getHeight();
});
document.getElementById("recalc").addEventListener("click", function () {
    document.getElementById("mydiv").innerHTML = "";
    myFunction(Number.parseFloat(localStorage.getItem("savedHeight")));
});
document.getElementById("chistory").addEventListener("click", function () {
    document.querySelector("table").innerHTML = "";
    document.getElementById("mydiv").innerHTML = "";
});
var clicked;
document.getElementById("history").addEventListener("click", function () {
    clicked = true;
    document.getElementById("mydiv").innerHTML = "";

    var dates = localStorage.getItem("height").split("@");

    dates.forEach((element, index) => {
        dates[index] = JSON.parse(element);
    });

    let table = document.querySelector("table");
    if (clicked === true) {
        table.innerHTML = "";
        generateTable(table, dates);
        generateTableHead(table, Object.keys(dates[0]));
    }
});
