
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#493D9E] !important text-white py-10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Jobify</h2>
            <p className="text-sm opacity-80 mt-2">
              © 2024 Jobify. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase">Resources</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `hover:text-orange-400 transition ${
                        isActive ? "text-orange-400" : "opacity-90"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `hover:text-orange-400 transition ${
                        isActive ? "text-orange-400" : "opacity-90"
                      }`
                    }
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase">Follow Us</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/ironglad"
                    className="hover:text-orange-400 transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/UxfZw64V"
                    className="hover:text-orange-400 transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h2 className="mb-4 text-lg font-semibold uppercase">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-orange-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-orange-400 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
