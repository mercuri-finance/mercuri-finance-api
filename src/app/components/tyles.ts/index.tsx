import React from 'react';
import styled from 'styled-components';
import { Label } from '../Label';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid #1a2230;
  border-radius: 8px;
  overflow: hidden;
  background: #11161d;
  overflow: hidden;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #1e252b;
    text-align: left;
  }

  td {
    color: #c7d2e0;
    font-size: 0.9rem;
  }

  th {
    background: #0d1218;
    color: #e3ffc1;
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td.type {
    color: #7de3c3;
    font-family: 'Fira Code', monospace;
  }

  td.required {
    color: #ef4476;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.85rem;
      padding: 0.6rem;
    }
  }
`;

const TypeCell = styled.td`
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
  color: #7de3c3;
`;

export interface SchemaField {
  name: string;
  type: string;
  required?: boolean;
  description?: string | React.ReactNode;
}

export const SchemaTable = ({
  title,
  fields,
}: {
  title: string;
  fields: SchemaField[];
}) => (
  <>
    <Label>{title}</Label>
    <Table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((f) => (
          <tr key={f.name}>
            <td>{f.name}</td>
            <td className="type">{f.type}</td>
            <td className="required">{f.required ? 'Yes' : ''}</td>
            <td>{f.description || '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);
