import React, { useState, useMemo, useEffect } from 'react'

import {
  MapContainer,
  Circle,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'

//import Input from "../components/Form/Input";
import "../Map.css"
import myPin from "../assets/pin.png";
import myPinLeaf from "../assets/leaf-red.png";

const position = [-5.1974847,-39.299725]
// const position = [-5.4138985,-39.4595522]

const icon = L.icon({
  // iconUrl: "https://w7.pngwing.com/pngs/772/370/png-transparent-computer-icons-google-maps-location-map-angle-text-triangle.png",
  iconUrl:myPin,
  iconSize:[38,38]
})
const iconLeaf = L.icon({
  iconUrl:myPinLeaf,
  iconSize:[38,38]
})

const INITIAL_ZOOM = 1;

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
      pathOptions={{ fillColor: 'red' }}
      radius={250}>
      <Tooltip>{clickedText}</Tooltip>
    </Circle>
  )
}

function ResetCenterMap(props) {
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM);
  const { address } = props;
  const map = useMap();
  
  useEffect(() => {
    if (address) {
      setZoomLevel(18)
      map.flyTo([address[0], address[1]], zoomLevel);
    }
  }, [address]);

  const layer = L.marker([-4.9782126,-39.0493627]).addTo(map);
  layer.addTo(map);
  
  //Barueri-SP
  const marker = L.marker([-23.510743, -46.9176271],{icon:iconLeaf})
    .addTo(map)
    .bindPopup("Poup em outro estilo.")
    .bindTooltip("ToolTip em outro estilo");
  
  marker.on('click', function(e){
      console.log('meu marker',e)
      map.flyTo(e.latlng, zoomLevel);
  });
  
  map.on('click', function (e) {
    console.log("pegando evento: ", e)
  });

  return null;
}

function MyComponent() {
    const [zoomLevel, setZoomLevel] = useState(5); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    return null
}

function LocationMarker() {
  const [position, setPosition] = useState(null)
  
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 10)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Você está Aqui!</Popup>
    </Marker>
  )
}

export default function Map() {
  const [address, setAddress] = useState('')
  const [pinPosition, setPinPosition] = useState([-5.1974847,-39.299725]);

    function getPostionByAddress(address){
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
              <input className="map-input" onChange={(value) => setAddress(value.target.value)}/>
          </div>
            <MapContainer
                    center={position}
                    zoom={INITIAL_ZOOM}
                    zoomControl={false}
                >
              <TileLayer
                  attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                  url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=KJ6fapbisDbmk4xq1RUA"
              />
              <Marker position={pinPosition} icon={icon} >
                <Popup>Popup</Popup>
              </Marker>   
              <Marker position={[51.51, -0.09]}>
                  <Popup>Popup for Marker</Popup>
                  <Tooltip>Tooltip for Marker</Tooltip>
              </Marker>
              <ResetCenterMap address={pinPosition}/>
              {/* <MyComponent /> */}
              <LocationMarker />
          </MapContainer>
          <button className="btn-primary-map" onClick={()=> getPostionByAddress(address)} type="submit">Salvar</button>
        </div>
    </div>
  )
}

        
