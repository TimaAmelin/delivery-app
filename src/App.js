import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { DotsState } from './context/dots/DotsState';
import { ScreenState } from './context/screen/ScreenState';
import { MainScreen } from './screens/MainScreen';

function App() {
  return (
    <div className="App">
      <ScreenState>
        <DotsState> 
          <MainScreen />
        </DotsState>
      </ScreenState>
    </div>
  );
};

export default App;
