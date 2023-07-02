// Landing page
import React from "react"
import PropTypes from "prop-types"
import { ABI, DEFAULT_CONTRACT_ADDRESS } from "../config/constant"
import { ethers } from "ethers"
import List from "../components/list/List"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function HomePage() {
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

  const RELAY_URL = "wss://humanpow.bitpow.org/relay";

  // Create WebSocket connection.
  const socket = new WebSocket(RELAY_URL);

  // Connection opened
  socket.addEventListener("open", (event) => {
    const subscription_id = Math.random()*100000000000000000;
    socket.send(JSON.stringify(["REQ", subscription_id, {}]));
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    const e = JSON.parse(event.data);
    if (e[0] != 'EVENT' || e[2]['kind'] != 1) {
      return
    }
    const content_array = e[2]['content'].split(' ');
    let words = [];
    for(const word of content_array){
      let tag;
      if(word.startsWith('#')){
        const pos = word.indexOf(':')
        console.log(word, pos);
        if(pos > -1){
          tag = word.slice(1, pos);
          const value = word.slice(pos+1);
        }else{
          tag = word.slice(1);
        }
        words.push(`<a href='/tag?tag=${tag}'>${word}</a>`);
      }else{
        words.push(word);
      }
    }
    const content = words.join(' ');
    console.log(content);

    // const p = document.createElement('p');
    // p.innerHTML = `<div>${content}</div>
    //     <a class='msg_event_id' href='/tweet?event=${e[2]['id']}'>${e[2]['id']}</a><br>
    //     <button class='msg_like'>Like</button>
    //     <button class='msg_unlike'>Unlike</button>
    //     <button class='msg_dislike'>Dislike</button>
    //     <button class='msg_undislike'>Undislike</button>
    //     <div>from <a class='user_addr' href='/user?addr=${e[2]['pubkey']}'>${e[2]['pubkey']}</a><br>
    //     </div>`;
    // messages.prepend(p);
  });
  
  return {
    props: {
      name,
      abi
    } // will be passed to the page component as props
  }
}

export default HomePage
