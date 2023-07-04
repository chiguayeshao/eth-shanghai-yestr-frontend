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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  DotsHorizontalIcon,
  SketchLogoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  LinkNone2Icon
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const List = ({ item }) => {
  return (
    <div className="m-4 w-full">
      <Card key={item.id}>
        <div className="flex flex-row">
          <CardHeader>
            <CardTitle>
              <Avatar className="rounded-sm h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{item.name}</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <div className="p-6 pl-0 w-full">
            <CardContent>
              <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <CardDescription className="font-semibold text-lg text-black">
                    {item.header}
                  </CardDescription>
                  <CardDescription className="text-base">
                    {item.time}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p>{item.content}</p>
            </CardContent>
            <CardFooter className="flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <Button
                  variant="outline"
                  className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-600"
                >
                  <SketchLogoIcon className="mr-2 h-4 w-4" />
                  {item.points ? item.points : 0}
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-400"
                >
                  <LinkNone2Icon className="mr-2 h-4 w-4" />
                  {item.link ? item.link : "lxdao"}
                </Button>
              </div>
              <div className="flex flex-row gap-4 text-black">
                <Button variant="outline">
                  <ArrowUpIcon className="mr-2 h-4 w-4" /> Upvote{" "}
                  {item.upvotes ? item.upvotes : 0}
                </Button>
                <Button variant="outline">
                  <ArrowDownIcon className="mr-2 h-4 w-4" />
                  Downvote {item.downvotes ? item.downvotes : 0}
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default List
