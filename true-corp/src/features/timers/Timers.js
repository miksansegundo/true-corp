import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTimer, fecthAsyncTimers } from './timersSlice';
import styles from './Timers.module.css';
import Timer from './Timer'

export function Timers() {
  const list = useSelector((state) => state.timers.list)
  const dispatch = useDispatch();
  const [updateTimers, setUpdateTimers] = useState(false)

  useEffect(() => {
    dispatch(fecthAsyncTimers())
    
    const interval = setInterval(() => {
      setUpdateTimers(new Date().getTime())
    }, 1000)

    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <header className={styles.header}>Timers</header>
      {list.map((timer) => <Timer {...timer} />)}
      <button
        className={styles.iconAdd}
        onClick={() => dispatch(addTimer())}
      >
        +
      </button>
    </div>
  );
}
