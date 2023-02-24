
import React from 'react'
import './App.css'

const App = () => {
const url = "https://api.openweathermap.org/data/2.5/"
const key = "a397dcad7898906f9274fc634fc5af4b"
const citys = ["Şehir Seçin","ADANA","ADIYAMAN","AFYONKARAHİSAR","AĞRI","AKSARAY","AMASYA","ANKARA","ANTALYA","ARDAHAN","ARTVİN","AYDIN","BALIKESİR","BARTIN","BATMAN","BAYBURT","BİLECİK","BİNGÖL","BİTLİS","BOLU","BURDUR","BURSA","ÇANAKKALE","ÇANKIRI","ÇORUM","DENİZLİ","DİYARBAKIR","DÜZCE","EDİRNE","ELAZIĞ","ERZİNCAN","ERZURUM","ESKİŞEHİR","GAZİANTEP","GİRESUN","GÜMÜŞHANE","HAKKARİ","HATAY","IĞDIR","ISPARTA","İSTANBUL","İZMİR","KAHRAMANMARAŞ","KARABÜK","KARAMAN","KARS","KASTAMONU","KAYSERİ","KIRIKKALE","KIRKLARELİ","KIRSEHİR","KİLİS","KOCAELİ","KONYA","KÜTAHYA","MALATYA","MANİSA","MARDİN","MERSİN","MUĞLA","MUŞ","NEVŞEHİR","NİĞDE","ORDU","OSMANİYE","RİZE","SAKARYA","SAMSUN","SİİRT","SİNOP","SİVAS","ŞANLIURFA","ŞIRNAK","TEKİRDAĞ","TOKAT","TRABZON","TUNCELİ","UŞAK","VAN","YALOVA","YOZGAT","ZONGULDAK"]

const [values,setValues] = React.useState({
  temperature: undefined,
  city: undefined,
  humidity: undefined,
  description: undefined,
  error: undefined
}
)

function result(data,city) {
    setValues({
      temperature: data.main.temp,
      city: data.name,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
}

function getWeather(e){
  if(e.target.value !== citys[0])
  {
    const city = e.target.value;
    fetch(`${url}weather?q=${city}&appid=${key}&units=metric&lang=tr`)
    .then((weather) => weather.json())
    .then((data)=> {
     result(data,city)
    })
  } 
  else{
    setValues({
      temperature: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined,
      error: "Lütfen Şehir Seçin."
    });
  }
}
  return (
      <div className='d-flex container'>
                <div className="title-container">
                  <h1 className="title-container__title">Günlük Hava Durumu</h1>
                  </div>
                  <div className='values'>
                  <select  className="city" onChange={(e)=>getWeather(e)}>
                  {citys.map((val,ind)=>{
                    return(
                      <option key={ind} >{val}</option>
                    )
                  })}
                  </select>
                  <br/>
                  <div className="weatherInfo">
	 {values.city && <p className="weatherKey"> Konum : 
	 		<span className="weatherValue"> { values.city }</span></p>}
	 { values.temperature && <p className="weatherKey"> Sıcaklık : 
	 		<span className="weatherValue"> { values.temperature }	</span></p>}
	 {values.humidity && <p className="weatherKey"> Nem : 
	 		<span className="weatherValue"> { values.humidity } </span></p>}
	 {values.description && <p className="weatherKey"> Koşullar : 
	 		<span className="weatherValue"> { values.description } </span></p>}
	 {values.error && <p className="weatherError">{ values.error }</p>}
	</div>
  </div>
        </div>
    );
}

export default App