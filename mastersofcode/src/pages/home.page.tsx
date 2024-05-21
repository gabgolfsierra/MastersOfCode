
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../slices/auth.slice";

const HomePage: React.FC = () => {
  const user = useAppSelector((state) => selectCurrentUser(state));

  return (
    <div className="flex justify-center items-center flex-col h-screen">
     <h1>BEM-VINDO AO MASTERS OF CODE</h1>
    </div>
  );
};

export { HomePage };