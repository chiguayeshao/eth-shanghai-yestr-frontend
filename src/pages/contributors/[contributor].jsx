import React from "react"
import { useRouter } from "next/router"
import ContributorDetail from "../../components/contributorDetail/ContributorDetail"
import List from "../../components/list/List"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const Detail = () => {
  const router = useRouter()
  // const { contributor } = router.query
  const handleBackClick = () => {
    router.push("/contributors")
  }

  const items = {
    id: "0x719c8d75faf8f1b117ea56205414892caab4a1b7",
    name: "KJ",
    header: "Harry the Helper",
    time: "48 hours ago",
    content: "#lxdao #points:600 now in july",
    points: 600,
    upvotes: 12,
    downvotes: 3,
    link: "lxdao"
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
        <List key={items.id} item={items} />
      </div>
      {/* <div>This is the page for contributor {contributor}.</div> */}
    </div>
  )
}

export default Detail
