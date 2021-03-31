import { createContext } from "react";

const PreferencesContext = createContext({
    theme: '',
    handleTheme: () => {}
})

export default PreferencesContext