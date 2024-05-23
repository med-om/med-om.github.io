'use strict';

let alSabah = document.getElementById('sabah');
let alChorok = document.getElementById('chorok');
let alDohr = document.getElementById('dohr');
let alAsr = document.getElementById('asr');
let alMaghrib = document.getElementById('maghrib');
let alIsha = document.getElementById('isha');

const almiladi = document.getElementById('al-Miladi');
const alhijri = document.getElementById('al-Hijri');

const tptm = document.querySelector('.table_ptm');
const tth = document.querySelector('.table_th');


function prayerTimes(){

	axios.get(`http://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${new Date().getMonth()+1}?latitude=35.7806&longitude=-5.8136&method=99&methodSettings=19,null,17`)
	  .then(function (response) {
		// handle success
		
		let prayerTimes = response.data;
		//console.log(prayerTimes);
		
		let dt = new Date();

		// Get Dates from API for Miladi and Hijri
		let dates = prayerTimes.data[dt.getDate()-1].date;
		//console.log(dates);

		// Get Timings for Prayer times
		let timings = prayerTimes.data[dt.getDate()-1].timings;
		//console.log(timings);

		// show Today's date
		almiladi.innerHTML = dates.gregorian.date;
		alhijri.innerHTML = dates.hijri.date;

		// show Prayer times
		alSabah.innerHTML = timings.Fajr;
		alChorok.innerHTML = timings.Sunrise;
		alDohr.innerHTML = timings.Dhuhr;
		alAsr.innerHTML = timings.Asr;
		alMaghrib.innerHTML = timings.Maghrib;
		alIsha.innerHTML = timings.Isha;
		
	  })
	  .catch(function (error) {
		// handle error
		console.log(error);
	  })
	  .finally(function () {
		// always executed
	  });

}

const tblMonthMiladi = document.getElementById('tblMonthMiladi');
const tblMonthHijri = document.getElementById('tblMonthHijri');

function getPTMonth(){

	axios.get(`http://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${new Date().getMonth()+1}?latitude=35.7806&longitude=-5.8136&method=99&methodSettings=19,null,17`)
	  .then(function (response) {
		// handle success
		
		let ptMonth = response.data;
		let ptday = ptMonth.data;
		let dates, timings;

		//console.log(ptday);

		// Edit Month Miladi and Hijri in the table by attr id
		tblMonthMiladi.innerHTML = ptday[0].date.gregorian.month.en;
		tblMonthHijri.innerHTML = ptday[0].date.hijri.month.ar+'/'+ptday[ptday.length-1].date.hijri.month.ar;


		for(let dt of ptday){

			// Get Dates and Times from API for Miladi and Hijri
			dates = dt.date;
			timings = dt.timings

			let tr = document.createElement('tr');
			tptm.appendChild(tr);

			// tth is number of tags <th> in table
			for(let j=1; j<=tth.childElementCount; j++){

				let td = document.createElement('td');
			
				td.setAttribute("id","PTM"+j);

				let checkID = "PTM"+j;
				switch (checkID) {
					case "PTM1":
						td.appendChild(document.createTextNode(dates.hijri.weekday.ar))
						break;
					case "PTM2":
						td.appendChild(document.createTextNode(dates.gregorian.day))
						break;
					case "PTM3":
						td.appendChild(document.createTextNode(dates.hijri.day))
						break;
					case "PTM4":
						td.appendChild(document.createTextNode(timings.Fajr))
						break;
					case "PTM5":
						td.appendChild(document.createTextNode(timings.Sunrise))
						break;
					case "PTM6":
						td.appendChild(document.createTextNode(timings.Dhuhr))
						break;
					case "PTM7":
						td.appendChild(document.createTextNode(timings.Asr))
						break;
					case "PTM8":
						td.appendChild(document.createTextNode(timings.Maghrib))
						break;
					case "PTM9":
						td.appendChild(document.createTextNode(timings.Isha))

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

prayerTimes();
getPTMonth();


