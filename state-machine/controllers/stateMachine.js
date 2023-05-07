const StateMachine = require('javascript-state-machine');

let fsm = new StateMachine({
  init: 'Initializing',//'3'
  transitions: [
    {
      name: 'updateState',
      from: '*',
      to: function (n) {
        return n;
      }
    },
    // {
    //   name: 'queue', from: 'Initializing', to: 'Queued'
    // },
    {
      name: 'create', from: 'Initializing', to: 'Created'
    },
    {
      name: 'acepted', from: 'Created', to: 'Acepted'
    },
    {
      name: 'stop', from: ['Acepted','Created'], to: 'Stop'
    },
    // // {
    // //   name: 'create', from: 'Queued', to: 'Created'
    // // },
    // {
    //   name: 'start', from: 'Created', to: 'Running'
    // },
    // {
    //   name: 'stop', from: ['Created', 'Running'], to: 'Stopping'
    // },
    // {
    //   name: 'stopped', from: ['Initializing', 'Queued', 'Stopping'], to: 'Stopped'
    // }
  ],
  methods: {
    onStopped: function() { console.log('State transition to Stopped') }
  },
  data: {
    endState: 'Stopped',
  }
});

module.exports = fsm;
