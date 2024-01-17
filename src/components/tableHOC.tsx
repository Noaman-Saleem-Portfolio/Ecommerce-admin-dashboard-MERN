import * as React from 'react'


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

interface DataType {
    id: string;
    quantity: number;
    discount: number;
    amount: number;
    status: string;
  }

const defaultData: DataType[] = [
    {
        "id": "1",
        "amount": 4000,
        "quantity": 4,
        "discount": 300,
        "status": "Processing"
      },
      {
        "id": "2",
        "amount": 5100,
        "quantity": 2,
        "discount": 900,
        "status": "Processing"
      },
      {
        "id": "3",
        "amount": 13000,
        "quantity": 91,
        "discount": 0,
        "status": "Shipped"
      },
      {
        "id": "4",
        "amount": 2300,
        "quantity": 4,
        "discount": 2000,
        "status": "Processing"
      },
]

const columnHelper = createColumnHelper<DataType>()

const columns = [
  columnHelper.accessor('id', {
    // header: () => 'IId',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.amount, {
    id: 'amount',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Amount</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('quantity', {
    header: () => 'Quantity',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('discount', {
    header: () => <span>Discount</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  
]

function TableHOC() {
  const [data, setData] = React.useState(() => [...defaultData])
//   const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="transaction-box">
      <table  className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      {/* <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
    </div>
  )
}


export default TableHOC