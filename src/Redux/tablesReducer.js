import { API_URL } from "../config";

const LOAD_DATA = 'app/posts/add';
const EDIT_TABLE = 'app/posts/edit';

export const getAllTables = ({tables}) => tables;
export const getTableById = ({tables}, id) => tables.filter((table) => table.id === id);

export const loadData = payload => ({type: LOAD_DATA, payload});
export const editTable = payload => ({type: EDIT_TABLE, payload});

export const editTableRequest = (payload) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    console.log('payload: ', payload);
    fetch(`${API_URL}/tables/${payload.id}`, options)
      .then(() => dispatch(editTable(payload)))
  }
};

export const fetchTables = (dispatch, setError) => {
  fetch(`${API_URL}/tables`)
    .then(function (responce) {
      if (responce.status !== 200) {
        setError(responce.statusText);
      } else {
        setError('');
        return responce.json();
      }
    })
    .then(function (responce) {
      if(responce) dispatch(loadData(responce));
    });
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_DATA:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? {...table, ...action.payload} : table));
    default:
      return statePart;
  };
};

export default tablesReducer;