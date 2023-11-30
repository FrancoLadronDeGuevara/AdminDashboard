import './App.css';
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import PageContent from "./components/PageContent/PageContent";
import Footer from "./components/Footer/Footer";

function App() {
  

  return (
    <>
      <div className='App'>
        <Header/>
        <div className='SideMenuAndPageContent'>
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
