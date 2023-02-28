import { useRef } from 'react';
import { nanoid } from 'nanoid';
import styles from './MyInput.module.scss';

const MyInput = ({ymaps, points = [], setPoints}) => {
  const searchControlRef = useRef(null);

  // создание поисковика для поиска по карте
  searchControlRef.current = new ymaps.control.SearchControl({options: {provider: 'yandex#search'}})

  function addingHandler(e) {
    e.preventDefault()
    const userInput = e.target.newPoint.value.trim()

    // пользовательский ввод используется для поиска по карте,
    // формируется объект с данными для multiRouter
    if (userInput) {
      searchControlRef.current.search(userInput).then(function () {
        const geoObjectsArray = searchControlRef.current.getResultsArray();
        if (geoObjectsArray.length) {
          const newTitle = geoObjectsArray[0].properties.get('name');
          const coordinates = geoObjectsArray[0].geometry._coordinates;
  
          setPoints((state) => [
            ...state,
            {
              title: newTitle,
              coordinates: coordinates,
              priority: points.length + 1, 
              id: nanoid(5)
            }
          ])
        }
      });
    }
    e.target.reset()
  }

  return (
    <form className={styles.MyInput} onSubmit={addingHandler}>
      <input
        className={styles.input}
        placeholder="New point"
        name="newPoint" />
      <input type="submit" name="submit" value="Add point" />
    </form>
  )
}

export default MyInput;
