// Landing page
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ABI, DEFAULT_CONTRACT_ADDRESS } from "../config/constant"
import { ethers } from "ethers"
import List from "../components/list/List"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useWebSocket from "../hooks/useWebSocket"

function HomePage() {
  // Functions to extract points and link
  function extractPointsAndLink(tags) {
    let points = null,
      link = null
    for (let tag of tags) {
      if (tag[0] === "t" && tag[1] === "points") {
        points = parseInt(tag[2])
      } else if (tag[0] === "t" && tag[1] !== "points") {
        link = tag[1]
      }
    }
    return [points, link]
  }

  // Function to transform item
  function transformItem(item) {
    const [points, link] = extractPointsAndLink(item.tags)
    // console.log(points, "points")
    // console.log(link, "link")
    // console.log(item.tags, "item.tags")
    return {
      id: item.id,
      header: "Harry the Helper",
      time: item.created_at,
      content: item.content,
      points: points,
      upvotes: 12,
      downvotes: 3,
      link: link
    }
  }

  const [items, setItems] = useState([])

  console.log(items, "items")

  const onMessage = (content, message) => {
    console.log("Message from server", content)
    console.log("Message details", message)

    const newItem = transformItem(message)
    setItems([newItem])
  }
  const socket = useWebSocket("wss://humanpow.bitpow.org/relay", onMessage)

  useEffect(() => {
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close()
      }
    }
  }, [socket])

  return (
    <div>
      <h1 className="m-4 text-4xl font-bold">Contributions</h1>
      <div className="m-4 flex flex-row items-center text-gray-400">
        <p>{`Points = 60 * hours spent * N, make N < 1 if you are not skilled on the contribution, N > 1 if you make a big difference.`}</p>
        <Pencil2Icon className="h-4 w-4" />
      </div>
      <div className="m-4 grid gap-2">
        <Textarea placeholder="Example: I developed sign in with wallet feature. #points:120 #pow:https://notion.so/1234 #Cc@Tony @Bruce" />
        <div className="flex flex-row-reverse">
          <Button className="bg-teal-400 hover:bg-teal-600">Add</Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <List />
        <List />
        <List />
      </div>
    </div>
  )
}

HomePage.propTypes = {
  name: PropTypes.string
}

export async function getStaticProps() {
  const abi = ABI

  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.NEXT_PUBLIC_INFURA_API
  )

  const contract = new ethers.Contract(DEFAULT_CONTRACT_ADDRESS, abi, provider)
  const name = await contract.name()
  console.log("NAME", name)

  return {
    props: {
      name,
      abi
    } // will be passed to the page component as props
  }
}

export default HomePage
