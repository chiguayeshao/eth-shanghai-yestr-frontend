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

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    name: "success",
    address: "0xf7e8...Ca79",
    role: "Project Management",
    recentlyActive: "Jul 7, 2023",
    joinedTime: "Jul 6, 2023"
  },
  {
    id: "3u1reuv4",
    amount: 242,
    name: "success",
    address: "0xf7e8...Ca79",
    role: "Project Management",
    recentlyActive: "Jul 6, 2023",
    joinedTime: "Jul 6, 2023"
  },
  {
    id: "derv1ws0",
    amount: 837,
    name: "processing",
    address: "0xf7e8...Ca79",
    role: "Project Management",
    recentlyActive: "Jul 6, 2023",
    joinedTime: "Jul 6, 2023"
  },
  {
    id: "5kma53ae",
    amount: 874,
    name: "success",
    address: "0xf7e8...Ca79",
    role: "Project Management",
    recentlyActive: "Jul 6, 2023",
    joinedTime: "Jul 6, 2023"
  },
  {
    id: "bhqecj4p",
    amount: 721,
    name: "failed",
    address: "0xf7e8...Ca79",
    role: "Project Management",
    recentlyActive: "Jul 6, 2023",
    joinedTime: "Jul 6, 2023"
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
    accessorKey: "address",
    header: "ETH Wallet",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    )
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>
  },
  {
    accessorKey: "recentlyActive",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Recently active
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("recentlyActive")}</div>
    )
  },
  {
    accessorKey: "joinedTime",
    header: "Joined time",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("joinedTime")}</div>
    )
  }
]

const ContributorsTable = () => {
  const [sorting, setSorting] = useState([])

  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

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
          placeholder="Search by name or wallet address"
          value={table.getColumn("recentlyActive")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table
              .getColumn("recentlyActive")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button>Add contributor</Button>
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

export default ContributorsTable
