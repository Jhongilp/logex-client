import { useState, useEffect } from "react";
import { LandingPage } from "components/landing-page/LandingPage";
import { supabase } from "api";

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "components/header/Header";
import Sidebar from "components/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { useInitializeSubscriptions } from "hooks";

import { GlobalStyles } from "styles/global";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100%;
  /* overflow: hidden; */
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #f6f7f9;
  height: 100%;
`;

const App = () => {
  useInitializeSubscriptions();

  return (
    <>
      <Header />
      <Main>
        <Toaster />
        <Sidebar />
        <Outlet />
      </Main>
    </>
  );
};

export default function Root() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isDevMode = window.location.hostname === "localhost";
  // const isDevMode = false;

  return (
    <Wrapper>
      <GlobalStyles />
      {!session || !isDevMode ? <LandingPage /> : <App />}
    </Wrapper>
  );
}
