import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert message="This is amazing React course"/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </NoteState>
    git reset --hard HEAD~1

    </>
  );
}

export default App;
