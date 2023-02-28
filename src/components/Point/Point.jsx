import * as React from 'react'


import styles from './Point.module.scss';

const Point = ({point, deleteById}) => {

  return (
    <div
      id={point.id}
      className={styles.point}
      data-testid='point'
    >
      <span className={styles.point__address}>{`${point.title}`}</span>
      <button onClick={() => deleteById(point.id)} className={styles.point__delBtn}>X</button>
    </div>
  )
}

export default Point
