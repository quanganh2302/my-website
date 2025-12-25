import { useState } from "react";
import Popup from "./Popup";

/**
 * PopupManager Component
 * Wrapper để quản lý popup state
 */
export default function PopupManager({ popupState, onClosePopup }) {
  return (
    <Popup
      isOpen={popupState.isOpen}
      onClose={onClosePopup}
      title={popupState.title}
      message={popupState.message}
      type={popupState.type}
    />
  );
}

/**
 * Hook to manage popup
 * Export để dùng trong App component
 */
export function usePopup() {
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showPopup = (title, message, type = "info") => {
    setPopupState({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closePopup = () => {
    setPopupState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    popupState,
    showPopup,
    closePopup,
  };
}
