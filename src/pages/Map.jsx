import React,{useState,useMemo,useEffect} from 'react'
import { MapContainer, Circle, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet'

//import Input from "../components/Form/Input";
import "../Map.css"

const position = [-5.1974847,-39.299725]
// const position = [-5.4138985,-39.4595522]

const icon = L.icon({
  iconUrl: "https://img1.gratispng.com/20180320/crw/kisspng-google-map-maker-computer-icons-google-maps-image-icon-photos-maps-5ab09a37c69152.3009372315215232558133.jpg",
  iconSize:[38,38]
})

function TooltipCircle() {
  const [clickedCount, setClickedCount] = useState(0)
  const eventHandlers = useMemo(
    () => ({
      click() {
        setClickedCount((count) => count + 1)
      },
    }),
    [],
  )

  const clickedText =
    clickedCount === 0
      ? 'Click this Circle to change the Tooltip text'
      : `Circle click: ${clickedCount}`

  return (
    <Circle
      center={position}
      eventHandlers={eventHandlers}
      pathOptions={{ fillColor: 'blue' }}
      radius={250}>
      <Tooltip>{clickedText}</Tooltip>
    </Circle>
  )
}
// map = new L.Map('map', {
//   center: new L.LatLng(
//     address[0], address[1]
//   ),
//   zoom: 9
// })


function ResetCenterMap(props) {
  const { address } = props;
  const map = useMap();
  console.log(address)
  useEffect(() => {
    if (address) {
       map.setView(
        L.latLng(address[0], address[1]),
        map.getZoom(),
        {
          animate: true,
          zoomanim: {
            center:[address[0], address[1]]
          }
        }
      )
      L.marker([-5.4138985, -39.4595522]).addTo(map);
      map.zoom

    }
  }, [address]);
  return null;
}

export default function Map() {
  const [address, setAddress] = useState('')
  const [pinPosition, setPinPosition] = useState([-5.1974847,-39.299725]);

    
    function getPostionByAddress(address){
     //https://nominatim.openstreetmap.org/?addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1
      fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${address}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            console.log(data[0])
            setPinPosition([data[0].lat,data[0].lon])
          }
          }
        );
    }
  
    return (
    <div className="container">
        <h3 className="title-page-map">Cadastrar Operação no Mapa</h3> 
        <div className="container-map">  
          <div className="container-input-map">
              <input className="map-input" onChange={(value) => setAddress(value.target.value)} onBlur={(value) => console.log('value:',address)}
            />
          </div>
            <MapContainer
                    center={position}
                    zoom={12}
                    zoomControl={false}
                >
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=KJ6fapbisDbmk4xq1RUA"
            />
            <TooltipCircle />
                <Marker position={pinPosition} icon={icon}>
                    <Popup>
                        {address}
                    </Popup>
            </Marker>   
            <ResetCenterMap address={pinPosition}/>
          </MapContainer>
          <button className="btn-primary" onClick={()=> getPostionByAddress(address)} type="submit">Salvar</button>
        </div>
    </div>
  )
}

        
