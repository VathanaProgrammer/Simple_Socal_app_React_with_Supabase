import { useContext } from "react";
import ModalContext from "./ModalContext"; // default import

export function useModal() {
  return useContext(ModalContext);
}
