import React, { Suspense } from 'react'
import { Switch, BrowserRouter as Router,Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AppRouter from './router/AppRouter';

const App = ()=> {
    return (
        <>
            <Router>
                <Layout>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            <AppRouter/>
                            <Redirect to="/404" />
                        </Switch>
                    </Suspense>
                </Layout>
            </Router>
        </>
    )
}

export default App;