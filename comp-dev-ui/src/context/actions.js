import { types } from "./reducers"
export const useActions = (state, dispatch) => {
  function workflowUpdate(newWorkflow) {
    // Simple dispatch to reducer (for now)
    dispatch({ type: types.WORKFLOW_UPDATE, payload: newWorkflow })
  }

  function setCampaignInitialState() {

    dispatch({ type: types.CAMPAIGN_SET_INITIAL_STATE })
  } 

  function campaignUpdate(newCampaign) {

    dispatch({ type: types.CAMPAIGN_UPDATE, payload: newCampaign})
  } 

  function wikiUpdate(newWiki) {
    dispatch({type: types.WIKI_UPDATE, payload: newWiki})
  }

  return {
    workflowUpdate,
    campaignUpdate,
    setCampaignInitialState,
    wikiUpdate,
  }
}

