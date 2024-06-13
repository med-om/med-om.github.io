'use strict';

const almiladi = document.getElementById('al-Miladi');
const alhijri = document.getElementById('al-Hijri');

let alSabah = document.getElementById('sabah');
let alChorok = document.getElementById('chorok');
let alDohr = document.getElementById('dohr');
let alAsr = document.getElementById('asr');
let alMaghrib = document.getElementById('maghrib');
let alIsha = document.getElementById('isha');

const titlePTM = document.getElementById('titlePTM');
const tblMonthMiladi = document.getElementById('tblMonthMiladi');
const tblMonthHijri = document.getElementById('tblMonthHijri');

const tptm = document.querySelector('.table_ptm');
const tcol = document.querySelector('.table_col');

const gregorianMonths = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']


//methodSettings : FajrAngle,MaghribAngleOrMinsAfterSunset,IshaAngleOrMinsAfterMaghrib
//tune : Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight

let url = `http://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${new Date().getMonth()+1}?latitude=35.7806&longitude=-5.8136&method=99&methodSettings=19.1,1.7,17&tune=0,0,-4.5,5,0.5,0,0,0,0`;


function getPTToday(url){

	axios.get(url)
	  .then(function (response) {
		// handle success
		
		const prayerTimes = response.data;
		const pttoday = prayerTimes.data;
		//console.log(pttoday);
		
		const date = new Date();

		// Get Dates from API for Miladi and Hijri
		let dates = pttoday[date.getDate()-1].date;

		// Get Timings for Prayer times
		let timings = pttoday[date.getDate()-1].timings;

		// Show Today's date
		almiladi.innerHTML = dates.gregorian.date;
		alhijri.innerHTML = dates.hijri.date;

		// show Prayer times
		alSabah.innerHTML = timings.Fajr.slice(0, 5);
		alChorok.innerHTML = timings.Sunrise.slice(0, 5);
		alDohr.innerHTML = timings.Dhuhr.slice(0, 5);
		alAsr.innerHTML = timings.Asr.slice(0, 5);
		alMaghrib.innerHTML = timings.Maghrib.slice(0, 5);
		alIsha.innerHTML = timings.Isha.slice(0, 5);

	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .finally(function () {
		// always executed
	  });

}

function getPTMonth(url){

	axios.get(url)
	  .then(function (response) {
		// handle success
		
		const ptMonth = response.data;
		const ptday = ptMonth.data;
		
		// Show Month and Year
		titlePTM.innerHTML = `${gregorianMonths[new Date().getMonth()] +' '+new Date().getFullYear()}`;

		// Edit Month Miladi and Hijri in the table by attr id
		tblMonthMiladi.innerHTML = gregorianMonths[new Date().getMonth()];

		//tblMonthHijri.innerHTML = ptday[0].date.hijri.month.ar+'/'+ptday[ptday.length-1].date.hijri.month.ar; 
		// Note : this API don't support our country in Hijri Months

		for(let day of ptday){

			// Get Dates and Times from API for Miladi and Hijri
			let dates = day.date;
			let timings = day.timings;

			const tr = document.createElement('tr');
			
			// Select the day of Today in table
			if(new Date().getDate() === Number(dates.gregorian.day)){
				tr.setAttribute("class","table-warning");
			}

			tptm.appendChild(tr);

			// The number of columns in this table
			for(let j=1; j<=tcol.childElementCount; j++){
				
				const td = document.createElement('td');
				td.setAttribute("id","PTM"+j);

				let checkID = "PTM"+j;
				switch (checkID) {
					case "PTM1":
						td.appendChild(document.createTextNode(dates.hijri.weekday.ar))
						break;
					case "PTM2":
						td.appendChild(document.createTextNode(Number(dates.gregorian.day)))
						break;
					// case "PTM3":
					// 	td.appendChild(document.createTextNode(Number(dates.hijri.day)))
					// 	break;
					case "PTM3":
						td.appendChild(document.createTextNode(timings.Fajr.slice(0, 5)))
						break;
					case "PTM4":
						td.appendChild(document.createTextNode(timings.Sunrise.slice(0, 5)))
						break;
					case "PTM5":
						td.appendChild(document.createTextNode(timings.Dhuhr.slice(0, 5)))
						break;
					case "PTM6":
						td.appendChild(document.createTextNode(timings.Asr.slice(0, 5)))
						break;
					case "PTM7":
						td.appendChild(document.createTextNode(timings.Maghrib.slice(0, 5)))
						break;
					case "PTM8":
						td.appendChild(document.createTextNode(timings.Isha.slice(0, 5)))

				}
				
				tr.appendChild(td);
			}
		}
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .finally(function () {
		// always executed
	  });

}

getPTToday(url);
getPTMonth(url);

