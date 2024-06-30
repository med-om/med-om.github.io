'use strict';

const almiladi = document.getElementById('al-Miladi');
const alhijri = document.getElementById('al-Hijri');

const alSabah = document.getElementById('sabah');
const alChorok = document.getElementById('chorok');
const alDohr = document.getElementById('dohr');
const alAsr = document.getElementById('asr');
const alMaghrib = document.getElementById('maghrib');
const alIsha = document.getElementById('isha');

const citiesSelect = document.getElementById('cities-select');

const titlePTM = document.getElementById('titlePTM');
const tblMonthMiladi = document.getElementById('tblMonthMiladi');
const tblMonthHijri = document.getElementById('tblMonthHijri');

const tptm = document.querySelector('.table_ptm');
const tcol = document.querySelector('.table_col');

const gregorianMonths = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

const cities = [
	{
	nameAR : 'أكادير',
	name : "Agadir-Ida-Ou-Tanane"
	},
	{
	nameAR : 'الحسيمة',
	name : "Al Hoceïma"
	},
	{
	nameAR : 'الدار البيضاء',
	name : "Casablanca"
	},
	{
	nameAR : 'شفشاون',
	name : "Chefchaouen"
	},
	{
	nameAR : 'الداخلة',
	name : "Dakhla"
	},
	{
	nameAR : 'الجديدة',
	name : "El Jadida"
	},
	{
	nameAR : 'الراشيدية',
	name : "Errachidia"
	},
	{
	nameAR : 'الصويرة',
	name : "Essaouira"
	},
	{
	nameAR : 'فاس',
	name : "Fès"
	},
	{
	nameAR : 'القنيطرة',
	name : "Kénitra"
	},
	{
	nameAR : 'خريبكة',
	name : "Khouribga"
	},
	{
	nameAR : 'العيون',
	name : "Laâyoune"
	},
	{
	nameAR : 'العرائش',
	name : "Larache"
	},
	{
	nameAR : 'مراكش',
	name : "Marrakech"
	},
	{
	nameAR : 'مكناس',
	name : "Meknès"
	},
	{
	nameAR : 'الناظور',
	name : "Nador"
	},
	{
	nameAR : 'ورزازات',
	name : "Ouarzazate"
	},
	{
	nameAR : 'وجدة',
	name : "Oujda-Angad"
	},
	{
	nameAR : 'الرباط',
	name : "Rabat"
	},
	{
	nameAR : 'آسفي',
	name : "Safi"
	},
	{
	nameAR : 'طنجة',
	name : "Tanger-Assilah"
	},
	{
	nameAR : 'طرفاية',
	name : "Tarfaya"
	},
	{
	nameAR : 'تازة',
	name : "Taza"
	},
	{
	nameAR : 'تطوان',
	name : "Tétouan"
	},
	{
	nameAR : 'زاكورة',
	name : "Zagora"
	}
];

for (let city of cities){

	if(city.name == "Tanger-Assilah"){
		const content = `<option selected>${city.nameAR}</option>`
		citiesSelect.innerHTML += content; 
	}else
	{
		const content = `<option>${city.nameAR}</option>`
		citiesSelect.innerHTML += content; 
	}
}

citiesSelect.addEventListener('change',function (){

	// remove the old content in the table
	tptm.textContent = '';

	let cityName = '';

	for (let city of cities){
		if (this.value == city.nameAR){
			cityName = city.name;
		}
	}

	// Show Prayer times for Today
	getPTToday(cityName);

	// Show Prayer times for Month
	getPTMonth(cityName);
});


function getPTToday(cityName){

	const params = {
		country : "MA",
		city : cityName
		};
	
	axios.get("http://api.aladhan.com/v1/timingsByCity", {
		params: params
		})
		.then(function (response) {
		// handle success
		
		const pttoday = response.data.data;
		//console.log(pttoday);
		
		// Get Dates from API for Miladi and Hijri
		let dates = pttoday.date;

		// Get Timings for Prayer times
		let timings = pttoday.timings;

		// Show Today's date
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

function getPTMonth(cityName){

	const params = {
		country : "MA",
		city : cityName
		};


	axios.get(`http://api.aladhan.com/v1/calendarByCity/${new Date().getFullYear()}/${new Date().getMonth()+1}`, {
		params: params
		})
	  .then(function (response) {
		// handle success

		const ptday = response.data.data;
		//console.log(ptday);
		
		// Show Month and Year
		titlePTM.innerHTML = `${gregorianMonths[new Date().getMonth()] +' '+new Date().getFullYear()}`;

		// Edit Month Miladi and Hijri in the table by attr id
		tblMonthMiladi.innerHTML = gregorianMonths[new Date().getMonth()];
		tblMonthHijri.innerHTML = ptday[0].date.hijri.month.ar+' / '+ptday[ptday.length-1].date.hijri.month.ar; 

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
					case "PTM3":
						td.appendChild(document.createTextNode(Number(dates.hijri.day)))
						break;
					case "PTM4":
						td.appendChild(document.createTextNode(timings.Fajr.slice(0, 5)))
						break;
					case "PTM5":
						td.appendChild(document.createTextNode(timings.Sunrise.slice(0, 5)))
						break;
					case "PTM6":
						td.appendChild(document.createTextNode(timings.Dhuhr.slice(0, 5)))
						break;
					case "PTM7":
						td.appendChild(document.createTextNode(timings.Asr.slice(0, 5)))
						break;
					case "PTM8":
						td.appendChild(document.createTextNode(timings.Maghrib.slice(0, 5)))
						break;
					case "PTM9":
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

getPTToday("Tanger-Assilah");
getPTMonth("Tanger-Assilah");

