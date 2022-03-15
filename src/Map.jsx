import React,{useState,useMemo} from 'react'
import { MapContainer, Circle, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'

import Input from "./components/Form/Input";
import "./Map.css"

const position = [-5.1974847,-39.299725]

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
      radius={200}>
      <Tooltip>{clickedText}</Tooltip>
    </Circle>
  )
}

export default function Map() {
    return (
    <div className="container">
        <h3 className="title-page-map">Cadastrar Operação no Mapa</h3>
         
        <div className="container-map">  
          <div className="container-input-map">
              <input  className="map-input"
              />
          </div>
            <MapContainer
                    center={position}
                    zoom={20}
                    zoomControl={false}
                >
                <TileLayer
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=KJ6fapbisDbmk4xq1RUA"
            />
            <TooltipCircle />
            
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup.
                    </Popup>
                </Marker>       
            </MapContainer>
        </div>
    </div>
  )
}

        
