import { ReactNode } from "react";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
  toggle: ReactNode;
}

export interface StyleState {
  position?: 'fixed';
  top?: string;
  left?: string;
}