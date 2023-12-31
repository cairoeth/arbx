import React from 'react'
import { useEffect, useState } from 'react'
import { Page } from 'components/ui/page'
import { Navbar } from 'components/ui/navbar'
import { Footer } from 'components/ui/footer'
import { Liquidity } from "components/liquidity/liquidity"

export default function App() {
  useEffect(() => {
    document.title = "Liquidity - ArbX";
    document.documentElement.setAttribute("data-theme", "winter");
    document.documentElement.className = 'bg-base-300';
  });

  return (
    <Page>
      <Navbar />
      <div className="px-4 py-4 sm:px-6 lg:px-40 bg-base-300 gap-y-2">
        <Liquidity />
      </div>
      <Footer />
    </Page>
  );
};
