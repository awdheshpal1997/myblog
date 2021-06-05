import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import BlogCreate from './Components/BlogCreate'
import Layout from './Containers/Layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import BlogView from './Components/BlogView';
import BlogViewId from './Components/BlogViewId';
import BlogUpdate from './Components/BlogUpdate';

function App() {
  return (
    <div>
     <Router>
      <Layout>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/blogcreate' component={BlogCreate}/>
          <Route exact path='/allblogview' component={BlogView}/>
          <Route exact path='/blogview' component={BlogViewId}/>
          <Route exact path='/blogupdate/:id' component={BlogUpdate}/>
        </Switch>
      </Layout>
    </Router>
    </div>
  );
}

export default App;
