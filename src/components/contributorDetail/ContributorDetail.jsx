import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SketchLogoIcon,
  LinkNone2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const ContributorDetail = () => {
  return (
    <div className="m-4">
      <Card>
        <div className="flex flex-row">
          <CardHeader>
            <CardTitle>
              <Avatar className="rounded-sm h-32 w-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <div className="p-6 pl-0">
            <CardContent>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-row justify-between items-center gap-4">
                      <CardDescription className="font-semibold text-3xl text-black">
                        Tony
                      </CardDescription>
                    </div>
                    <Button variant="outline">
                      <Pencil2Icon className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                  <p>0xf7e8sdjknksb786a66kfnnsgvt68Ca790x</p>
                </div>
                <div>
                  <p className="text-xl text-black">About:</p>
                  <p>
                    This is my personal bio, my skill is fullstack dev,my
                    interest is web3 This is my personal bio, my skill is
                    fullstack dev,my interest is web3 DAO tolling.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-between items-start gap-4">
              <p className="text-xl text-black">Project involved:</p>
              <div className="flex flex-row gap-4 flex-wrap">
                <Button
                  variant="outline"
                  className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-600"
                >
                  <SketchLogoIcon className="mr-2 h-4 w-4" />
                  250
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  linklinklinklinktr.ee/lidang
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ContributorDetail
