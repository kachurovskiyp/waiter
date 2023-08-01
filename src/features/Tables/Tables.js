import styles from './Tables.module.scss';

import React from 'react'
import { useSelector } from 'react-redux';
import { getAllTables } from '../../Redux/tablesReducer';

import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const navigate = useNavigate();
  const tables = useSelector(state => getAllTables(state));

  const tableBtnClickHandler = (evt) => {
    evt.preventDefault();
    navigate(`/table/${evt.target.dataset.tableid}`);
  }

  return (
    <section className={styles.tables}>
      <h2>All Tables</h2>
      <ul className={styles.tableList}>
        {tables.map((table) => {
          return (
            <li key={table.id} className={styles.tableItem}>
              <p className={styles.tableId}>Table {table.id}</p>
              <p className={styles.tableStatus}><span>Status: </span>{table.status}</p>
              <a
                href='#table'
                onClick={tableBtnClickHandler}
                className='btn btn-primary'
                data-tableid={table.id}
              >
                Show more
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Tables