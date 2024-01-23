import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import { thunk } from "redux-thunk"
import storage from "redux-persist/lib/storage"
import rootReducer from "./reducers"

const persistConfig = {
    key: "root",
    whitelist: ["auth"],
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}

const middleware = [thunk]

const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
    )
)

const persistor = persistStore(store)

export { store, persistor }
