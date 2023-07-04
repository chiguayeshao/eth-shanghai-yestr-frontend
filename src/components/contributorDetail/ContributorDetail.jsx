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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

const ContributorDetail = () => {
  const form = useForm()
  const onSubmit = (value) => {
    console.log(value)
  }
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

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Pencil2Icon className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name="avatar"
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                  <div className="flex flex-row items-end gap-4">
                                    <Avatar className="rounded-sm h-16 w-16">
                                      <AvatarImage src="https://github.com/shadcn.png" />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <FormControl>
                                      <Input
                                        placeholder="Select File"
                                        type="file"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Pietro Schirano"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                  <FormLabel>About</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Introduce youself here"
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction type="submit">
                                Add
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </form>
                        </Form>
                      </AlertDialogContent>
                    </AlertDialog>
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
                  LX DAO
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
