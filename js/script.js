function change(num) {
    if (num < 10)
        num = "0" + num
    return num
}


let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let eem = "Electrical & Electronics Measurement";
let em = "Electric Machines-I";
let digi = "Digital Eletronics";
let eth = "Values & Ethics in Profession";
let th = "Thermal Power Engineering";
let evs = "Environmental Science";
let lab1 = "Lab 1st Half";
let lab2 = "Lab 2nd Half";
let lab = "Lab";
let b = "Lunch Break";
let free = "Free Period"

let routine = {
    1: [{ timeStart: 1000, timeEnd: 1050, sub: eem },
    { timeStart: 1050, timeEnd: 1140, sub: digi },
    { timeStart: 1140, timeEnd: 1230, sub: em },
    { timeStart: 1230, timeEnd: 1410, sub: b },
    { timeStart: 1410, timeEnd: 1500, sub: free },
    { timeStart: 1500, timeEnd: 1550, sub: evs },
    { timeStart: 1550, timeEnd: 1640, sub: eem },
    { timeStart: 1640, timeEnd: 1730, sub: free }],


    2: [{ timeStart: 1000, timeEnd: 1050, sub: em },
    { timeStart: 1050, timeEnd: 1140, sub: eem },
    { timeStart: 1140, timeEnd: 1230, sub: digi },
    { timeStart: 1230, timeEnd: 1410, sub: b },
    { timeStart: 1410, timeEnd: 1500, sub: th },
    { timeStart: 1500, timeEnd: 1550, sub: evs },
    { timeStart: 1550, timeEnd: 1640, sub: lab1 },
    { timeStart: 1640, timeEnd: 1730, sub: lab2 }],

    3: [{ timeStart: 1000, timeEnd: 1050, sub: eem },
    { timeStart: 1050, timeEnd: 1140, sub: evs },
    { timeStart: 1140, timeEnd: 1230, sub: eth },
    { timeStart: 1230, timeEnd: 1410, sub: b },
    { timeStart: 1410, timeEnd: 1500, sub: eem },
    { timeStart: 1500, timeEnd: 1550, sub: eth },
    { timeStart: 1550, timeEnd: 1640, sub: lab1 },
    { timeStart: 1640, timeEnd: 1730, sub: lab2 }],


    4: [{ timeStart: 1000, timeEnd: 1050, sub: em },
    { timeStart: 1050, timeEnd: 1140, sub: digi },
    { timeStart: 1140, timeEnd: 1230, sub: eth },
    { timeStart: 1230, timeEnd: 1410, sub: b },
    { timeStart: 1410, timeEnd: 1550, sub: lab },
    { timeStart: 1550, timeEnd: 1640, sub: th },
    { timeStart: 1640, timeEnd: 1730, sub: evs }],

    5: [{ timeStart: 1000, timeEnd: 1050, sub: em },
    { timeStart: 1050, timeEnd: 1140, sub: lab },
    { timeStart: 1230, timeEnd: 1410, sub: b },
    { timeStart: 1410, timeEnd: 1500, sub: th },
    { timeStart: 1500, timeEnd: 1550, sub: eth },
    { timeStart: 1550, timeEnd: 1640, sub: digi },
    { timeStart: 1640, timeEnd: 1730, sub: free },
    ]
};


let t = document.getElementById("time")
let dt = document.getElementById("date")

let hrs = 0;
let mins = 0;
let secs = 0;
let day = 0;

let notation = " AM"
setInterval(() => {
    let time = new Date();
    hrs = time.getHours();

    if (hrs >= 12)
        notation = " PM";

    if (hrs > 12)
        hrs = hrs - 12;

    mins = time.getMinutes();
    secs = time.getSeconds();

    hrs = change(hrs);
    mins = change(mins);
    secs = change(secs);

    t.innerText = hrs + " : " + mins + " : " + secs + notation;

    d = time.getDate();
    day = dayArray[time.getDay()];
    month = monthArray[time.getMonth()];
    year = time.getFullYear();

    dt.innerText = d + " " + month + " , " + year + " - " + day;

}, 1000);



let nextIndex = 0;
function generateSubject(hrs, mins, day) {

    if (day == 0 || day == 6)
        return "Weekend Holiday!"

    if (hrs < 10) {
        return "Yet to Start! Good Luck"
    }


    else if ((hrs >= 17 && mins > 30) || (hrs > 17)) {
        return "Day Over!";
    }

    else {
        for (let index = 0; index < routine[day].length; index++) {
            let x = hrs * 100 + mins;

            if (x >= routine[day][index].timeStart && x < routine[day][index].timeEnd) {
                nextIndex = index;
                return routine[day][index].sub;
            }
        }
    }
}

function generateNextSubject(hrs, mins, day) {

    if (day == 0 || day == 6)
        return "Weekend Holiday!"

    if (hrs < 10) {
        return routine[day][0].sub
    }

    else if ((hrs >= 16 && mins > 39)) {
        return "Day Over!";
    }

    else if ((hrs >= 17 && mins > 00)) {
        return "Day Over!";
    }

    else if ((hrs >= 17 && mins > 30) || (hrs > 17)) {
        return "Day Over!";
    }

    if (routine[day][nextIndex].sub == "lab") { return "Day Over!"; }


    return routine[day][nextIndex + 1].sub;
}

function generateRemainingTime(hrs, mins, day) {
    if (day == 0 || day == 6)
        return "Starts Monday"

    if (hrs < 10) {
        return "--:-- AM"
    }

    else if ((hrs > 17) || (hrs >= 17 && mins > 30)) {
        return "--:-- PM"
    }

    let st, et;

    for (let index = 0; index < routine[day].length; index++) {
        let x = hrs * 100 + mins;

        if (x >= routine[day][index].timeStart && x < routine[day][index].timeEnd) {
            st = routine[day][index].timeStart;
            et = routine[day][index].timeEnd;
            break;
        }
    }

    st = st.toString();
    et = et.toString();

    sh = st[0] + st[1]
    eh = et[0] + et[1]

    sm = st[2] + st[3]
    em = et[2] + et[3]

    return sh+":"+sm + " to " + eh+":"+em;
}

function generateNextTime(hrs, mins, day) {
    if (day == 0 || day == 6)
        return "From Monday Morning"

    if (hrs < 10) {
        return "10:00 AM"
    }

    else if ((hrs >= 17 && mins > 30) || (hrs > 17)) {
        return "Tomorrow Morning";
    }

    tt = routine[day][nextIndex + 1].timeStart;
    tt = tt.toString();
    return tt[0]+tt[1]+":"+tt[2]+tt[3];
}


let current_sub = document.getElementById("current-sub")
let next_sub = document.getElementById("next-sub")
let left_time = document.getElementById("left-time")
let next_time = document.getElementById("next-time")
setInterval(() => {
    let time = new Date();
    hrs = time.getHours()
    mins = time.getMinutes()
    secs = time.getSeconds()
    day = time.getDay();

    current_sub.innerText = generateSubject(hrs, mins, day);
    next_sub.innerText = generateNextSubject(hrs, mins, day);
    left_time.innerText = generateRemainingTime(hrs, mins, day)
    next_time.innerText = generateNextTime(hrs, mins, day);

})
