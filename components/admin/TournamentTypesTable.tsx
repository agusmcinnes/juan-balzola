"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import type { TournamentType } from "@/lib/types/database";

export default function TournamentTypesTable({
  types,
  onEdit,
  onDelete,
}: {
  types: TournamentType[];
  onEdit: (type: TournamentType) => void;
  onDelete: (type: TournamentType) => void;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-foreground/50">Nombre</TableHead>
            <TableHead className="text-foreground/50">Vista previa</TableHead>
            <TableHead className="text-foreground/50">Orden</TableHead>
            <TableHead className="text-foreground/50 text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-foreground/40 py-8"
              >
                No hay tipos de torneo cargados
              </TableCell>
            </TableRow>
          ) : (
            types.map((type) => (
              <TableRow key={type.id} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {type.name}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${type.color_bg} ${type.color_text} ${type.color_border}`}
                  >
                    {type.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground/70">
                  {type.sort_order}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/50 hover:text-foreground"
                      onClick={() => onEdit(type)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/50 hover:text-destructive"
                      onClick={() => onDelete(type)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
