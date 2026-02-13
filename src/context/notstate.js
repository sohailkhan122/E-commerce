import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const [refresh, setRefresh] = useState(false)
    const [userId, setuserId] = useState(null)
    return (
        <NoteContext.Provider value={{
            refresh,
            setRefresh,
            userId,
            setuserId
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState