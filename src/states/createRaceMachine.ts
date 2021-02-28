import { assign, MachineConfig, Machine, MachineOptions } from "xstate";
import { socket } from "../config/socket-io";

interface CreateRaceStateSchema {
  states: {
    ready: {};
    waitingResponse: {};
  };
}

type CreateRaceEvents =
  | {
      type: "NAME_CHANGE";
      value: string;
    }
  | {
      type: "SUBMIT";
    }
  | {
      type: "DONE";
    }
  | {
      type: "ERROR";
    };

interface CreateRaceContext {
  racerName: string;
}

const stateConfig: MachineConfig<
  CreateRaceContext,
  CreateRaceStateSchema,
  CreateRaceEvents
> = {
  id: "create-race",
  initial: "ready",
  context: {
    racerName: "",
  },
  states: {
    ready: {
      type: "parallel",
      states: {
        racerName: {
          initial: "noError",
          states: {
            noError: {},
            error: {
              initial: "empty",
              states: {
                empty: {},
              },
            },
          },
        },
      },
      on: {
        NAME_CHANGE: {
          actions: assign({
            racerName: (_ctx, event) => event.value,
          }),
        },
        SUBMIT: [
          {
            cond: "isRacerNameEmpty",
            target: "ready.racerName.error.empty",
          },
          {
            target: "waitingResponse",
          },
        ],
      },
    },
    waitingResponse: {
      entry: ["handleCreateRace"],
      on: {
        DONE: {
          target: "ready",
        },
        ERROR: {
          target: "ready",
        },
      },
    },
  },
};

const stateOptions: Partial<MachineOptions<CreateRaceContext, any>> = {
  actions: {
    handleCreateRace: (ctx) => {
      socket.emit("create-race", ctx.racerName);
    },
  },
  guards: {
    isRacerNameEmpty: (ctx, _e) => !ctx.racerName || ctx.racerName.length === 0,
  },
};

export const createRaceMachine = Machine<
  CreateRaceContext,
  CreateRaceStateSchema,
  CreateRaceEvents
>(stateConfig, stateOptions);
