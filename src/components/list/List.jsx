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
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

const List = () => {
  return (
    <div>
      <Card>
        <div className="flex flex-row">
          <CardHeader>
            <CardTitle>
              <Avatar className="rounded-sm h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <div className="p-6 pl-0">
            <CardContent>
              <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <CardDescription className="font-semibold text-lg">
                    Harry the Helper
                  </CardDescription>
                  <CardDescription className="text-base">
                    2 hours ago
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
              <p>Card Content Card ContentCard ContentCard Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default List
