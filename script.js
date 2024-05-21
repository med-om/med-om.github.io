'use strict';

let alSabah = document.getElementById('sabah');
let alChorok = document.getElementById('chorok');
let alDohr = document.getElementById('dohr');
let alAsr = document.getElementById('asr');
let alMaghrib = document.getElementById('maghrib');
let alIsha = document.getElementById('isha');

const almiladi = document.getElementById('al-Miladi');
const alhijri = document.getElementById('al-Hijri');


function prayerTimes(){

	axios.get('http://api.aladhan.com/v1/calendar/2024/5?latitude=33.9715904&longitude=-6.8498129&method=2')
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

prayerTimes();

