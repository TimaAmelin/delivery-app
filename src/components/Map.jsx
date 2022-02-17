import React, { useContext, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import { Dot } from './Dot';
import { DateShower } from './DateShower';

export const Map = () => {
    let { dots, filterFunc, range } = useContext(dotsContext);
    let { screen, setDot, dotId, coords, setMap } = useContext(screenContext);

    const chosenDot = dots.find(dot => dot.key === dotId);

    const [bounds, setBounds] = useState({
        ne: {lat: 56.043596989588735, lng: 38.053694606445305},
        sw: {lat: 55.456987734340146, lng: 37.18440139355468}
    });

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC6fmwRAn0owGDP-Cn7J0lYGF0x4wzeTpU' }}
                defaultCenter={{lat: 55.751395, lng: 37.619048}}
                center={coords}
                defaultZoom={10}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={e => {
                    setMap({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.bounds.ne, sw: e.bounds.sw });
                }}
            >
                {
                    screen === 'dots' || screen === 'edit' ? filterFunc(dots.sort((prev, next) => Number(next.coords.lat) - Number(prev.coords.lat)).filter(
                        dot => dot.coords.lat < bounds.ne.lat &&
                            dot.coords.lat > bounds.sw.lat &&
                            dot.coords.lng < bounds.ne.lng &&
                            dot.coords.lng > bounds.sw.lng
                        )).map(dot => dot.key !== dotId ? ( 
                            <Marker 
                                key={dot.key}
                                text={dot.items}
                                lat={dot.coords.lat}
                                lng={dot.coords.lng}
                                onClick={() => setDot(dot.key)}
                            >
                                {
                                    dotId === '-1' ? <img src="./assets/markermiddle.png" className="marker-image" alt="..." /> : 
                                    Math.sqrt((dot.coords.lat - chosenDot.coords.lat)*(dot.coords.lat - chosenDot.coords.lat)*4 + (dot.coords.lng - chosenDot.coords.lng)*(dot.coords.lng - chosenDot.coords.lng)) < 0.018 * range ?
                                    <img src="./assets/markermiddle.png" className="marker-image" alt="..." /> : <img src="./assets/markerbad.png" className="marker-image" alt="..." />
                                }
                                <DateShower dotDate={dot.date} dotTime={dot.time} />
                            </Marker>
                        ) : null
                    ) : null
                }
                {
                    filterFunc(dots.filter(
                        dot => dot.coords.lat < bounds.ne.lat &&
                            dot.coords.lat > bounds.sw.lat &&
                            dot.coords.lng < bounds.ne.lng &&
                            dot.coords.lng > bounds.sw.lng
                        )).map(dot => dot.key === dotId ? ( 
                            <Marker 
                                key={dot.id}
                                text={dot.items}
                                lat={dot.coords.lat}
                                lng={dot.coords.lng}
                                onClick={() => setDot(dot.key)}
                            >
                                <img src="./assets/markergood.png" className="marker-image" alt="..." /> 
                                <DateShower dotDate={dot.date} dotTime={dot.time} />
                            </Marker>
                        ) : null
                    )
                }
                
            </GoogleMapReact>
        </div>
    );
};