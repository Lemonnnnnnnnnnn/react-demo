import React from "react";
import { Link, Outlet } from "umi";


export default function Layout() {
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <Outlet />
    </div>
  );
}
