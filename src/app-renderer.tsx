"use client";

import { useState, useEffect, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                   */
/* -------------------------------------------------------------------------- */

interface ComponentProps {
  className?: string;
  content?: string;
  level?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  text?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  collectionId?: string;
  collectionName?: string;
}

interface Component {
  id: string;
  component_type: "text" | "heading" | "input" | "button" | "table";
  props: ComponentProps;
}

interface Field {
  id: string;
  name: string;
  display_name: string;
}

interface Collection {
  id: string;
  name: string;
  fields?: Field[];
  data?: Record<string, unknown>[];
}

interface AppRendererProps {
  components: Component[];
  collections?: Collection[];
  isPreview?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                            MAIN RENDERER LOGIC                            */
/* -------------------------------------------------------------------------- */

export function AppRenderer({
  components,
  collections = [],
  isPreview = false,
}: AppRendererProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [tableData, setTableData] = useState<
    Record<string, Record<string, unknown>[]>
  >({});

  // Load table data from in-memory collections (for now)
  useEffect(() => {
    const tableComponents = components.filter(
      (c) => c.component_type === "table",
    );
    tableComponents.forEach((component) => {
      const collectionId = component.props.collectionId;
      if (collectionId) {
        const collection = collections.find((c) => c.id === collectionId);
        if (collection?.data) {
          setTableData((prev) => ({
            ...prev,
            [collectionId]: collection.data!,
          }));
        }
      }
    });
  }, [components, collections]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async () => {
    if (isPreview) return;

    console.log("Submitting form data:", formData);
    // ⏳ Later: connect this with your Prisma API route
    // await fetch("/api/collections/[id]/data", { method: "POST", body: JSON.stringify(formData) });

    setFormData({});
  };

  /* ----------------------------- RENDERER LOGIC ---------------------------- */

  const renderComponent = (component: Component) => {
    const props = component.props || {};

    switch (component.component_type) {
      case "text":
        return (
          <p key={component.id} className={props.className || ""}>
            {props.content || ""}
          </p>
        );

      case "heading": {
        const validTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
        const tag = validTags.includes(props.level || "") ? props.level! : "h2";
        const HeadingTag = tag as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={component.id} className={props.className || ""}>
            {props.content || ""}
          </HeadingTag>
        );
      }

      case "input":
        return (
          <div key={component.id} className="space-y-2">
            <Label>{props.label || ""}</Label>
            <Input
              placeholder={props.placeholder || ""}
              value={formData[props.name || ""] || ""}
              onChange={(e) =>
                handleInputChange(props.name || "", e.target.value)
              }
              disabled={isPreview}
            />
          </div>
        );

      case "button":
        return (
          <Button
            key={component.id}
            variant={props.variant}
            onClick={handleButtonClick}
            disabled={isPreview}
          >
            {props.text || "Button"}
          </Button>
        );

      case "table": {
        const collection = collections.find((c) => c.id === props.collectionId);
        const data =
          (props.collectionId && tableData[props.collectionId]) || [];

        if (!collection)
          return (
            <div key={component.id} className="text-sm text-slate-600">
              Table: {props.collectionName || "Unnamed Table"}
            </div>
          );

        return (
          <div key={component.id} className="space-y-2">
            <h3 className="text-lg font-semibold">
              {props.collectionName || "Table"}
            </h3>
            <div className="rounded-md border border-slate-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {collection.fields?.map((field) => (
                      <TableHead key={field.id}>{field.display_name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={collection.fields?.length || 1}
                        className="text-center text-slate-500"
                      >
                        No data yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((row, idx) => (
                      <TableRow key={idx}>
                        {collection.fields?.map((field) => (
                          <TableCell key={field.id}>
                            {(row[field.name] as string) || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  /* ---------------------------- EMPTY STATE ---------------------------- */

  if (components.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        No components added yet
      </div>
    );
  }

  /* ---------------------------- MAIN RENDER ---------------------------- */

  return (
    <div className="space-y-8">
      {components.map((component) => renderComponent(component))}
    </div>
  );
}
