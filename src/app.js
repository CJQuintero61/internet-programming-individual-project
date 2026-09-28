/*
  JavaScript file for the internet programming individual project

  The documentatin for the API is found at https://dash.valorant-api.com/endpoints/agents

  Created By: Christian Quintero
  Created On: 09/28/2026
*/

/*
    global constants

    API_URL (str) - the API URL to fetch a response from
    AGENT_SELECT (HTMLElement) - the dropdown element for selecting an agent
*/
const API_URL = "https://valorant-api.com/v1/agents"


async function getResponse() {
    /*
        this async function fetches the json response data from the API
        and parses it into a data array.

        Returns:
            Promise - a promise that resolves to the agents array
    */
    
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }
    // parsedResponse has a status and a data array
    const parsedResponse = await response.json();
    return parsedResponse.data;
}


function fillAgentDropdown(agentList) {
    /*
        this function fills the agent dropdown with the list of agents
        fetched from the API.
    */
    const agentSelect = document.querySelector("#agent-select");

    // clear the loading option after the agents are loaded
    agentSelect.innerHTML = "";

    agentList.forEach((agent) => {
        // create a new option element for each agent
        const option = document.createElement("option");

        /*
            due to an issue with the API, there is 1 agent that is duplicated
            in the response. To filter to the correct agents, the API
            says to use 'isPlayableCharacter' and only take the true entries
        */
        if (agent.isPlayableCharacter) {
            option.value = agent.displayName;
            option.textContent = agent.displayName;
            agentSelect.appendChild(option);
        }
    });
}


function findAgent(agentList, displayName) {
    /*
        a small helper function to find the agent object
        that matches the given display name.

        Args:
            agentList (array) - the list of agents fetched from the API
            displayName (str) - the display name of the agent to find

        Returns:
            object - the selected agent's data object
    */
    return agentList.find((agent) => agent.displayName === displayName);
}


async function main() {
    /*
        this function is the main entry point for the app.
        It fetches the agent data from the API, fills the dropdown, and displays the details of the currently selected agent.
    */
    

    // since getResponse() can throw an error, we catch that error and log it here
    try {
        // at this point, the agentList is a regular array ready for use
        const agentList = await getResponse();
        console.log(agentList);

        // fill the agent dropdown with the fetched agents
        fillAgentDropdown(agentList);

        // show the currently selected Agent's details
        const agentSelect = document.querySelector("#agent-select");
        
    }
    catch (error) {
        console.error(error)
    }
}


main();