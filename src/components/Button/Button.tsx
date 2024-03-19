import "./Button.css";
import { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  onClick?: () => void;
}
export default function Button({ children, onClick }: IProps) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
