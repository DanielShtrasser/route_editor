import * as React from 'react'
import move from "lodash-move";
import Reorder from 'react-reorder';

import styles from './PointList.module.scss'

import Point from '../Point/Point'

const PointsList = ({ points = [], setPoints }) => {

  const  deleteById = (id) => {
    setPoints((points) => points.filter(a => a.id !== id))
  }

  const onReorder = (e, from, to) => {
    setPoints(move(points, from, to));
  };

  return (
      <div className={styles.pointsList}>
        <Reorder
          reorderId='reorderId'
          lock='horizontal'
          list={points}
          onReorder={onReorder}
        >
          {points.map(point =>
          <div key={point.id}>{<Point point={point} deleteById={deleteById} />}</div>)}
        </Reorder>
      </div>
  )
}

export default PointsList
