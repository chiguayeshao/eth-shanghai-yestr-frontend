import { useRouter } from "next/router"

const ContributorDetail = () => {
  const router = useRouter()
  const { contributor } = router.query

  return <div>This is the page for contributor {contributor}.</div>
}

export default ContributorDetail
