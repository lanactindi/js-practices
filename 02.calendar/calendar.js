function printCalendar(month, year) {
  printHeader(month, year);
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstWday = firstDayOfMonth.getDay();
  const lastDayOfPreviousMonth = new Date(year, month - 1, -firstWday + 1);
  const lastDayOfCurrentMonth = new Date(year, month, 0);
  const dates = getDates(lastDayOfPreviousMonth, lastDayOfCurrentMonth);
  let str = "";
  dates.forEach((day, index) => {
    if (day.getDay() !== 0) {
      str += " ";
    }
    if (day.getDate() < 10) {
      const dateStr = day.getDate().toString();
      str += dateStr.padStart(dateStr.length + 1);
    } else {
      if (index < firstWday) {
        str += "  ";
      } else {
        str += day.getDate().toString();
      }
    }
    if (day.getDay() === 6) {
      str += "\n";
    }
  });
  console.log(str);
}

function printHeader(month, year) {
  console.log(`      ${month}月 ${year}年`);
  console.log("日 月 火 水 木 金 土");
}

function getDates(startDate, endDate) {
  const duration = endDate - startDate;
  const interval = 1000 * 60 * 60 * 24;
  const steps = duration / interval;
  return Array.from(
    {
      length: steps + 1,
    },
    (v, i) => new Date(startDate.valueOf() + interval * i)
  );
}

const argv = require("minimist")(process.argv.slice(2));
const date = new Date();
const month = argv.m || date.getMonth() + 1;
const year = argv.y || date.getFullYear();

printCalendar(month, year);
