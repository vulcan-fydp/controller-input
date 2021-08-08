export interface ControllerButtonState {
  pressed: boolean;
  value: number;
}

export interface ControllerAxisState {
  value: number;
}

export type ControllerButtonsState = [
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState,
  ControllerButtonState
];

export type ControllerAxesState = [
  ControllerAxisState,
  ControllerAxisState,
  ControllerAxisState,
  ControllerAxisState
];

export interface ControllerState {
  buttons: ControllerButtonsState;
  axes: ControllerAxesState;
}
