import * as types from 'actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: []
  },
  edit: {
    status: 'INIT',
    error: -1
  },
  remove: {
    status: 'INIT',
    error: -1
  }
};

export default function event(state, action) {
  if (typeof state === 'undefined') {
    state = initialState;
  }

  console.log(action);
  switch (action.type) {
    case types.EVENT_POST:
      return update(state, {
        post: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.EVENT_POST_SUCCESS:
      return update(state, {
        post: {
          status: { $set: 'SUCCESS' }
        }
      });
    case types.EVENT_POST_FAILURE:
      return update(state, {
        post: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case types.EVENT_LIST:
      return update(state, {
        list: {
          status: { $set: 'WAITING' }
        }
      });
    case types.EVENT_LIST_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data }
        }
      });

      // loading older or newer event to be implemented..
      return state;
    case types.EVENT_LIST_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' }
        }
      });
    case types.EVENT_EDIT:
      return update(state, {
        edit: {
          status: { $set: 'WAITING' },
          error: { $set: -1 },
          event: { $set: undefined }
        }
      });
    case types.EVENT_EDIT_SUCCESS:
      return update(state, {
        edit: {
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: {
            [action.index]: { $set: action.event }
          }
        }
      });
    case types.EVENT_EDIT_FAILURE:
      return update(state, {
        edit: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case types.EVENT_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.EVENT_REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: { $splice: [[action.index, 1]] }
        }
      });
    case types.EVENT_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}
