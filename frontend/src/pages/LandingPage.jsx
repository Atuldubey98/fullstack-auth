import React from "react";
import Header from "../components/Header";
import PageLayout from "./PageLayout";
export const LandingPage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <PageLayout>
        <Header />
      </PageLayout>
    </div>
  );
};
