import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminDataTable,
  StatusPill,
  type StatusTone,
} from "@/components/admin";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  useAdminBookings,
  useUpdateBookingStatus,
} from "@/hooks/useBackend";
import type { Booking, BookingStatus } from "@/types";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS: Record<BookingStatus, string> = {
  ["pending"]: "En attente",
  ["confirmed"]: "Confirmée",
  ["cancelled"]: "Annulée",
};

const STATUS_TONES: Record<BookingStatus, StatusTone> = {
  ["pending"]: "amber",
  ["confirmed"]: "primary",
  ["cancelled"]: "destructive",
};

const STATUS_ORDER: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
];

const formatDate = (ts: string) =>
  new Date(ts).toLocaleDateString("fr-FR");

function BookingDetailModal({
  booking,
  onClose,
  onStatus,
}: {
  booking: Booking;
  onClose: () => void;
  onStatus: (status: BookingStatus) => void;
}) {
  return (
    <Modal isOpen onClose={onClose} title="Détail de la réservation" size="md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Client</p>
            <p className="font-medium">{booking.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
            <StatusPill
              label={STATUS_LABELS[booking.status]}
              tone={STATUS_TONES[booking.status]}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <a
              href={`mailto:${booking.email}`}
              className="text-primary hover:underline"
            >
              {booking.email}
            </a>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Téléphone</p>
            <p>{booking.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Début</p>
            <p>{booking.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Fin</p>
            <p>{booking.endDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Véhicule ID</p>
            <p className="font-mono text-xs">{booking.vehicleId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Créée le</p>
            <p>{formatDate(booking.createdAt)}</p>
          </div>
          {booking.specialRequests ? (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground mb-0.5">
                Demandes spéciales
              </p>
              <p className="text-sm bg-muted/50 rounded-lg p-3">
                {booking.specialRequests}
              </p>
            </div>
          ) : null}
        </div>
        {booking.status === "pending" ? (
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button
              onClick={() => onStatus("confirmed")}
              className="flex-1"
              data-ocid="modal-confirm-btn"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmer
            </Button>
            <Button
              variant="destructive"
              onClick={() => onStatus("cancelled")}
              className="flex-1"
              data-ocid="modal-cancel-btn"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

export default function AdminReservationsPage() {
  const { data: bookings, isLoading } = useAdminBookings();
  const updateStatus = useUpdateBookingStatus();
  const [selected, setSelected] = useState<Booking | null>(null);

  async function handleStatus(booking: Booking, status: BookingStatus) {
    try {
      await updateStatus.mutateAsync({ id: booking.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === booking.id) {
        setSelected({ ...booking, status });
      }
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  }

  const counts = STATUS_ORDER.reduce<Record<BookingStatus, number>>(
    (acc, s) => {
      acc[s] = bookings?.filter((b) => b.status === s).length ?? 0;
      return acc;
    },
    { pending: 0, confirmed: 0, cancelled: 0 } as Record<BookingStatus, number>,
  );

  return (
    <AdminLayout title="Réservations">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          {bookings?.length ?? 0} réservation(s)
        </p>
        <div className="flex gap-2 flex-wrap">
          {STATUS_ORDER.map((s) => (
            <StatusPill
              key={s}
              label={`${counts[s]} ${STATUS_LABELS[s].toLowerCase()}`}
              tone={STATUS_TONES[s]}
            />
          ))}
        </div>
      </div>

      <AdminDataTable
        items={bookings}
        isLoading={isLoading}
        rowOcid={(b) => `admin-booking-${b.id}`}
        getRowKey={(b) => b.id}
        emptyOcid="empty-admin-bookings"
        emptyMessage="Aucune réservation pour l'instant"
        skeletonCols={6}
        columns={[
          {
            key: "client",
            label: "Client",
            render: (b) => (
              <span className="font-medium text-foreground">
                {b.customerName}
              </span>
            ),
          },
          {
            key: "email",
            label: "Email",
            className: "text-muted-foreground",
            showOn: "md",
            render: (b) => b.email,
          },
          {
            key: "vehicleId",
            label: "Véhicule ID",
            className: "text-muted-foreground font-mono text-xs",
            showOn: "md",
            render: (b) => b.vehicleId,
          },
          {
            key: "dates",
            label: "Dates",
            className: "text-muted-foreground text-xs whitespace-nowrap",
            showOn: "lg",
            render: (b) => `${b.startDate} → ${b.endDate}`,
          },
          {
            key: "status",
            label: "Statut",
            render: (b) => (
              <StatusPill
                label={STATUS_LABELS[b.status]}
                tone={STATUS_TONES[b.status]}
              />
            ),
          },
        ]}
        renderActions={(b) => (
          <>
            {b.status === "pending" ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatus(b, "confirmed")}
                  className="text-primary"
                  aria-label="Confirmer"
                  data-ocid={`confirm-booking-${b.id}`}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatus(b, "cancelled")}
                  className="text-destructive"
                  aria-label="Annuler"
                  data-ocid={`cancel-booking-${b.id}`}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelected(b)}
              aria-label="Voir"
              data-ocid="view-booking-btn"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </>
        )}
      />

      {selected ? (
        <BookingDetailModal
          booking={selected}
          onClose={() => setSelected(null)}
          onStatus={(s) => handleStatus(selected, s)}
        />
      ) : null}
    </AdminLayout>
  );
}
