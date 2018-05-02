

export const TESTS_ADD = 'TESTS_ADD';
export const TESTS_UPDATE = 'TESTS_UPDATE';
export const TESTS_DELETE = 'TESTS_DELETE';
export const TEST_ADD = 'TEST_ADD';
export const TEST_UPDATE = 'TEST_UPDATE';
export const TEST_DELETE = 'TEST_DELETE';


const getTestActionTypes = {
  request: TESTS_ADD,
  success: TESTS_ADD,
  fail: TESTS_ADD,
}
const updateTestActionTypes = {
  request: TESTS_UPDATE,
  success: TESTS_UPDATE,
  fail: TESTS_UPDATE,
}
const deleteTestActionTypes = {
  request: TESTS_DELETE,
  success: TESTS_DELETE,
  fail: TESTS_DELETE,
}

const getTestsActionTypes = {
  request: TEST_ADD,
  success: TEST_ADD,
  fail: TEST_ADD,
}
const updateTestsActionTypes = {
  request: TEST_UPDATE,
  success: TEST_UPDATE,
  fail: TEST_UPDATE,
}
const deleteTestsActionTypes = {
  request: TEST_DELETE,
  success: TEST_DELETE,
  fail: TEST_DELETE,
}


const initialState = {
  data: [],
  sort: 'ASC',
  orderby: 'id',
  search: '',
  mustLoad: true,
  error: {},
  isFetching: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    
      case TESTS_ADD:
        return {
          ...state,
        }
      case TESTS_UPDATE:
        return {
          ...state,
        }
      case TESTS_DELETE:
        return {
          ...state,
        }
      case TEST_ADD:
        return {
          ...state,
        }
      case TEST_UPDATE:
        return {
          ...state,
        }
      case TEST_DELETE:
        return {
          ...state,
        }
    default: return state
  }
}



export const  getTestRequest = () => {
  
}

export const  updateTestRequest = () => {
  
}

export const  deleteTestRequest = () => {
  
}

export const  getTestsRequest = () => {
  
}

export const  updateTestsRequest = () => {
  
}

export const  deleteTestsRequest = () => {
  
}
