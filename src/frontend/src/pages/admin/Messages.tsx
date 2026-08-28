import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminDataTable,
  StatusPill,
  type StatusTone,
} from "@/components/admin";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  useAdminMessages,
  useAdminUpdateMessageStatus,
} from "@/hooks/useBackend";
import type { Message, MessageStatus } from "@/types";
import { Archive, Eye, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Filter = "all" | MessageStatus;

const STATUS_LABELS: Record<string, string> = {
  unread: "Non lu",
  read: "Lu",
  archived: "Archivé",
};

const STATUS_TONES: Record<string, StatusTone> = {
  unread: "amber",
  read: "secondary",
  archived: "muted",
};

const formatDate = (ts: string) =>
  new Date(ts).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "unread", label: "Non lus" },
  { value: "read", label: "Lus" },
  { value: "archived", label: "Archivés" },
];

function MessageDetailModal({
  message,
  onClose,
  onStatus,
}: {
  message: Message;
  onClose: () => void;
  onStatus: (status: MessageStatus) => void;
}) {
  return (
    <Modal isOpen onClose={onClose} title="Détail du message" size="md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Nom</p>
            <p className="font-medium">{message.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
            <StatusPill
              label={STATUS_LABELS[message.status] ?? message.status}
              tone={STATUS_TONES[message.status] ?? "muted"}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <a
              href={`mailto:${message.email}`}
              className="text-primary hover:underline"
            >
              {message.email}
            </a>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Téléphone</p>
            <p>{message.phone || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground mb-0.5">Reçu le</p>
            <p>{formatDate(message.createdAt)}</p>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Message
          </p>
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {message.status !== "read" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatus("read")}
              data-ocid="modal-mark-read-btn"
            >
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Marquer comme lu
            </Button>
          ) : null}
          {message.status !== "archived" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatus("archived")}
              data-ocid="modal-archive-btn"
            >
              <Archive className="h-3.5 w-3.5 mr-1.5" />
              Archiver
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default function AdminMessagesPage() {
  const { data: messages, isLoading } = useAdminMessages();
  const updateStatus = useAdminUpdateMessageStatus();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Message | null>(null);

  const filtered = messages?.filter((m) =>
    filter === "all" ? true : m.status === filter,
  );

  async function handleStatus(msg: Message, status: MessageStatus) {
    try {
      await updateStatus.mutateAsync({ id: msg.id, status });
      toast.success("Statut mis à jour");
      if (selected?.id === msg.id) {
        setSelected({ ...msg, status });
      }
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  }

  return (
    <AdminLayout title="Messages">
      <div className="flex gap-2 mb-6 flex-wrap" data-ocid="message-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:bg-muted/50"
            }`}
            data-ocid={`filter-${f.value}`}
          >
            {f.label}
            {f.value !== "all" && messages ? (
              <span className="ml-1.5 text-xs opacity-70">
                ({messages.filter((m) => m.status === f.value).length})
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <AdminDataTable
        items={filtered}
        isLoading={isLoading}
        rowOcid={(m) => `admin-message-${m.id}`}
        getRowKey={(m) => m.id}
        emptyOcid="empty-admin-messages"
        emptyMessage="Aucun message dans cette catégorie"
        skeletonCols={7}
        columns={[
          {
            key: "name",
            label: "Nom",
            render: (m) => (
              <span
                className={
                  m.status === "unread"
                    ? "font-medium text-foreground"
                    : "text-foreground"
                }
              >
                {m.customerName}
              </span>
            ),
          },
          {
            key: "email",
            label: "Email",
            className: "text-muted-foreground",
            showOn: "md",
            render: (m) => m.email,
          },
          {
            key: "phone",
            label: "Téléphone",
            className: "text-muted-foreground",
            showOn: "md",
            render: (m) => m.phone,
          },
          {
            key: "excerpt",
            label: "Extrait",
            className: "text-muted-foreground max-w-[200px] truncate",
            showOn: "lg",
            render: (m) => m.message,
          },
          {
            key: "date",
            label: "Date",
            className: "text-muted-foreground text-xs whitespace-nowrap",
            showOn: "lg",
            render: (m) => formatDate(m.createdAt),
          },
          {
            key: "status",
            label: "Statut",
            render: (m) => (
              <StatusPill
                label={STATUS_LABELS[m.status] ?? m.status}
                tone={STATUS_TONES[m.status] ?? "muted"}
              />
            ),
          },
        ]}
        renderActions={(m) => (
          <>
            {m.status !== "read" ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleStatus(m, "read")}
                aria-label="Marquer comme lu"
                data-ocid={`mark-read-${m.id}`}
              >
                <Mail className="h-4 w-4" />
              </Button>
            ) : null}
            {m.status !== "archived" ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleStatus(m, "archived")}
                aria-label="Archiver"
                data-ocid={`archive-msg-${m.id}`}
              >
                <Archive className="h-4 w-4" />
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelected(m)}
              aria-label="Voir"
              data-ocid="view-message-btn"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </>
        )}
      />

      {selected ? (
        <MessageDetailModal
          message={selected}
          onClose={() => setSelected(null)}
          onStatus={(s) => handleStatus(selected, s)}
        />
      ) : null}
    </AdminLayout>
  );
}
