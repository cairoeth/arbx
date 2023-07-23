import { ConnectKitButton } from "connectkit";
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className="navbar bg-base-100 z-10">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl text-left" href="/">
          <div className="avatar">
            <div className="w-7 mr-2 mt-1">
              <Image src="/arbx.png" width={800} height={800} alt="ArbX logo" />
            </div>
          </div>
          ArbX
        </Link>
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
