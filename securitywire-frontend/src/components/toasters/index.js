import { Overlay, Position, Toaster } from "@blueprintjs/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const TOASTER_CREATE = "toasters/create";
const TOASTER_REMOVE = "toasters/remove";

/**
 * Shows toast with given position
 * Overlay mode toasters are always shown in 'TOP' position
 *
 * @param id  A unique key to identify this toaster
 * @param {React.ReactNode} toast The toaster object
 * @param {boolean} overlay Should this toaster be shown in overlay mode?
 * @param {"bottom-right"} position The position to show this overlay
 */
export function createToast(id, toast, overlay, position) {
  return {
    type: TOASTER_CREATE,
    payload: {
      id,
      toast,
      position: !!position ? position : Position.TOP_RIGHT,
      overlay,
    },
  };
}

export function removeToast(id) {
  return {
    type: TOASTER_REMOVE,
    payload: {
      id,
    },
  };
}

export function reducer(state = [], action) {
  switch (action.type) {
    case TOASTER_CREATE:
      let toastExist = state.find((toast) => toast.id === action.payload.id);
      if (!!toastExist) {
        state.splice(toastExist, 1);
        return state.concat(action.payload);
      } else {
        return state.concat(action.payload);
      }
    case TOASTER_REMOVE:
      if (!!action.payload.id) {
        return state.filter((toast) => toast.id !== action.payload.id);
      } else {
        return state.filter(
          (t) =>
            !!t.toast.props.toasterData &&
            t.toast.props.toasterData.type !== "call"
        );
      }

    default:
      return state;
  }
}

export function Toasters() {
  const positions = Object.values(Position);
  const toasters =
    useSelector((state) =>
      state.toasters.filter((toaster) => !toaster.overlay)
    ) || [];
  const overlays =
    useSelector((state) =>
      state.toasters.filter((toaster) => toaster.overlay)
    ) || [];

  return (
    <>
      {positions.map((position) => (
        <Toaster key={position} position={position}>
          {toasters
            .filter((toaster) => toaster.position === position)
            .map((toast) => (
              <Fragment key={toast.id} children={toast.toast} />
            ))}
        </Toaster>
      ))}

      <Overlay isOpen={overlays.length > 0}>
        <Toaster position={Position.TOP}>
          {overlays.map((overlay) => (
            <React.Fragment key={overlay.id} children={overlay.toast} />
          ))}
        </Toaster>
      </Overlay>
    </>
  );
}
