import React, { useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Button } from './button';
import { IconChevronDown } from '@tabler/icons-react';
import { missionData } from '../data';
import './missions-table.css';

export const MissionsTable = (props) => {
  const [data, _setData] = useState(() => [...missionData]);

  const columns = useMemo(() => {
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
            <Button className="verify-button">
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
    <div className="missions-table">
      <h2>{props.title}</h2>
      <div className="table-wrapper" ref={containerRef}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
