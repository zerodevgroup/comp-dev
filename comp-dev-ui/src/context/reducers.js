const initialState = {
  workflow: {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  },
  wiki: {
    pages:  {
        "enrollment": {
            "title": "Enrollment",
            "content": `\
# Enrollment
  * One
  * Two
`
        }
    },
    currentPage: "",
  },
  campaign: {
      /* etc */
              timeStamp: null,
              MAX_ATTEMPTS: 350,
              DELAY_BETWEEN_ATTEMPTS: 2000,
              attemptCount: 0,
              showEmailTemplate: false,
              showCampaign: true,
              showProgress: false,
              isABTesting: false,
              campaign: {
                  campaign_name: "",
                  campaign_start_time: "",
                  campaign_end_time:"" 
              },
              expanded: 0,
              totalCount: 0,
              currentFilters: [],
              availableFilters: [
                  {
                      name: "Age Range",
                      type: "dropdown",
                      data: ['>65', '46-65', '31-45', '21-30', ''],
                      id: "AGE_RANGE"
                  },
                  {
                      name: "Gender",
                      type: "dropdown",
                      data: ['M', 'F'],
                      id: "GENDER_CD"
                  },
                  {
                      name: "Maritial Status",
                      type: "dropdown",
                      data: ['MAR', 'SEP', 'WID', 'SIN', 'UN', 'DIV'],
                      id: "MARITAL_STATUS_CD"
                  },
                  {
                      name: "Zip Code",
                      type: "input",
                      validation: "zipCode",
                      id: "ZIP_CD"
                  },
                  {
                      name: "County Name",
                      type: "input",
                      id: "COUNTY_NM"
                  },
                  {
                      name: "Group Number",
                      type: "input",
                      id: "GP_DIVN_NB"
                  },
                  {
                      name: "Group Name",
                      type: "input",
                      id: "GP_NB"
                  },
                  {
                      name: "Address Type",
                      type: "input",
                      id: "ADDRESS_TYPE_CD"
                  },
                  {
                      name: "MyHealth",
                      type: "dropdown",
                      data: ['Y', 'N'],
                      id: "MYHEALTH_IND"
                  },
                  {
                      name: "Diabetic",
                      type: "dropdown",
                      data: ['Y', 'N'],
                      id: "DIAB_IND"
                  },
                  {
                      name: "Dependant Code",
                      type: "dropdown",
                      data: ['01', '03', '05', '09', '10', '17', '18', '19', '22', '23', '24', '26', '53', '60'],
                      id: "DEPENDENT_CD"
                  },
                  {
                      name: "Email Enrolled",
                      type: "dropdown",
                      data: ['Y', 'N'],
                      id: "EMAIL_IND"
                  },
                  {
                      name: "Language",
                      type: "dropdown",
                      data: ['ENGLISH', 'SPANISH'],
                      id: "MEMBER_LANGUAGE_CD"
                  }
                  ,
                  {
                      name: "Product",
                      type: "input",
                      id: "PRODUCT_TYPE_CD"
                  }
                  // {
                  //     name: "Miles to Retail",
                  //     // type: "dropdown",
                  //     data: ['Within 10 Miles', 'Outside 10 Miles'],
                  //     id: "DISTANCE_TO_RTL_CENTER"
                  // }
              ],
              availableEmailTemplates: ["Default", "Template 1", "Template 2", "Template 3"],
              availableActions: ["Send To Email", "Visit Retail Center", "Visit PCP"],
              actions: {
                  "Send To Email": [
                      {
                          "name":"SEND_TO_EMAIL_Y",
                          "filters":[
                              {
                                  "id":"EMAIL_IND",
                                  "value":"Y"
                              }
                          ]
                      },
                      {
                          "name":"SEND_TO_EMAIL_N",
                          "filters":[
                              {
                                  "id":"EMAIL_IND",
                                  "value":"N"
                              }
                          ]
                      }
                  ],
                  "Visit Retail Center": [
                      {
                          "name":"VISIT_RETAIL_CENTER",
                          "filters":[
                              {
                                  "id":"DISTANCE_TO_RTL_CENTER",
                                  "value":"10",
                                  "operator":"<="
                              },
                              {
                                  "id":"EMAIL_IND",
                                  "value":"Y"
                              }
                          ]
                      },
                    
                      {
                          "name":"VISIT_LOCAL_WALMART",
                          "filters":[
                              {
                                  "id":"DISTANCE_TO_RTL_CENTER",
                                  "value":"10",
                                  "operator":">"
                              },
                              {
                                  "id":"EMAIL_IND",
                                  "value":"Y"
                              }
                          ]
                      }
                  ],
                  "Visit PCP": [
                      {
                          "name":"VISIT_PCP",
                          "filters":[
                              {
                                  "id":"EMAIL_IND",
                                  "value":"Y"
                              }
                          ]
                      }
                  ]
              },
              availableFollowups: ["Notification Received", "MHL Registered"],
              availableTimePeriods: ['1 day', '3 days', '5 days']
      }
  }


const types = {
  WORKFLOW_UPDATE: "WORKFLOW_UPDATE",
  WIKI_UPDATE: "WIKI_UPDATE",
  CAMPAIGN_SET_INITIAL_STATE: "CAMPAIGN_SET_INITIAL_STATE"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WORKFLOW_UPDATE:
      return {
        ...state,
        workflow: action.payload
      }
    case types.CAMPAIGN_SET_INITIAL_STATE:
      return {
        ...state,
        campaign: initialState.campaign
    }
    case types.CAMPAIGN_UPDATE:
        return {
          ...state,
          campaign: action.payload
        }
    case types.WIKI_UPDATE:
        return {
          ...state,
          wiki: action.payload
        }
    default:
      throw new Error("Unexpected action")
  }
}
export { initialState, types, reducer }
