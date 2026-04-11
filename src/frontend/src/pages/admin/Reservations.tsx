import { AdminLayout } from "@/components/AdminLayout";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminBookings,
  useAdminUpdateBookingStatus,
} from "@/hooks/useBackend";
import type { Booking } from "@/types";
import { BookingStatus } from "@/types";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.pending]: "En attente",
  [BookingStatus.confirmed]: "Confirmée",
  [BookingStatus.cancelled]: "Annulée",
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  [BookingStatus.pending]: "bg-amber-50 text-amber-700 border-amber-200",
  [BookingStatus.confirmed]: "bg-primary/10 text-primary border-primary/20",
  [BookingStatus.cancelled]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleDateString("fr-FR");

export default function AdminReservationsPage() {
  const { data: bookings, isLoading } = useAdminBookings();
  const updateStatus = useAdminUpdateBookingStatus();
  const [selected, setSelected] = useState<Booking | null>(null);

  const handleStatus = async (booking: Booking, status: BookingStatus) => {
    try {
      await updateStatus.mutateAsync({ id: booking.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === booking.id) setSelected({ ...booking, status });
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <AdminLayout title="Réservations">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {bookings?.length ?? 0} réservation(s)
        </p>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              BookingStatus.pending,
              BookingStatus.confirmed,
              BookingStatus.cancelled,
            ] as BookingStatus[]
          ).map((s) => (
            <span
              key={s}
              className={`px-2 py-0.5 rounded-full border text-xs ${STATUS_COLORS[s]}`}
            >
              {bookings?.filter((b) => b.status === s).length ?? 0}{" "}
              {STATUS_LABELS[s].toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Client
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Email
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Véhicule ID
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Dates
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Statut
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? ["r1", "r2", "r3", "r4", "r5"].map((sk) => (
                    <tr key={sk} className="border-b border-border">
                      {["c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => (
                        <td key={ck} className="p-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : bookings?.map((b) => (
                    <tr
                      key={b.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-booking-${b.id}`}
                    >
                      <td className="p-3 font-medium text-foreground">
                        {b.customerName}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {b.email}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell font-mono text-xs">
                        {b.vehicleId.toString()}
                      </td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell text-xs whitespace-nowrap">
                        {b.startDate} → {b.endDate}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={STATUS_COLORS[b.status]}
                        >
                          {STATUS_LABELS[b.status]}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-1">
                          {b.status === BookingStatus.pending && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleStatus(b, BookingStatus.confirmed)
                                }
                                className="text-primary"
                                aria-label="Confirmer"
                                data-ocid={`confirm-booking-${b.id}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleStatus(b, BookingStatus.cancelled)
                                }
                                className="text-destructive"
                                aria-label="Annuler"
                                data-ocid={`cancel-booking-${b.id}`}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelected(b)}
                            aria-label="Voir"
                            data-ocid="view-booking-btn"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !bookings?.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-bookings"
                  >
                    Aucune réservation pour l'instant
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Détail de la réservation"
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Client</p>
                <p className="font-medium">{selected.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
                <Badge
                  variant="outline"
                  className={STATUS_COLORS[selected.status]}
                >
                  {STATUS_LABELS[selected.status]}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-primary hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Téléphone
                </p>
                <p>{selected.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Début</p>
                <p>{selected.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Fin</p>
                <p>{selected.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Véhicule ID
                </p>
                <p className="font-mono text-xs">
                  {selected.vehicleId.toString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Créée le</p>
                <p>{formatDate(selected.createdAt)}</p>
              </div>
              {selected.specialRequests && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Demandes spéciales
                  </p>
                  <p className="text-sm bg-muted/50 rounded-lg p-3">
                    {selected.specialRequests}
                  </p>
                </div>
              )}
            </div>
            {selected.status === BookingStatus.pending && (
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button
                  onClick={() =>
                    handleStatus(selected, BookingStatus.confirmed)
                  }
                  className="flex-1"
                  data-ocid="modal-confirm-btn"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmer
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleStatus(selected, BookingStatus.cancelled)
                  }
                  className="flex-1"
                  data-ocid="modal-cancel-btn"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
