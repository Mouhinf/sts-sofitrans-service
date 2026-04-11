import { AdminLayout } from "@/components/AdminLayout";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminMessages,
  useAdminUpdateMessageStatus,
} from "@/hooks/useBackend";
import type { Message } from "@/types";
import { MessageStatus } from "@/types";
import { Archive, Eye, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Filter = "all" | MessageStatus;

const STATUS_LABELS: Record<string, string> = {
  unread: "Non lu",
  read: "Lu",
  archived: "Archivé",
};

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function AdminMessagesPage() {
  const { data: messages, isLoading } = useAdminMessages();
  const updateStatus = useAdminUpdateMessageStatus();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Message | null>(null);

  const filtered = messages?.filter((m) =>
    filter === "all" ? true : m.status === filter,
  );

  const handleStatus = async (msg: Message, status: MessageStatus) => {
    try {
      await updateStatus.mutateAsync({ id: msg.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === msg.id) setSelected({ ...msg, status });
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "Tous" },
    { value: MessageStatus.unread, label: "Non lus" },
    { value: MessageStatus.read, label: "Lus" },
    { value: MessageStatus.archived, label: "Archivés" },
  ];

  return (
    <AdminLayout title="Messages">
      <div className="flex gap-2 mb-6 flex-wrap" data-ocid="message-filters">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors duration-150 ${
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:bg-muted/50"
            }`}
            data-ocid={`filter-${f.value}`}
          >
            {f.label}
            {f.value !== "all" && messages && (
              <span className="ml-1.5 text-xs opacity-70">
                ({messages.filter((m) => m.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Nom
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Email
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Téléphone
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Extrait
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
                : filtered?.map((msg) => (
                    <tr
                      key={msg.id.toString()}
                      className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer ${msg.status === MessageStatus.unread ? "font-medium" : ""}`}
                      onClick={() => setSelected(msg)}
                      onKeyDown={(e) => e.key === "Enter" && setSelected(msg)}
                      tabIndex={0}
                      data-ocid={`admin-message-${msg.id}`}
                    >
                      <td className="p-3 text-foreground">
                        {msg.customerName}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {msg.email}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {msg.phone}
                      </td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                        {msg.message}
                      </td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell text-xs whitespace-nowrap">
                        {formatDate(msg.createdAt)}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            msg.status === MessageStatus.unread
                              ? "default"
                              : "outline"
                          }
                          className={
                            msg.status === MessageStatus.unread
                              ? "bg-primary/10 text-primary border-primary/20"
                              : ""
                          }
                        >
                          {STATUS_LABELS[msg.status] ?? msg.status}
                        </Badge>
                      </td>
                      <td
                        className="p-3"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          {msg.status !== MessageStatus.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleStatus(msg, MessageStatus.read)
                              }
                              aria-label="Marquer comme lu"
                              data-ocid={`mark-read-${msg.id}`}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          )}
                          {msg.status !== MessageStatus.archived && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleStatus(msg, MessageStatus.archived)
                              }
                              aria-label="Archiver"
                              data-ocid={`archive-msg-${msg.id}`}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelected(msg)}
                            aria-label="Voir"
                            data-ocid="view-message-btn"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !filtered?.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-messages"
                  >
                    Aucun message dans cette catégorie
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
        title="Détail du message"
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Nom</p>
                <p className="font-medium">{selected.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
                <Badge
                  variant={
                    selected.status === MessageStatus.unread
                      ? "default"
                      : "outline"
                  }
                >
                  {STATUS_LABELS[selected.status] ?? selected.status}
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
                <p>{selected.phone || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-0.5">Reçu le</p>
                <p>{formatDate(selected.createdAt)}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Message
              </p>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {selected.status !== MessageStatus.read && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatus(selected, MessageStatus.read)}
                  data-ocid="modal-mark-read-btn"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Marquer comme lu
                </Button>
              )}
              {selected.status !== MessageStatus.archived && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatus(selected, MessageStatus.archived)}
                  data-ocid="modal-archive-btn"
                >
                  <Archive className="h-3.5 w-3.5 mr-1.5" />
                  Archiver
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
