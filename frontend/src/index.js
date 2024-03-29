import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ReactGA from 'react-ga'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


const trackingId = 'UA-83277161-1'
ReactGA.initialize(trackingId)

if (process.env.NODE_ENV == "production") {
    Sentry.init({
        dsn: "https://6b54cef707c9494babd5563c9904df41@o552500.ingest.sentry.io/5869041",
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}


ReactDOM.render(<App />, document.getElementById('root'))
