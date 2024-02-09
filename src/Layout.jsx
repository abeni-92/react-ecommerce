// import * as React from "react";

import { Outlet } from "react-router";
import { SideBar } from "./sideBar";


function Layout() {

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <SideBar />

      {/* Main body */}
      <section className="w-auto ml-80">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
