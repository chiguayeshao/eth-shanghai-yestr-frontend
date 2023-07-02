import React from "react"
import { useRouter } from "next/router"
import ContributorDetail from "../../components/contributorDetail/ContributorDetail"
import List from "../../components/list/List"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const Detail = () => {
  const router = useRouter()
  const { contributor } = router.query
  const handleBackClick = () => {
    router.push("/contributors")
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="flex flex-row items-center"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        <p>Back</p>
      </Button>
      <ContributorDetail />
      <div className="m-4 flex flex-row justify-between">
        <h1 className=" text-4xl font-bold">Contributions</h1>
        <p className="">Tatol points earned: 300</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <List />
        <List />
        <List />
        <List />
      </div>
      <div>This is the page for contributor {contributor}.</div>
    </div>
  )
}

export default Detail
