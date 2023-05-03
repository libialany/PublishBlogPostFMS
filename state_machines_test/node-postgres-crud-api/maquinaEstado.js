import * as StateMachine from "javascript-state-machine";

export const maquinaEstadosPregunta = (currentStatus) => {
  // creando la maquina de estados
  const fsm = new StateMachine({
    init: currentStatus,
    transitions: [
      { name: "acepted", from: "pending", to: "approved" },
      { name: "denied", from: "pending", to: "rejected" },
    ],
    methods: {
      onApproved: function () {
        console.log("I was approved");
      },
      onRejected: function () {
        console.log("I was rejected");
      },
    },
  });

  const executeTransition = (transition) => {
    if (!currentStatus || currentStatus === undefined) {
      throw new Error(
        `No se puede ejecutar la transición: ${transition} sobre el estado: ${currentStatus}`
      );
    }
    if (!fsm.can(transition)) {
      throw new Error(
        `No se puede ejecutar la transición: ${transition} sobre el estado: ${fsm.state}`
      );
    }

    switch (transition) {
    //   case Transition.ENVIAR:
    //     fsm.enviar();
    //     break;
    //   case Transition.ELIMINAR:
    //     fsm.eliminar();
    //     break;
      case "pending"://Transition.APROBAR:
        fsm.aprobar();
        break;
    //   case Transition.OBSERVAR:
    //     fsm.observar();
    //     break;
    //   case Transition.ANULAR:
    //     fsm.anular();
    //     break;
    }
    return fsm.state;
  };

  const getAllTransitions = () => {
    return fsm.allTransitions();
  };

  return {
    executeTransition,
    getAllTransitions,
  };
};
