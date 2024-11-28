import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumps from "./breadcrumbs/Breadcrumbs";
export default function Header() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10 bg-white">
        <nav
          className="flex items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <Link to="/" className="hidden lg:flex lg:gap-x-12 me-10">
            <h1 className="text-center font-bold text-2xl">СШ №21</h1>
          </Link>
          <Breadcrumps></Breadcrumps>
          <div className=" hidden lg:flex lg:flex-1 lg:justify-end ">
            <a
              href="#"
              className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-base font-semibold leading-7 text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              Выйти
              <i className="bx bx-right-arrow-alt text-lg ml-2"></i>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
