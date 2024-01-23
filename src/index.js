import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import App from "./App"
import theme from "./theme" // Adjust the path accordingly
import { store, persistor } from "./store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
)
