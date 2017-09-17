class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config == undefined) {
        throw new Error();
      }
      this.initial = config.initial;
      this.states = config.states;
      for (let st in this.states) {
          this.states[st].name = st;
      }
      this.activeState = this.states[config.initial];
      this.history = [this.activeState.name];
      this.historyPosition = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.activeState.name;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.states) {
        this.activeState = this.states[state];
        this.history[++this.historyPosition] = this.activeState.name;
      } else {
        throw new Error();
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (event in this.activeState.transitions) {
        this.activeState = this.states[this.activeState.transitions[event]];
        this.history[++this.historyPosition] = this.activeState.name;
      } else {
        throw new Error();
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.activeState = this.states[this.initial];
      this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (event == undefined) {
        return Object.keys(this.states);
      }
      let events = [];
      for (let st in this.states) {
        if (event in this.states[st].transitions) {
          events[events.length] = this.states[st].name;
        }
      }
      return events;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.historyPosition > 0) {
        this.activeState = this.states[this.history[--this.historyPosition]];
        return true;
      } else {
        return false;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.historyPosition < this.history.length - 1) {
        this.activeState = this.states[this.history[++this.historyPosition]];
        return true;
      } else {
        return false;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [this.activeState.name];
      this.historyPosition = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
