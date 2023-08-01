import styles from './TableInfo.module.scss';

import React, { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getTableById, editTableRequest } from '../../Redux/tablesReducer';

const TableInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const table = useSelector(state => getTableById(state, id))[0];

  const [ status, setStatus ] = useState(table.status);
  const [ peopleAmount, setPeopleAmount ] = useState(parseInt(table.peopleAmount));
  const [ maxPeopleAmount, setMaxPeopleAmount ] = useState(parseInt(table.maxPeopleAmount));
  const [ bill, setBill ] = useState(table.bill);

  const form = useRef();

  const statusChangeHandler = (evt) => {
    setStatus(evt.target.value);
    if(evt.target.value !== 'Busy') {
      setBill(0);
      setPeopleAmount(0);
    }
  };

  const peopleAmountChangeHandler = (evt) => {
    if (parseInt(evt.target.value) > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    } else if(parseInt(evt.target.value) >= 10 ) {
      setPeopleAmount(10);
    } else {
      setPeopleAmount(evt.target.value);
    }
  };

  const maxPeopleAmountChangeHandler = (evt) => {
    parseInt(evt.target.value) >= 10 ? setMaxPeopleAmount(10) : setMaxPeopleAmount(parseInt(evt.target.value));
    if (peopleAmount > maxPeopleAmount) setPeopleAmount(maxPeopleAmount);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const payload = {};

    const data = new FormData(form.current);

    if (data) {
      payload.id = id;
      for (let [key, val] of data.entries()) {
        payload[key] = val;
      }
    }

    if(payload.status !== 'Busy') {
      payload.peopleAmount = 0;
      payload.bill = 0;
    }

    if (payload) {
      dispatch(editTableRequest(payload));
      navigate('/');
    }
  };

  return (
    <section className={styles.tableInfo}>
      <h2>Table {table.id}</h2>
      <form className={styles.tableForm} onSubmit={submitHandler} ref={form}>
        <div className={styles.tableFormGroup}>
          <label htmlFor='status' className={styles.tableLabel}>Status:</label>
          <select
            name='status'
            className='form-select'
            id='status'
            defaultValue={table.status}
            onChange={statusChangeHandler}
          >
            <option value='Free'>Free</option>
            <option value='Busy'>Busy</option>
            <option value='Cleaning'>Cleaning</option>
          </select>
        </div>
        <div className={styles.tableFormGroup}>
          <label htmlFor='people' className={styles.tableLabel}>People:</label>
          <input
            type='text'
            className={`${styles.peopleInput} form-control`}
            name='peopleAmount'
            id='people'
            value={peopleAmount}
            onChange={peopleAmountChangeHandler}
          ></input>
          <span>&nbsp; / &nbsp;</span>
          <input
            type='text'
            className={`${styles.peopleInput} form-control`}
            name='maxPeopleAmount'
            value={maxPeopleAmount}
            onChange={maxPeopleAmountChangeHandler}
          ></input>
        </div>

        {status === 'Busy' ?
          <div className={styles.tableFormGroup}>
            <label htmlFor='bill' className={styles.tableLabel}>Bill: </label>
            <span>$ &nbsp;</span>
            <input
              type='text'
              className={`${styles.billInput} form-control`}
              name='bill'
              id='bill'
              defaultValue={bill}
            ></input>
          </div>
          :
          ''
        }

        <button type='sibmit' className='btn btn-primary'>Update</button>
      </form>
    </section>
  )
}

export default TableInfo;