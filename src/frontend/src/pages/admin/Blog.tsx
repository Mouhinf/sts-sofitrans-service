import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminAddButton,
  AdminDataTable,
  AdminDeleteButton,
  AdminEditButton,
  BlogForm,
  type BlogFormState,
  DeleteConfirmDialog,
  FormModal,
} from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import {
  useAdminBlogPosts,
  useAdminCreateBlogPost,
  useAdminDeleteBlogPost,
  useAdminUpdateBlogPost,
} from "@/hooks/useBackend";
import { formatBlogDate } from "@/lib/blog";
import type { BlogPost, BlogPostInput, PostStatus } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM: BlogFormState = {
  title: "",
  slug: "",
  description: "",
  content: "",
  author: "",
  postStatus: "draft" as PostStatus,
  tags: "",
  publishDate: "",
  featuredImage: null,
};

function toInput(f: BlogFormState): BlogPostInput {
  return {
    title: f.title,
    slug: f.slug,
    description: f.description,
    content: f.content,
    author: f.author,
    postStatus: f.postStatus as PostStatus,
    categoryTags: f.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    featuredImage: f.featuredImage!,
    publishDate: f.publishDate
      ? BigInt(new Date(f.publishDate).getTime() * 1_000_000)
      : undefined,
  };
}

function fromEntity(p: BlogPost): BlogFormState {
  const dt = p.publishDate ? new Date(Number(p.publishDate) / 1_000_000) : null;
  return {
    title: p.title,
    slug: p.slug,
    description: p.description,
    content: p.content,
    author: p.author,
    postStatus: p.postStatus,
    tags: p.categoryTags.join(", "),
    publishDate: dt
      ? `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`
      : "",
    featuredImage: p.featuredImage,
  };
}

function validate(
  f: BlogFormState,
): Partial<Record<keyof BlogFormState, string>> {
  const errors: Partial<Record<keyof BlogFormState, string>> = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.slug.trim()) errors.slug = "Le slug est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.content.trim()) errors.content = "Le contenu est obligatoire";
  if (!f.author.trim()) errors.author = "L'auteur est obligatoire";
  if (!f.featuredImage) errors.featuredImage = "L'image est obligatoire";
  return errors;
}

export default function AdminBlogPage() {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const createMutation = useAdminCreateBlogPost();
  const updateMutation = useAdminUpdateBlogPost();
  const deleteMutation = useAdminDeleteBlogPost();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<BlogFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogFormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<BlogPost | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(p: BlogPost) {
    setEditTarget(p);
    setForm(fromEntity(p));
    setErrors({});
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const input = toInput(form);
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, input });
        toast.success("Article mis à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Article créé");
      }
      setModalOpen(false);
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    try {
      await deleteMutation.mutateAsync(deleteConfirm.id);
      toast.success("Article supprimé");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  return (
    <AdminLayout title="Blog">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {posts?.length ?? 0} article(s)
        </p>
        <AdminAddButton onClick={openCreate} ocid="add-post-btn">
          Nouvel article
        </AdminAddButton>
      </div>

      <AdminDataTable
        items={posts}
        isLoading={isLoading}
        rowOcid={() => "post-row"}
        getRowKey={(p) => p.id.toString()}
        emptyOcid="empty-admin-posts"
        emptyMessage="Aucun article. Créez-en un !"
        skeletonCols={5}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (p) => {
              const url = p.featuredImage?.getDirectURL?.();
              return url ? (
                <img
                  src={url}
                  alt={p.title}
                  className="h-10 w-14 object-cover rounded-md"
                />
              ) : (
                <div className="h-10 w-14 bg-muted rounded-md" />
              );
            },
          },
          {
            key: "title",
            label: "Titre",
            render: (p) => (
              <span className="font-medium text-foreground max-w-[200px] truncate block">
                {p.title}
              </span>
            ),
          },
          {
            key: "status",
            label: "Statut",
            render: (p) => (
              <Badge
                variant="outline"
                className={
                  p.postStatus === "published"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-muted text-muted-foreground"
                }
              >
                {p.postStatus === "published" ? "Publié" : "Brouillon"}
              </Badge>
            ),
          },
          {
            key: "author",
            label: "Auteur",
            className: "text-muted-foreground",
            showOn: "md",
            render: (p) => p.author,
          },
          {
            key: "date",
            label: "Date",
            showOn: "lg",
            render: (p) =>
              p.publishDate ? (
                <span className="text-muted-foreground text-xs">
                  {formatBlogDate(p.publishDate)}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              ),
          },
        ]}
        renderActions={(p) => (
          <>
            <AdminEditButton onClick={() => openEdit(p)} ocid="edit-post-btn" />
            <AdminDeleteButton
              onClick={() => setDeleteConfirm(p)}
              ocid="delete-post-btn"
            />
          </>
        )}
      />

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier l'article" : "Nouvel article"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitOcid="save-post-btn"
      >
        <BlogForm value={form} onChange={setForm} errors={errors} />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        itemName={deleteConfirm?.title}
        entityLabel="cet article"
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
