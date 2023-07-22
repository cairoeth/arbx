import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import Link from 'next/link'
import { Menu, Popover } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export function Navbar() {
  return (
    <div className="navbar bg-base-100 z-10">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl text-left" href="/">ArbX</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Dashboard</Link></li>
          <li><Link href="/arbitrage">Arbitrage</Link></li>
          <li><Link href="/liquidity">Liquidity</Link></li>
          <li><Link href="#" target='_blank'>Docs</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ConnectKitButton />
      </div>
    </div>
  )
}
