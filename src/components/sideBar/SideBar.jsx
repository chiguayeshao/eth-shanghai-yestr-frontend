import React, { useState } from "react"
import { useRouter } from "next/router"

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Contributions")
  const router = useRouter()

  const handleClick = (item) => {
    router.push("/" + item)
    setActiveItem(item)
  }

  const menuItems = ["Contributions", "Contributors", "Dashboard"]
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
