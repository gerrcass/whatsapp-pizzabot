const { State, interpret } = require("xstate");
const fs = require("fs");

const { fetchMenuListings } = require("../utils/jsonDataBase");
const { createLeadMachine } = require("./stateMachine");

class LeadStore {
  static instance = null;
  menu = [];
  leads = {};
  machineInstances = {};

  constructor(menuListings) {
    this.menu = menuListings;
    this.leads = this.loadPersistedData() || {}; // Load the state on application startup
    LeadStore.instance = this;
  }

  static async initialize() {
    try {
      if (!LeadStore.instance) {
        const menuListings = await fetchMenuListings();
        return new LeadStore(menuListings);
      }
      return LeadStore.instance;
    } catch (error) {
      console.error("Can't load menu listings", error);
    }
  }

  getLeadMachineInstance(phone) {
    if (!this.machineInstances.hasOwnProperty(phone)) return null;

    return this.machineInstances[phone];
  }

  async initLeadMachine(leadData) {
    let selectedLead;
    selectedLead = this.leads[leadData.phone];
    if (!selectedLead) {
      selectedLead = this.createLead(leadData);
    }

    const lastConversation =
      selectedLead.conversations[selectedLead.conversations.length - 1];

    const machine = createLeadMachine(this);
    const actor = interpret(machine).onTransition((state, context) => {
      this.addInteraction(leadData.phone);

      if (state.changed) {
        lastConversation.machineState = JSON.stringify(state);
        this.persistData(); // Save the state in persistent storage
        console.log("✅ State updated and saved in storage 💾");
      }
    });

    let stateDefinition = machine.initialState;
    // if (lastConversation.machineState) {
    //   //Reuse machine
    //   stateDefinition = JSON.parse(lastConversation.machineState);
    // } else {
    //   //Create new machine
    //   stateDefinition = machine.initialState;
    // }
    this.persistData(); // Save the state in persistent storage

    // Use State.create() to restore state from a plain object
    const previousState = State.create(stateDefinition);

    actor.start(previousState);

    actor.send("send welcome", { leadData });

    this.machineInstances[leadData.phone] = actor;
  }

  // Get a specific lead by leadPhone
  getLead(leadPhone) {
    return this.leads[leadPhone];
  }

  // Get all leads
  getLeads() {
    return this.leads;
  }

  // Create a new lead with the specified leadPhone
  createLead(leadData) {
    if (!this.leads.hasOwnProperty(leadData.phone)) {
      const newLead = {
        active: true,
        conversations: [
          {
            startTimestamp: new Date().getTime(),
            lastTimestamp: new Date().getTime(),
            lead: {
              name: leadData.name,
              phone: leadData.phone,
            },
          },
        ],
      };
      this.leads[leadData.phone] = newLead;
      this.persistData(); /// Save the state in persistent storage
      return this.leads[leadData.phone];
    }
  }

  // Predicate function to check if a lead with the specified leadPhone is active
  isLeadActive(leadPhone) {
    const lead = this.leads[leadPhone];
    if (lead) {
      return lead.active;
    }
    return false;
  }

  //Save user data from state machine
  saveLeadState(leadData) {
    if (!leadData?.phone) return;

    const selectedLead = this.leads[leadData.phone];

    const lastConversation =
      selectedLead.conversations[selectedLead.conversations.length - 1];

    selectedLead.conversations[lastConversation].lead = { ...leadData };
  }

  // Add an interaction to the lead with the specified leadPhone
  addInteraction(leadPhone) {
    const lead = this.leads[leadPhone];

    if (lead) {
      const lastConversation =
        lead.conversations[lead.conversations.length - 1];

      //Let's define a conversation as all messages exchanged within a 24-hour period.
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastConversation.startTimestamp;
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

      if (hoursDiff >= 24) {
        lead.conversations.push({
          startTimestamp: currentTime,
          lastTimestamp: currentTime,
        });
        lead.active = true;
      } else {
        if (lead.active) {
          lastConversation.lastTimestamp = currentTime;
        }
      }
    }

    this.persistData(); // Save the state in persistent storage every time it's modified
  }

  // Set the status of the lead with the specified leadPhone
  setLeadStatus(leadPhone, newStatus) {
    if (this.leads.hasOwnProperty(leadPhone)) {
      this.leads[leadPhone] = Object.assign({}, this.leads[leadPhone], {
        active: newStatus,
      });
      this.persistData(); // Save the state in persistent storage every time it's modified
    }
  }

  // Save the state to a JSON file
  persistData() {
    fs.writeFileSync("state.json", JSON.stringify(this.leads));
  }

  // Load the state from a JSON file
  loadPersistedData() {
    // 🎮 For demo purposes: always return an empty state
    return {};

    // if (fs.existsSync("state.json")) {
    //   const globalState = fs.readFileSync("state.json");
    //   return JSON.parse(globalState);
    // } else {
    //   return {}; // Return an empty state if the file doesn't exist
    // }
  }
}

const storeInstance = (async () => {
  try {
    const instance = await LeadStore.initialize();
    return instance;
  } catch (error) {
    console.error(error);
  }
})();

module.exports = storeInstance;
