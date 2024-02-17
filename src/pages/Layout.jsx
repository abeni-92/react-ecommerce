/* eslint-disable react/prop-types */

import { Outlet } from "react-router";
import { SideBar } from "../components/SideBar";


function Layout({cartItems}) {

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <SideBar cartItems={cartItems}/>

      {/* Main body */}
      <section className="w-full ml-80">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
