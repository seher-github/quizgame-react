import './App.css';
import Form from './Components/Form';
import Quiz from './Components/Quiz/Quiz';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    < >
   <BrowserRouter>
   <Routes>
    <Route path='/form' element={<Form/>} />
    <Route path='/' element={<Quiz />} />
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
