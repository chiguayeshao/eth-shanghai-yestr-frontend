// Landing page
import React from "react"
import PropTypes from "prop-types"
import { ABI, DEFAULT_CONTRACT_ADDRESS } from "../config/constant"
import { ethers } from "ethers"
import List from "../components/list/List"

function HomePage() {
  return (
    <div>
      <h1 className="m-4 text-4xl font-bold">Contributions</h1>
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
