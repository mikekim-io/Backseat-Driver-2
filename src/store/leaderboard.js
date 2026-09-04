import { db } from '../firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

/**
 * ACTION TYPES
 */
const GET_LEADERBOARD = 'GET_LEADERBOARD';
const ADD_TO_LEADERBOARD = 'ADD_TO_LEADERBOARD';

/**
 * INITIAL STATE
 */
const INITIAL_STATE = [];

/**
 * ACTION CREATORS
 */
const getLeaderboard = (leaderboard) => ({
  type: GET_LEADERBOARD,
  leaderboard,
});

const addToLeaderboard = (newRecord) => ({
  type: ADD_TO_LEADERBOARD,
  newRecord,
});

/**
 * THUNK CREATORS
 */
export const fetchLeaderboard = () => async (dispatch) => {
  try {
    const q = query(collection(db, 'leaderboard'), orderBy('score'));
    const snapshot = await getDocs(q);
    const leaderboard = snapshot.docs.map((doc) => doc.data());
    dispatch(getLeaderboard(leaderboard));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};

export const addRecordToDb = (newRecord) => async (dispatch) => {
  try {
    await addDoc(collection(db, 'leaderboard'), newRecord);
    dispatch(addToLeaderboard(newRecord));
  } catch (error) {
    console.error('Error adding score to leaderboard:', error);
  }
};

/**
 * REDUCER
 */
export default function leaderboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return action.leaderboard;
    case ADD_TO_LEADERBOARD:
      return [...state, action.newRecord];
    default:
      return state;
  }
}
