"use client"
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <NoteContext.Provider
      value={{
        refresh,
        setRefresh,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;