// import * as React from "react";

import { Outlet } from "react-router";
import { SideBar } from "../components/SideBar";


function Layout() {

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <SideBar />

      {/* Main body */}
      <section className="w-full ml-80">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
