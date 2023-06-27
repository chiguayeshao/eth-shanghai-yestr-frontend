import React from "react"
import Link from "next/link"
import SignInButton from "../button/SignInButton"
import { useRouter } from "next/router"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const MainNavgation = () => {
  const router = useRouter()
  const handleUserClick = () => {
    router.push("/user")
  }
  return (
    <nav className="flex flex-row items-center justify-between bg-white shadow-md">
      <ul className="flex flex-row items-start justify-center gap-10 p-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/mint">Mint</Link>
        </li>
        <li>
          <SignInButton onClick={handleUserClick} message={"Hello world"}>
            My Account
          </SignInButton>
        </li>
      </ul>
      <div className="pr-4">
        <ConnectButton />
      </div>
    </nav>
  )
}

export default MainNavgation
