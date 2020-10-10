import { types } from "./reducers"
export const useActions = (state, dispatch) => {
  function teamMemberUpdate(teamMemberData) {
    dispatch({ type: types.TEAM_MEMBER_UPDATE, teamMemberData: teamMemberData })
  }

  function teamMemberSetInitialState() {
    dispatch({ type: types.TEAM_MEMBER_SET_INITIAL_STATE })
  }

  function teamMemberCurrentUpdate(teamMemberCurrentData) {
    dispatch({ type: types.TEAM_MEMBER_CURRENT_UPDATE, teamMemberCurrentData: teamMemberCurrentData })
  }

  function teamMemberCurrentSetInitialState() {
    dispatch({ type: types.TEAM_MEMBER_CURRENT_SET_INITIAL_STATE })
  }

  function teamMemberLookupUpdate(teamMemberLookupData) {
    dispatch({ type: types.TEAM_MEMBER_LOOKUP_UPDATE, teamMemberLookupData: teamMemberLookupData })
  }

  function teamMemberLookupSetInitialState() {
    dispatch({ type: types.TEAM_MEMBER_LOOKUP_SET_INITIAL_STATE })
  }

  return {
    teamMemberUpdate,
    teamMemberSetInitialState,
    teamMemberCurrentUpdate,
    teamMemberCurrentSetInitialState,
    teamMemberLookupUpdate,
    teamMemberLookupSetInitialState,
  }
}
