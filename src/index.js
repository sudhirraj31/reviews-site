import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Auth0Provider } from "@auth0/auth0-react";

import { Client as Styletron } from "styletron-engine-atomic";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      requiredUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StyletronProvider>
);
