import React from "react"
import { useRouter } from "next/router"
import { ConnectButton } from "@rainbow-me/rainbowkit"

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
        <div className="bg-green-400 rounded-3xl w-8 h-8"></div>
        <div className="text-2xl font-bold">human.pow</div>
      </div>
      <div className="pr-4">
        <ConnectButton />
      </div>
    </nav>
  )
}

export default MainNavgation
