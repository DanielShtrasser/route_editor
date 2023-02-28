import { useState, useMemo } from 'react';
import { withYMaps, YMaps } from '@pbe/react-yandex-maps';

import styles from './App.module.scss';
import MyInput from './components/MyInput/MyInput.jsx';
import PointsList from './components/PointList/PointsList.jsx';
import Map from './components/Map/Map.jsx';


function App() {
  const [points, setPoints] = useState([])
  
  // useEffect(() => {
  //   if(points.length > 1) {
  //     points.map((point, index) => point.priority = index + 1)
  //   }
  // }, [points])

  const ConnectedMyInput = useMemo(() => {
    return withYMaps(MyInput, true, [
      'control.SearchControl',
    ]);
  }, []);

  const ConnectedMap = useMemo(() => {
    return withYMaps(Map, true, [
      'Map',
      'multiRouter.MultiRoute',
      'geocode',
      'control.SearchControl',
      'geoObject.addon.balloon',
      'templateLayoutFactory'
    ]);
  }, []);

  return (
    <div className={styles.app}>
      <YMaps query={{
        lang: 'ru_RU',
        apikey: '3235217d-d276-4978-bf9f-619150230bc6'
        }}>
        <div className={styles.pointsListWrapper}>
          <ConnectedMyInput points={points} setPoints={setPoints} />
          <PointsList points={points} setPoints={setPoints} />
        </div>
        <ConnectedMap points={points} setPoints={setPoints} />
        {/* <Map ymaps={ymaps} points={points} setPoints={setPoints} /> */}
      </YMaps>
    </div>
  );
}

export default App;
