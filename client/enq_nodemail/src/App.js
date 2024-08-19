import './App.css';
import Enquiry from './components/Enquiry';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="content-wrap">
        <Enquiry />
      </div>
      <Footer />
    </div>
  );
}

export default App;