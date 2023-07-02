import React, { useState } from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SketchLogoIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import useGetData from "../../hooks/useGetData"

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    name: "success",
    percent: "35.55%",
    points: "240"
  },
  {
    id: "3u1reuv4",
    amount: 242,
    name: "success",
    percent: "35.55%",
    points: "240"
  },
  {
    id: "derv1ws0",
    amount: 837,
    name: "processing",
    percent: "35.55%",
    points: "240"
  },
  {
    id: "5kma53ae",
    amount: 874,
    name: "success",
    percent: "35.55%",
    points: "240"
  },
  {
    id: "bhqecj4p",
    amount: 721,
    name: "failed",
    percent: "35.55%",
    points: "240"
  }
]

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="rounded-sm h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {row.getValue("name")}
        </div>
      </div>
    )
  },
  {
    accessorKey: "percent",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          %
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("percent")}</div>
    )
  },
  {
    accessorKey: "points",
    header: "Points earned",
    cell: ({ row }) => (
      <div className="capitalize">
        <Button
          variant="outline"
          className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-600"
        >
          <SketchLogoIcon className="mr-2 h-4 w-4" />
          {row.getValue("points")}
        </Button>
      </div>
    )
  }
]
const DashboardTable = () => {
  const [sorting, setSorting] = useState([])

  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const { a, loading, error } = useGetData(
    "https://humanpow.bitpow.org/api/dashboard"
  )

  console.log(a, "a")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by name"
          value={table.getColumn("percent")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("percent")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              This month <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>This week</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected. */}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardTable
