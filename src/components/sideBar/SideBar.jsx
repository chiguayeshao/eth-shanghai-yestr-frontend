import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const SideBar = () => {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState("")

  const menuItems = ["Contributions", "Contributors", "Dashboard"]

  const handleClick = (item) => {
    if (item === "Contributions") {
      router.push("/")
    } else {
      router.push("/" + item.toLowerCase())
    }
  }

  useEffect(() => {
    if (router.pathname === "/") {
      setActiveItem("Contributions")
    } else {
      setActiveItem(
        router.pathname.slice(1).charAt(0).toUpperCase() +
          router.pathname.slice(2)
      )
    }
  }, [router.pathname])

  return (
    <div>
      <ul>
        <li className="p-4 text-3xl">Sample DAO</li>
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className={`p-4 ${
              item === activeItem ? "bg-gray-200 rounded-lg" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
