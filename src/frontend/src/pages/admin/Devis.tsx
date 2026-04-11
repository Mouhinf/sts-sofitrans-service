import { AdminLayout } from "@/components/AdminLayout";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

const STATUS_COLORS: Record<QuoteStatus, string> = {
  [QuoteStatus.pending]: "bg-amber-50 text-amber-700 border-amber-200",
  [QuoteStatus.sent]: "bg-secondary/10 text-secondary border-secondary/20",
  [QuoteStatus.accepted]: "bg-primary/10 text-primary border-primary/20",
  [QuoteStatus.declined]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleDateString("fr-FR");

export default function AdminDevisPage() {
  const { data: quotes, isLoading } = useAdminQuotes();
  const updateStatus = useAdminUpdateQuoteStatus();
  const [selected, setSelected] = useState<Quote | null>(null);

  const handleStatus = async (quote: Quote, status: QuoteStatus) => {
    try {
      await updateStatus.mutateAsync({ id: quote.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === quote.id) setSelected({ ...quote, status });
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <AdminLayout title="Devis">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {quotes?.length ?? 0} devis
        </p>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              QuoteStatus.pending,
              QuoteStatus.sent,
              QuoteStatus.accepted,
              QuoteStatus.declined,
            ] as QuoteStatus[]
          ).map((s) => (
            <span
              key={s}
              className={`px-2 py-0.5 rounded-full border text-xs ${STATUS_COLORS[s]}`}
            >
              {quotes?.filter((q) => q.status === s).length ?? 0}{" "}
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
                  Service
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Budget
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Date
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
                      {["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((ck) => (
                        <td key={ck} className="p-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : quotes?.map((q) => (
                    <tr
                      key={q.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-quote-${q.id}`}
                    >
                      <td className="p-3 font-medium text-foreground">
                        {q.customerName}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {q.email}
                      </td>
                      <td className="p-3 hidden md:table-cell max-w-[120px] truncate text-muted-foreground">
                        {q.serviceType}
                      </td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground">
                        {q.budgetRange || "—"}
                      </td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground text-xs whitespace-nowrap">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={STATUS_COLORS[q.status]}
                        >
                          {STATUS_LABELS[q.status]}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-1">
                          {q.status === QuoteStatus.pending && (
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
                          )}
                          {(q.status === QuoteStatus.pending ||
                            q.status === QuoteStatus.sent) && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleStatus(q, QuoteStatus.accepted)
                                }
                                className="text-primary"
                                aria-label="Accepter"
                                data-ocid={`accept-quote-${q.id}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleStatus(q, QuoteStatus.declined)
                                }
                                className="text-destructive"
                                aria-label="Refuser"
                                data-ocid={`decline-quote-${q.id}`}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelected(q)}
                            aria-label="Voir"
                            data-ocid="view-quote-btn"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !quotes?.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-quotes"
                  >
                    Aucun devis pour l'instant
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
        title="Détail du devis"
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
                <p className="text-xs text-muted-foreground mb-0.5">
                  Service demandé
                </p>
                <p>{selected.serviceType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Budget estimé
                </p>
                <p>{selected.budgetRange || "Non précisé"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Reçu le</p>
                <p>{formatDate(selected.createdAt)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Besoins / exigences
                </p>
                <p className="text-sm bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">
                  {selected.requirements || "—"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap pt-2 border-t border-border">
              {selected.status === QuoteStatus.pending && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatus(selected, QuoteStatus.sent)}
                  data-ocid="modal-send-btn"
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Marquer envoyé
                </Button>
              )}
              {(selected.status === QuoteStatus.pending ||
                selected.status === QuoteStatus.sent) && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleStatus(selected, QuoteStatus.accepted)}
                    data-ocid="modal-accept-btn"
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    Accepter
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleStatus(selected, QuoteStatus.declined)}
                    data-ocid="modal-decline-btn"
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1.5" />
                    Refuser
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
