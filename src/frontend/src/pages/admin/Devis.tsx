import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminDataTable,
  StatusPill,
  type StatusTone,
} from "@/components/admin";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { useAdminQuotes, useAdminUpdateQuoteStatus } from "@/hooks/useBackend";
import type { Quote } from "@/types";
import { QuoteStatus } from "@/types";
import { CheckCircle, Eye, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS: Record<QuoteStatus, string> = {
  [QuoteStatus.pending]: "En attente",
  [QuoteStatus.sent]: "Envoyé",
  [QuoteStatus.accepted]: "Accepté",
  [QuoteStatus.declined]: "Refusé",
};

const STATUS_TONES: Record<QuoteStatus, StatusTone> = {
  [QuoteStatus.pending]: "amber",
  [QuoteStatus.sent]: "secondary",
  [QuoteStatus.accepted]: "primary",
  [QuoteStatus.declined]: "destructive",
};

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleDateString("fr-FR");

const STATUS_ORDER: QuoteStatus[] = [
  QuoteStatus.pending,
  QuoteStatus.sent,
  QuoteStatus.accepted,
  QuoteStatus.declined,
];

function QuoteDetailModal({
  quote,
  onClose,
  onStatus,
}: {
  quote: Quote;
  onClose: () => void;
  onStatus: (status: QuoteStatus) => void;
}) {
  return (
    <Modal isOpen onClose={onClose} title="Détail du devis" size="md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Client</p>
            <p className="font-medium">{quote.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
            <StatusPill
              label={STATUS_LABELS[quote.status]}
              tone={STATUS_TONES[quote.status]}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <a
              href={`mailto:${quote.email}`}
              className="text-primary hover:underline"
            >
              {quote.email}
            </a>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Téléphone</p>
            <p>{quote.phone}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Service demandé
            </p>
            <p>{quote.serviceType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Budget estimé
            </p>
            <p>{quote.budgetRange || "Non précisé"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Reçu le</p>
            <p>{formatDate(quote.createdAt)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-0.5">
              Besoins / exigences
            </p>
            <p className="text-sm bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">
              {quote.requirements || "—"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap pt-2 border-t border-border">
          {quote.status === QuoteStatus.pending ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatus(QuoteStatus.sent)}
              data-ocid="modal-send-btn"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Marquer envoyé
            </Button>
          ) : null}
          {quote.status === QuoteStatus.pending ||
          quote.status === QuoteStatus.sent ? (
            <>
              <Button
                size="sm"
                onClick={() => onStatus(QuoteStatus.accepted)}
                data-ocid="modal-accept-btn"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Accepter
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onStatus(QuoteStatus.declined)}
                data-ocid="modal-decline-btn"
              >
                <XCircle className="h-3.5 w-3.5 mr-1.5" />
                Refuser
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default function AdminDevisPage() {
  const { data: quotes, isLoading } = useAdminQuotes();
  const updateStatus = useAdminUpdateQuoteStatus();
  const [selected, setSelected] = useState<Quote | null>(null);

  async function handleStatus(quote: Quote, status: QuoteStatus) {
    try {
      await updateStatus.mutateAsync({ id: quote.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === quote.id) {
        setSelected({ ...quote, status });
      }
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  }

  const counts = STATUS_ORDER.reduce<Record<QuoteStatus, number>>(
    (acc, s) => {
      acc[s] = quotes?.filter((q) => q.status === s).length ?? 0;
      return acc;
    },
    { pending: 0, sent: 0, accepted: 0, declined: 0 } as Record<
      QuoteStatus,
      number
    >,
  );

  return (
    <AdminLayout title="Devis">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          {quotes?.length ?? 0} devis
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
        items={quotes}
        isLoading={isLoading}
        rowOcid={(q) => `admin-quote-${q.id}`}
        getRowKey={(q) => q.id.toString()}
        emptyOcid="empty-admin-quotes"
        emptyMessage="Aucun devis pour l'instant"
        skeletonCols={7}
        columns={[
          {
            key: "client",
            label: "Client",
            render: (q) => (
              <span className="font-medium text-foreground">
                {q.customerName}
              </span>
            ),
          },
          {
            key: "email",
            label: "Email",
            className: "text-muted-foreground",
            showOn: "md",
            render: (q) => q.email,
          },
          {
            key: "service",
            label: "Service",
            className: "text-muted-foreground max-w-[120px] truncate",
            showOn: "md",
            render: (q) => q.serviceType,
          },
          {
            key: "budget",
            label: "Budget",
            className: "text-muted-foreground",
            showOn: "lg",
            render: (q) => q.budgetRange || "—",
          },
          {
            key: "date",
            label: "Date",
            className: "text-muted-foreground text-xs whitespace-nowrap",
            showOn: "lg",
            render: (q) => formatDate(q.createdAt),
          },
          {
            key: "status",
            label: "Statut",
            render: (q) => (
              <StatusPill
                label={STATUS_LABELS[q.status]}
                tone={STATUS_TONES[q.status]}
              />
            ),
          },
        ]}
        renderActions={(q) => (
          <>
            {q.status === QuoteStatus.pending ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleStatus(q, QuoteStatus.sent)}
                className="text-secondary"
                aria-label="Marquer envoyé"
                data-ocid={`send-quote-${q.id}`}
              >
                <Send className="h-4 w-4" />
              </Button>
            ) : null}
            {q.status === QuoteStatus.pending ||
            q.status === QuoteStatus.sent ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatus(q, QuoteStatus.accepted)}
                  className="text-primary"
                  aria-label="Accepter"
                  data-ocid={`accept-quote-${q.id}`}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatus(q, QuoteStatus.declined)}
                  className="text-destructive"
                  aria-label="Refuser"
                  data-ocid={`decline-quote-${q.id}`}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelected(q)}
              aria-label="Voir"
              data-ocid="view-quote-btn"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </>
        )}
      />

      {selected ? (
        <QuoteDetailModal
          quote={selected}
          onClose={() => setSelected(null)}
          onStatus={(s) => handleStatus(selected, s)}
        />
      ) : null}
    </AdminLayout>
  );
}
