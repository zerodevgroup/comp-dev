import React, { createContext, useReducer, useEffect } from "react"
import { reducer, initialState } from "./reducers"
import { useActions } from "./actions"

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  // Get state and dispatch from Reacts new API useReducer. 
  const [state, dispatch] = useReducer(reducer, initialState)

  // Get actions from useActions and pass it to Context
  const actions = useActions(state, dispatch)

  // Log new state
  useEffect(() => console.log({ newState: state }),[state])
  
  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  )
}
export { StoreContext, StoreProvider }
