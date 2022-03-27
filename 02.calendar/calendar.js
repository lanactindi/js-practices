function print_calendar(month, year){
    print_header(month, year);
    const first_day_of_month = new Date(year, month - 1, 0);
    console.log(first_day_of_month)
    const first_wday = first_day_of_month.getDay();
    console.log(' ' * 4 * first_wday);
    const last_day_of_month = new Date(year, month - 1, 0);
    const dates = getDates(first_day_of_month, last_day_of_month);
    console.log(dates)
    dates.forEach(day => {
        console.log(day.getDate().toString().padEnd(4));
        if(day.getDay() === 6){
            console.log("\n");
        }
    })
}

function print_header(month, year){
    console.log(`${month}月 ${year}年`);
    console.log('日  月  火  水  木  金  土  ');
}

function getDates(startDate, endDate) {
    const duration = endDate - startDate;
    console.log(duration)
    const interval = 1000 * 60 * 60 * 24;
    const steps = duration / interval;
    return Array.from({length: steps+1}, (v,i) => new Date(startDate.valueOf() + (interval * i)));
}

print_calendar(3, 2022)