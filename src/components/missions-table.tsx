import React, { useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from './button';
import { IconChevronDown } from '@tabler/icons-react';
import { Mission, missionData } from '../data';

export const MissionsTable: React.FC<MissionsTableProps> = (props) => {
  const [data, _setData] = useState(() => [...missionData]);

  const columns = useMemo<ColumnDef<Mission>[]>(() => {
    const columns = [
      {
        id: 'choose',
        header: '',
        cell: () => <input type="checkbox" />,
      },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      { accessorKey: 'mission', header: 'Mission' },
    ];

    if (props.verify) {
      columns.push(
        { accessorKey: 'date', header: 'Date' },
        {
          id: 'verify',
          header: 'Verify',
          cell: () => (
            <Button className="flex gap-2 py-1">
              Verify
              <IconChevronDown />
            </Button>
          ),
        }
      );
    }

    return columns;
  }, [props.verify]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const containerRef = React.useRef(null);

  return (
    <div className="bg-white border-2 border-brand-100 rounded-md p-4">
      <h2 className="font-bold text-xl text-brand py-2 px-2">{props.title}</h2>
      <div className="h-96 relative overflow-auto" ref={containerRef}>
        <table className="w-full">
          <thead className="sticky top-0 z-1 bg-white border-b-2 border-brand box-content">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-brand ">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-brand-200 text-left">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              return (
                <tr key={row.id} className="border-b border-b-brand">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-6 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export interface MissionsTableProps {
  verify?: boolean;
  title: string;
}
