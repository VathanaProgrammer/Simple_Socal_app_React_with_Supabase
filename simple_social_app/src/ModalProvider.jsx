// ModalProvider.jsx

import { useState } from "react";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children }) {
  const [showPost, setShowPost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showPost, setShowPost, showCreateStory, setShowCreateStory }}
    >
      {children}
    </ModalContext.Provider>
  );
}
