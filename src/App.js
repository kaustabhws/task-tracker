import './App.css';
import Task from './components/Task';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <Task />
      {localStorage.getItem('tasks')?.length > 0 ? <Tasks /> : null}
    </div>
  );
}

export default App;
