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
const API_URL = "https://valorant-api.com/v1/agents";
const AGENT_SELECT = document.querySelector("#agent-select");


async function fetchAgents() {
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

    // clear the loading option after the agents are loaded
    AGENT_SELECT.innerHTML = "";

    agentList.forEach((agent) => {
        // create a new option element for each agent
        const option = document.createElement("option");
        option.value = agent.displayName;
        option.textContent = agent.displayName;
        AGENT_SELECT.appendChild(option);
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

    // note that this comparison is checking where the agent object's display name
    // matches the display name in the filtered agent list
    return agentList.find((agent) => agent.displayName === displayName);
}


function agentSelectHandler(event, agentList) {
    /*
        action listener for the agent select dropdown.
        It grabs the selected agent from the dropdown based on what
        is selected so that later the page can be updated to the current
        agent

        Args:
            event (Event) - the change event from the dropdown
            agentList (array) - the list of agents fetched from the API
    */

    const selectedAgent = findAgent(agentList, event.target.value);

    // display the details of the selected agent
    displayAgent(selectedAgent);
}


function createAbilityCard() {
    /*
        creates an empty ability card with an icon, name, and description.
        displayAbilities() will fill in the content

        Returns:
            HTMLElement - the new <li> card
    */

    // create the new list item
    const card = document.createElement("li");
    card.className = "ability-card";

    // set the data fields for this ability
    const icon = document.createElement("img");
    const name = document.createElement("h4");
    const desc = document.createElement("p");

    // append the items to the list item
    card.append(icon, name, desc);
    return card;
}


function displayAbilities(agent) {
    /*
        builds then updates an ability card for each of the agent's abilities.
        The cards are build once on page load for the first agent,
        then updates the created cards for the selected agent

        Args:
            agent (object) - the currently selected agent's data dictionary
    */

    // grab the list header and list block to show them
    const abilityHeader = document.querySelector("#ability-header");
    const abilityList = document.querySelector("#ability-list");
    abilityHeader.hidden = false;
    abilityList.hidden = false;

    // we only want to make the ability cards once on page load,
    // then stop so later we can just update the already existing
    // ability cards
    if (abilityList.children.length === 0) {
        // all agents have exactly 4 abilities
        for (let i = 0; i < 4; i++) {
            abilityList.appendChild(createAbilityCard());
        }
    }

    // update the existing 4 ability cards
    for (let i = 0; i < 4; i++) {
        const ability = agent.abilities[i];
        const card = abilityList.children[i];
        
        const icon = card.querySelector('img');
        const name = card.querySelector('h4');
        const desc = card.querySelector('p');

        name.textContent = ability.displayName;
        desc.textContent = ability.description;
        icon.src = ability.displayIcon;
    }
}


function displayAgent(agent) {
    /*
        displays the details of the currently selected agent
        
        Args:
            agent (object) - the agent's data object to display
    */

    // set the agent's background image
    const agentBackground = document.querySelector('#agent-portrait-container');
    agentBackground.hidden = false;
    agentBackground.style.backgroundImage = `url("${agent.background}")`;
    
    // sett the agent portrait
    const agentPortrait = document.querySelector('#agent-portrait');
    agentPortrait.src = agent.fullPortrait;
    agentPortrait.alt = `A portrait of ${agent.displayName} from Valorant`;
    
    // show the agent's abilities
    displayAbilities(agent);
}


async function main() {
    /*
        this function is the main entry point for the app.
        It fetches the agent data from the API, fills the dropdown, and displays the details of the currently selected agent.
    */
    

    // since fetchAgents() can throw an error, we catch that error and log it here
    try {
        // at this point, the agentList is a regular array ready for use
        const allAgents = await fetchAgents();

        /*
            due to an issue with the API, there is 1 agent (KAY/O) that is duplicated
            in the response. To filter to the correct agents, the API
            says to use 'isPlayableCharacter' and only take the true entries
        */
        const agentList = allAgents.filter((agent) => agent.isPlayableCharacter);

        // fill the agent dropdown with the fetched agents
        fillAgentDropdown(agentList);

        // add event listener to the agent select dropdown
        // an arrow function is used here to pass the event and the agentList to the handler function
        AGENT_SELECT.addEventListener("change", (event) => agentSelectHandler(event, agentList));

        // display the details of the initially selected agent
        displayAgent(findAgent(agentList, AGENT_SELECT.value));
    }
    catch (error) {
        console.error(error);
    }
}


main();