import { useEffect, useRef } from 'react';
// import { useYMaps } from '@pbe/react-yandex-maps';

import styles from './Map.module.scss';

const Map = ({ymaps, points, setPoints }) => {
  // const ymaps = useYMaps([
  //   'Map',
  //   'multiRouter.MultiRoute',
  //   'geocode',
  //   'control.SearchControl',
  //   'geoObject.addon.balloon',
  //   'templateLayoutFactory'
  // ]);
  const mapRef = useRef(null);
  const multiRouteRef = useRef(null);
  // const searchControlRef = useRef(null);
  
  useEffect(() => {
    if (ymaps) {
      // создание карты
      mapRef.current = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [],
      });

      // создание маршрута
      multiRouteRef.current = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [],
          params: {reverseGeocoding: true}
        },
        {
          wayPointDraggable: true,
          viaPointDraggable: true,
        },
      );

      // добавление маршрута на карту
      mapRef.current.geoObjects.add(multiRouteRef.current);

      // приделываются балуны
      multiRouteRef.current.model.events.add("requestsuccess", function() {
          const wayPoints = multiRouteRef.current.getWayPoints();
          wayPoints.each((p) => {
            ymaps.geoObject.addon.balloon.get(p);
            p.options.set({
            balloonContentLayout: ymaps.templateLayoutFactory.createClass(
              '{{ properties.address|raw }}'
              )
            });
          })
        })

      // создание поиска по карте
    }
    return function() {
      if(mapRef.current) mapRef.current.destroy()
    }
  }, [ymaps]);

  useEffect(() => {
    // изменение маршрута
    if (multiRouteRef.current  && points.length !== 1) {
      const pointsTitles = points.map((p) => {
        return p.title
      })
      multiRouteRef.current.model.setReferencePoints(pointsTitles);
      
      // установка центра карты на последнюю точку маршрута
      if (points.length > 1) {
        const lastPointCoord = points[points.length-1].coordinates
        if(mapRef.current) mapRef.current.setCenter(lastPointCoord, 14)
      }
    }
  }, [points, setPoints, ymaps.geoObject.addon.balloon, ymaps.templateLayoutFactory]);

  return <div className={styles.map} id="map" data-testid="map" ></div>;
};

export default Map;


// function changeOfRoute() {
//   if (multiRouteRef.current  && points.length !== 1) {
//     const pointsTitles = points.map((p) => {
//       return p.title
//     })
//     multiRouteRef.current.model.setReferencePoints(pointsTitles).then();
    
//     // установка центра карты на последнюю точку маршрута
//     if (points.length > 1 && points[points.length-1].coordinates) {
//       const lastPointCoord = points[points.length-1].coordinates
//       if(mapRef.current) mapRef.current.setCenter(lastPointCoord, 14)
//       setTimeout(() => baloonAdding(), 2000)
//       // baloonAdding()
//     }
//   }
// }

    // function baloonAdding() {
    //   console.log('baloonAdding')
    //   const wayPoints = multiRouteRef.current.getWayPoints();
    //   wayPoints.each((p) => {
    //     console.log('p ', p)
    //     ymaps.geoObject.addon.balloon.get(p);
    //     p.options.set({
    //       balloonContentLayout: ymaps.templateLayoutFactory.createClass(
    //         '{{ properties.address|raw }}'
    //         )
    //       });
    //     })
    // }

    // элементы списка (points) дополняются даннными, нормализуется адрес
    // if(searchControlRef.current) {
    //   if(points.length && !points[points.length-1].coordinates) {
    //     console.log('augmentingPointObjectsWithData')
    //     const copyOfPoints = points.slice();
    //     const lastPoint = copyOfPoints.pop();

    //     searchControlRef.current.search(lastPoint.title).then(function () {
    //       const geoObjectsArray = searchControlRef.current.getResultsArray();
    //       if (geoObjectsArray.length) {
    //         lastPoint.title = geoObjectsArray[0].properties.get('name');
    //         lastPoint.coordinates = geoObjectsArray[0].geometry._coordinates;

    //         copyOfPoints.push(lastPoint);
    //         setPoints(copyOfPoints);
    //       }
    //     });
    //   }
    // }
