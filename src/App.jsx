// src/App.js
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { publicRoutes } from "./router";
import DefaultLayout from "./layouts/DefaultLayout";
import { SpeedInsights } from "@vercel/speed-insights/react";
import MusicPlayer from "./components/MusicPlayer";
import { ThemeProvider } from "./context/ThemeContext";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <SpeedInsights />
        <MusicPlayer />
        {/* Gọi MusicPlayer để hiển thị nhạc */}
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
