function printCalendar(month, year){
    printHeader(month, year);
    const first_day_of_month = new Date(year, month -1, 1);
    const first_wday = first_day_of_month.getDay();
    const last_day_of_month = new Date(year, month, 0);
    const dates = getDates(first_day_of_month, last_day_of_month);
    let str =  '   '.repeat(first_wday) + (first_wday > 2 ? ' '.repeat(first_wday - 2) : '')
    dates.forEach(day => {
        if(day.getDay() !== 0 && day !== first_day_of_month){
            str += '  ';
        }
        if(day.getDate() < 10){
          str += ' ' + day.getDate().toString();
        }
        else {
          str +=  day.getDate().toString();
        }
        if(day.getDay() === 6){
            str += "\n";
        }
    })
    console.log(str)
}

function printHeader(month, year){
    console.log(`        ${month}月 ${year}年`);
    console.log('日  月  火  水  木  金  土');
}

function getDates(startDate, endDate) {
    const duration = endDate - startDate;
    const interval = 1000 * 60 * 60 * 24;
    const steps = duration / interval;
    return Array.from({length: steps+1}, (v,i) => new Date(startDate.valueOf() + (interval * i)));
}

const dayjs = require('dayjs')
const now = dayjs()
const argv = require('minimist')(process.argv.slice(2));
const month = argv.m || now.month() + 1;
const year = argv.y || now.year();

printCalendar(month, year)