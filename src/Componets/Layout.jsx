import Navbar from "./NavBar";
import { Footer } from "./Footer";
import {Outlet} from "react-router-dom";

export function Layout(){
  return(
    <>
      <Navbar/>
        <main>
          <outlet/>
        </main>
      <Footer/>
    </>
  )
}