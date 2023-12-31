import { useEffect, useRef, useState } from "react"

const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 创建WebSocket连接
    socketRef.current = new WebSocket(url)

    // 处理连接打开事件
    const handleOpen = () => {
      setIsOpen(true)
      const subscriptionId = Math.random() * 100000000000000000
      socketRef.current.send(JSON.stringify(["REQ", subscriptionId, {}]))
    }

    // 处理消息事件
    const handleMessage = (event) => {
      const message = JSON.parse(event.data)
      if (message[0] !== "EVENT" || message[2]["kind"] !== 1) {
        return
      }

      // 处理消息
      if (onMessage) {
        const contentArray = message[2]["content"].split(" ")
        let words = []
        for (const word of contentArray) {
          if (word.startsWith("#")) {
            const pos = word.indexOf(":")
            let tag
            if (pos > -1) {
              tag = word.slice(1, pos)
            } else {
              tag = word.slice(1)
            }
            words.push(`<a href='/tag?tag=${tag}'>${word}</a>`)
          } else {
            words.push(word)
          }
        }
        const content = words.join(" ")

        onMessage(content, message[2])
      }
    }

    // 处理连接关闭事件
    const handleClose = () => {
      setIsOpen(false)
    }

    // 监听WebSocket事件
    socketRef.current.addEventListener("open", handleOpen)
    socketRef.current.addEventListener("message", handleMessage)
    socketRef.current.addEventListener("close", handleClose)

    // 组件卸载时关闭WebSocket连接
    return () => {
      if (socketRef.current) {
        socketRef.current.removeEventListener("open", handleOpen)
        socketRef.current.removeEventListener("message", handleMessage)
        socketRef.current.removeEventListener("close", handleClose)
        socketRef.current.close()
      }
    }
  }, [url, onMessage])

  // 修改后的sendMessage函数
  const sendMessage = (message) => {
    console.log(isOpen, "isOpen")
    console.log(message, "message")
    if (isOpen) {
      socketRef.current.send(message)
    } else {
      console.error("Cannot send message, WebSocket is not open")
    }
  }

  return { websocket: socketRef.current, sendMessage }
}

export default useWebSocket
