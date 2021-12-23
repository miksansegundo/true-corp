import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useDispatch } from 'react-redux';
import {
  setTitle,
  setProject,
  toggleStop,
  editTimer,
  saveTimer,
  removeTimer
} from './timersSlice';
import styles from './Timers.module.css';

dayjs.extend(duration)

export default function Timer({ id, startTime, stopTime, title, project, editMode }) {
  const dispatch = useDispatch();
  const timer = dayjs.duration(dayjs().diff(dayjs(startTime), 'seconds'), 'seconds').format('HH:mm:ss')
  const stopTimer = dayjs.duration(dayjs(stopTime).diff(dayjs(startTime), 'seconds'), 'seconds').format('HH:mm:ss')

  return (
    <div key={id} className={styles.timer}>
      <div>
        {!editMode && <div className={styles.text}>{title}</div>}
        {!editMode && <div className={styles.text}>{project}</div>}
        {editMode && (
          <div>
            <input
              className={styles.textbox}
              aria-label="Set title"
              placeholder="Title"
              value={title}
              onChange={(e) => dispatch(setTitle({ id, value: e.target.value }))}
            />
          </div>
        )}
        {editMode && (
          <div>
            <input
              className={styles.textbox}
              aria-label="Set project"
              placeholder="Project"
              value={project}
              onChange={(e) => dispatch(setProject({ id, value: e.target.value }))}
            />
          </div>
        )}
        <div className={styles.value}>{stopTime ? stopTimer : timer}</div>
        <button 
          className={styles.icon}
          onClick={(e) => dispatch(toggleStop({ id }))}
        >{stopTime ? '▶︎' : '◼︎'}</button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.buttonEdit}
          onClick={() => dispatch(editMode ? saveTimer({ id }) : editTimer({ id }))}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(removeTimer({ id }))}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
