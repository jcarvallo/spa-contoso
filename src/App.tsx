import React from 'react';
import { StateProvider, initialState, reducer } from './contexts/index'
import { Layout, Header } from './components/index'
import { Index, Dashboard, DepartamentList, CreateOrEditDepartment } from './views/index'
import { Router, navigate } from '@reach/router'

const App: React.FC = () => {

  if (Object.keys(initialState.user).length === 0) {
    navigate('/')
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Header />
        <Router>
          {/* Index */}
          <Index path='/' />
          {/* Dashboard */}
          <Dashboard path='/dashboard' />
          {/* Dapartaments */}
          <DepartamentList path='/departament' />
          <CreateOrEditDepartment path='/departament/:action' />
          {/* Courses */}
          {/* Instructors */}
        </Router>
      </Layout>
    </StateProvider>
  );
}

export default App;
