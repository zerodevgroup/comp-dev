const initialState = {
  teamMember: {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    memberId: "",
    role: "",
  },
  teamMemberCurrent: {
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    memberId: "",
    role: "",
  },
  teamMemberLookup: {
    searchValue: "",
    message: "Showing most recent teamMember entries",
    type: "recent",
  },
}

const types = {
  TEAM_MEMBER_UPDATE: "TEAM_MEMBER_UPDATE",
  TEAM_MEMBER_SET_INITIAL_STATE: "TEAM_MEMBER_SET_INITIAL_STATE",
  TEAM_MEMBER_CURRENT_UPDATE: "TEAM_MEMBER_CURRENT_UPDATE",
  TEAM_MEMBER_CURRENT_SET_INITIAL_STATE: "TEAM_MEMBER_CURRENT_SET_INITIAL_STATE",
  TEAM_MEMBER_LOOKUP_UPDATE: "TEAM_MEMBER_LOOKUP_UPDATE",
  TEAM_MEMBER_LOOKUP_SET_INITIAL_STATE: "TEAM_MEMBER_LOOKUP_SET_INITIAL_STATE",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_MEMBER_UPDATE:
      return {
        ...state,
        teamMember: action.teamMemberData
      }
    case types.TEAM_MEMBER_SET_INITIAL_STATE:
      return {
        ...state,
        teamMember: initialState.teamMember
    }
    case types.TEAM_MEMBER_CURRENT_UPDATE:
      return {
        ...state,
        teamMemberCurrent: action.teamMemberCurrentData
      }
    case types.TEAM_MEMBER_CURRENT_SET_INITIAL_STATE:
      return {
        ...state,
        teamMemberCurrent: initialState.teamMemberCurrent
    }
    case types.TEAM_MEMBER_LOOKUP_UPDATE:
      return {
        ...state,
        teamMemberLookup: action.teamMemberLookupData
      }
    case types.TEAM_MEMBER_LOOKUP_SET_INITIAL_STATE:
      return {
        ...state,
        teamMemberLookup: initialState.teamMemberLookup
    }
    default:
      throw new Error("Unexpected action")
  }
}

export { initialState, types, reducer }
