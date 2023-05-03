import * as StateMachine from "javascript-state-machine";
import { Status, Transition, TransitionEtapa } from "../constants";

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

export const maquinaEstadosEtapa = (currentStatus) => {
  // creando la maquina de estados
  const fsmEtapa = new StateMachine({
    init: currentStatus,
    transitions: [
      {
        name: TransitionEtapa.CONFIGURAR_GRADOS,
        from: Status.ACTIVE,
        to: Status.CONFIGURACION_GRADOS,
      },
      {
        name: TransitionEtapa.CONFIGURAR_COMPETENCIA,
        from: Status.CONFIGURACION_GRADOS,
        to: Status.CONFIGURACION_COMPETENCIA,
      },
      {
        name: TransitionEtapa.SORTEAR_PREGUNTAS,
        from: Status.CONFIGURACION_COMPETENCIA,
        to: Status.SORTEO_PREGUNTAS,
      },
      {
        name: TransitionEtapa.DESCARGAR_EMPAQUETADOS,
        from: Status.SORTEO_PREGUNTAS,
        to: Status.DESCARGA_EMPAQUETADOS,
      },
      {
        name: TransitionEtapa.DESARROLLAR_EXAMEN,
        from: Status.DESCARGA_EMPAQUETADOS,
        to: Status.EXAMEN_SEGUN_CRONOGRAMA,
      },
      {
        name: TransitionEtapa.HABILITAR_REZAGADOS,
        from: Status.EXAMEN_SEGUN_CRONOGRAMA,
        to: Status.HABILITACION_REZAGADOS,
      },
      {
        name: TransitionEtapa.SORTEAR_PREGUNTAS_REZAGADOS,
        from: Status.HABILITACION_REZAGADOS,
        to: Status.SORTEO_PREGUNTAS_REZAGADOS,
      },
      {
        name: TransitionEtapa.DESARROLLAR_EXAMEN_REZAGADOS,
        from: Status.SORTEO_PREGUNTAS_REZAGADOS,
        to: Status.DESARROLLO_PRUEBAS_REZAGADOS,
      },
      {
        name: TransitionEtapa.CERRAR_PRUEBA_REZAGADOS,
        from: Status.DESARROLLO_PRUEBAS_REZAGADOS,
        to: Status.CIERRE_PRUEBA_REZAGADOS,
      },
      {
        name: TransitionEtapa.PUBLICAR_RESPUESTAS,
        from: Status.CIERRE_PRUEBA_REZAGADOS,
        to: Status.PUBLICACION_RESPUESTAS,
      },
      {
        name: TransitionEtapa.IMPUGNAR_PREGUNTAS_RESPUESTAS,
        from: Status.PUBLICACION_RESPUESTAS,
        to: Status.IMPUGNACION_PREGUNTAS_RESPUESTAS,
      },
      {
        name: TransitionEtapa.OBTENER_MEDALLERO,
        from: Status.IMPUGNACION_PREGUNTAS_RESPUESTAS,
        to: Status.OBTENCION_MEDALLERO,
      },
      {
        name: TransitionEtapa.DESEMPATAR,
        from: Status.OBTENCION_MEDALLERO,
        to: Status.DESEMPATE,
      },
      {
        name: TransitionEtapa.CLASIFICAR,
        from: Status.DESEMPATE,
        to: Status.GENERAR_CLASIFICADOS,
      },
      {
        name: TransitionEtapa.PUBLICAR_RESULTADOS,
        from: Status.GENERAR_CLASIFICADOS,
        to: Status.PUBLICACION_RESULTADOS,
      },
      {
        name: TransitionEtapa.CERRAR,
        from: Status.PUBLICACION_RESULTADOS,
        to: Status.CLOSED,
      },
    ],
    methods: {},
  });

  const executeTransition = (transition) => {
    if (
      (!currentStatus || currentStatus === undefined) &&
      transition === TransitionEtapa.ACTIVAR
    ) {
      return Status.ACTIVE;
    }
    if (!currentStatus || currentStatus === undefined) {
      throw new PreconditionFailedException(
        `No se puede ejecutar la transición: ${transition} sobre el estado: ${currentStatus}`
      );
    }
    if (!fsmEtapa.can(transition)) {
      throw new PreconditionFailedException(
        `No se puede ejecutar la transición: ${transition} sobre el estado: ${fsmEtapa.state}`
      );
    }

    switch (transition) {
      case TransitionEtapa.CONFIGURAR_GRADOS:
        fsmEtapa.grados();
        break;
      case TransitionEtapa.CONFIGURAR_COMPETENCIA:
        fsmEtapa.competencia();
        break;
      case TransitionEtapa.SORTEAR_PREGUNTAS:
        fsmEtapa.sortear();
        break;
      case TransitionEtapa.DESCARGAR_EMPAQUETADOS:
        fsmEtapa.descargar();
        break;
      case TransitionEtapa.DESARROLLAR_EXAMEN:
        fsmEtapa.desarrollar();
        break;
      case TransitionEtapa.HABILITAR_REZAGADOS:
        fsmEtapa.habilitar();
        break;
      case TransitionEtapa.SORTEAR_PREGUNTAS_REZAGADOS:
        fsmEtapa.sortearrezagados();
        break;
      case TransitionEtapa.DESARROLLAR_EXAMEN_REZAGADOS:
        fsmEtapa.desarrollarrezagados();
        break;
      case TransitionEtapa.CERRAR_PRUEBA_REZAGADOS:
        fsmEtapa.cerrarrezagados();
        break;
      case TransitionEtapa.PUBLICAR_RESPUESTAS:
        fsmEtapa.respuestas();
        break;
      case TransitionEtapa.IMPUGNAR_PREGUNTAS_RESPUESTAS:
        fsmEtapa.impugnar();
        break;
      case TransitionEtapa.OBTENER_MEDALLERO:
        fsmEtapa.medallero();
        break;
      case TransitionEtapa.DESEMPATAR:
        fsmEtapa.desempatar();
        break;
      case TransitionEtapa.CLASIFICAR:
        fsmEtapa.clasificar();
        break;
      case TransitionEtapa.PUBLICAR_RESULTADOS:
        fsmEtapa.publicar();
        break;
      case TransitionEtapa.CERRAR:
        fsmEtapa.cerrar();
        break;
    }
    return fsmEtapa.state;
  };

  const getTransitions = () => {
    return fsmEtapa.transitions();
  };

  const getAllTransitions = () => {
    return fsmEtapa.allTransitions();
  };

  return {
    executeTransition,
    getTransitions,
    getAllTransitions,
  };
};
