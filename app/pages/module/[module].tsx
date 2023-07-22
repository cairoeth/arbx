import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Page } from 'components/ui/page'
import { Navbar } from 'components/ui/navbar'
import { Footer } from 'components/ui/footer'

import { ModuleContent } from 'components/module/content'

export default function App() {
  const router = useRouter()
  const { module } = router.query

  useEffect(() => {
    document.title = "Module - ArbX";
    document.documentElement.setAttribute("data-theme", "winter");
    document.documentElement.className = 'bg-base-300';
  });

  return (
    <Page>
      <Navbar />
      <div className="px-4 py-4 sm:px-6 lg:px-8 bg-base-300">
        <div className='w-full grid-cols-3 gap-4 overflow-y-hidden overflow-x-scroll px-10 pt-1 pb-10 xl:grid xl:overflow-x-auto xl:px-4'>
          <ModuleContent module={module as string} />
        </div>
      </div>
      <Footer />
    </Page>
  );
};
