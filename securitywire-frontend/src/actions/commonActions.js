import { createToast, removeToast } from "../components/toasters";
import React from "react";
import { Toast, Position } from "@blueprintjs/core";

export function showToasterNotification(icon, intent, message, timeout = 1500) {
  return (dispatch) => {
    try {
      const id = Math.random().toString();

      const toast = (
        <Toast
          icon={icon}
          intent={intent}
          message={message}
          timeout={timeout}
          onDismiss={() => dispatch(removeToast(id))}
        />
      );

      dispatch(createToast(id, toast, false, Position.TOP_RIGHT));
    } catch (e) {
      console.log(e);
    }
  };
}
