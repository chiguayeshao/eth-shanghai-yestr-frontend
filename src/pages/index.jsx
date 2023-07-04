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
import { useSignMessage, useAccount } from "wagmi"

function timeAgo(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000)
  const diff = Date.now() - date.getTime()
  const hoursAgo = Math.round(diff / (1000 * 60 * 60))

  return `${hoursAgo} hours ago`
}

// Functions to extract points and link
const extractPointsAndLink = (tags) => {
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
const transformItem = (item) => {
  console.log(item, "item")
  const [points, link] = extractPointsAndLink(item.tags)
  return {
    id: item.pubkey,
    name: item?.profile?.name,
    header: "Harry the Helper",
    time: timeAgo(item.created_at),
    content: item.content,
    points: points,
    upvotes: 12,
    downvotes: 3,
    link: link
  }
}
function HomePage() {
  const [items, setItems] = useState([])
  const [content, setContent] = useState("")

  const { address } = useAccount()
  const { data: signature, signMessage } = useSignMessage({
    message: content
  })

  const onMessage = (content, message) => {
    const newItem = transformItem(message)
    setItems((prevItems) => {
      const isItemExist = prevItems.some((item) => item.id === newItem.id)
      if (isItemExist) {
        return prevItems
      }
      return [...prevItems, newItem].slice(-5)
    })
  }

  const { websocket, sendMessage } = useWebSocket(
    "wss://humanpow.bitpow.org/relay",
    onMessage
  )

  const createEventObject = async (message, signature) => {
    const content_array = message.split(" ")
    let tags = []
    for (const word of content_array) {
      let tag
      if (word.startsWith("#")) {
        const pos = word.indexOf(":")
        console.log(word, pos)
        if (pos > -1) {
          tag = word.slice(1, pos)
          const value = word.slice(pos + 1)
          tags.push(["t", tag, value])
        } else {
          tag = word.slice(1)
          tags.push(["t", tag])
        }
      }
    }

    return {
      created_at: Math.floor(Date.now() / 1000),
      id: "0xa82765e29923a25ba87d73922731cb52a288d27411ca7edd8c413c534a9eb2d4",
      kind: 1,
      pubkey: address,
      content: message,
      sig: signature,
      tags: tags
    }
  }

  const handleSubmit = async () => {
    console.log(content, "content")
    await signMessage()

    const event = await createEventObject(content, signature)

    console.log(event, "event")

    sendMessage(JSON.stringify(["EVENT", event]))
  }

  useEffect(() => {
    return () => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close()
      }
    }
  }, [websocket])

  return (
    <div>
      <div className="flex flex-row items-center text-gray-400 mt-4 mb-4">
        <p>{`Points = 60 * hours spent * N, make N < 1 if you are not skilled on the contribution, N > 1 if you make a big difference.`}</p>
        <Pencil2Icon className="h-4 w-4" />
      </div>
      <div className="grid gap-2">
        <Textarea
          placeholder="Example: I developed sign in with wallet feature. #points:120 #pow:https://notion.so/1234 #Cc@Tony @Bruce"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="flex flex-row-reverse">
          <Button
            className="bg-teal-400 hover:bg-teal-600"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {items.map((item) => (
          <List key={item.id} item={item} />
        ))}
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
