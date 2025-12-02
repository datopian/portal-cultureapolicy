"use client";

import { useCallback, useRef, useState } from "react";
import Papa from "papaparse";
import { useResourceData } from "./DataProvider";
import { RiLoader2Line } from "react-icons/ri";


type CsvRow = Record<string, string | number | null | undefined>;

function parseCsv(data: string): CsvRow[] {
  const result = Papa.parse<CsvRow>(data, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    throw new Error(
      `CSV parsing errors: ${result.errors.map((e) => e.message).join(", ")}`
    );
  }

  return result.data;
}

export default function SearchDataForm() {
  const context = useResourceData();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<CsvRow[] | null>(null);

  const hasDataUrl = !!context?.dataUrl;

  const ensureRows = useCallback(async (): Promise<CsvRow[] | null> => {
    if (!context || !hasDataUrl) return null;

    if (rows) return rows;

    const response = await fetch(context.dataUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
    }

    const csvData = await response.text();
    const parsed = parseCsv(csvData);
    setRows(parsed);
    return parsed;
  }, [context, hasDataUrl, rows]);

  const queryData = useCallback(
    async (value: string) => {
      if (!context || !hasDataUrl) return;

      try {
        setIsLoading(true);

        const baseRows = await ensureRows();
        if (!baseRows) return;

        const qLower = value.toLowerCase();

        const matchingRows = baseRows.filter((row) =>
          Object.values(row).some((columnValue) =>
            String(columnValue ?? "")
              .toLowerCase()
              .includes(qLower)
          )
        );

        const csvString = Papa.unparse(matchingRows);
        context.setTableData(csvString);
        context.setCurrentPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [context, hasDataUrl, ensureRows]
  );

  const resetTable = useCallback(async () => {
    if (!context || !hasDataUrl) return;

    try {
      setIsLoading(true);

      const baseRows = await ensureRows();
      if (!baseRows) return;

      const csvString = Papa.unparse(baseRows);
      context.setTableData(csvString);
      context.setCurrentPage(1);
    } catch (err) {
      console.error("Failed to reset table", err);
    } finally {
      setIsLoading(false);
    }
  }, [context, hasDataUrl, ensureRows]);

  const debouncedQueryData = useCallback(
    (value: string) => {
      if (!context || !hasDataUrl) return;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        const trimmed = value.trim();

        if (trimmed === "") {
          resetTable();
        } else {
          queryData(trimmed);
        }
      }, 300);
    },
    [context, hasDataUrl, queryData, resetTable]
  );

  return (
    <div className="mb-4 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full border border-gray-200 rounded-md p-1.5 pr-8"
          onChange={(e) => debouncedQueryData(e.target.value)}
          aria-label="Global filter"
          disabled={!context || !hasDataUrl}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <RiLoader2Line className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}
