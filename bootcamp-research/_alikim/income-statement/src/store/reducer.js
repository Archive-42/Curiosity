
// ACTIONS
export const GET_ALL = "GET ALL"
export const TOGGLE_MONTHLY = "TOGGLE_MONTHLY"
export const IS_MONTHLY = "IS_MONTHLY"
export const IS_QUARTERLY = "IS_QUARTERLY"
export const SET_OPTION = "SET_OPTION"

// ACTION CREATORS
export const setAll = (data) => ({ type: GET_ALL, data })
export const setOption = (option) => ({ type: SET_OPTION, option })
export const toggleMonthly = () => ({ type: TOGGLE_MONTHLY })
export const toggleToMonthly = () => ({ type: IS_MONTHLY })
export const toggleToQuarterly = () => ({ type: IS_QUARTERLY })

// REDUCER
export default function incomeReducer(state, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_ALL:
      return { ...state, ...action.data };
    case TOGGLE_MONTHLY:
      return { ...state, isMonthly: !state.isMonthly }
    case IS_MONTHLY:
      newState.categories.forEach(cat => {
        if (cat.subcategory_ids.length) {
          let total = 0;
          cat.subcategory_ids.map(scid => {
            const subcat = newState.subcategories[scid]
            total += subcat.monthly_values[subcat.monthly_values.length - 1].value
          })
          cat.total = total;
        }
      })
      return { ...newState, isMonthly: true }
    case IS_QUARTERLY:
      newState.categories.forEach(cat => {
        if (cat.subcategory_ids.length) {
          let total = 0;
          cat.subcategory_ids.map(scid => {
            const subcat = newState.subcategories[scid]
            total += subcat.monthly_values.reduce((val, next) => val += next.value, 0)
          })
          cat.total = total;
        }
      })
      return { ...newState, isMonthly: false }
    case SET_OPTION:
      return { ...state, option: action.option }
    default:
      return state;
  }
}