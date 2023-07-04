import React from "react"
import { useRouter } from "next/router"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"

const MainNavgation = () => {
  const router = useRouter()
  const handleUserClick = () => {
    router.push("/")
  }
  return (
    <nav className="flex flex-row items-center justify-between bg-white shadow-md p-4">
      <div
        className="flex flex-row items-center justify-center gap-5"
        onClick={handleUserClick}
      >
        <div className="rounded-3xl w-8 h-8">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        </div>
        <div className="flex flex-row">
          <div className="text-2xl font-bold">Human</div>
          <div className="text-2xl font-bold text-emerald-300">pow</div>
        </div>
      </div>
      <div className="pr-4">
        <ConnectButton />
      </div>
    </nav>
  )
}

export default MainNavgation
