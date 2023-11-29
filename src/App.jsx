import './App.css';
import { Space } from "antd";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import PageContent from "./components/PageContent/PageContent";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <>
      <div className='App'>
        <Header/>
        <Space className='SideMenuAndPageContent'>
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </Space>
        <Footer/>
      </div>
    </>
  )
}

export default App
