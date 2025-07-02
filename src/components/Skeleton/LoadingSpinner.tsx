import React from "react";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "neon";
  className?: string;
}

export function LoadingSpinner({ size = "medium", color = "primary", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner ${size} ${color} ${className}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );
} 