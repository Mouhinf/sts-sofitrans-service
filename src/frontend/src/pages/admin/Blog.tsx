import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminBlogPosts,
  useAdminCreateBlogPost,
  useAdminDeleteBlogPost,
  useAdminUpdateBlogPost,
} from "@/hooks/useBackend";
import type {
  BlogPost,
  BlogPostInput,
  ExternalBlob,
  PostStatus,
} from "@/types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publié" },
];

interface FormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  postStatus: string;
  tags: string;
  publishDate: string;
  featuredImage: ExternalBlob | null;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  description: "",
  content: "",
  author: "",
  postStatus: "draft",
  tags: "",
  publishDate: "",
  featuredImage: null,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toInput(f: FormState): BlogPostInput {
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

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.slug.trim()) errors.slug = "Le slug est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.content.trim()) errors.content = "Le contenu est obligatoire";
  if (!f.author.trim()) errors.author = "L'auteur est obligatoire";
  if (!f.featuredImage) errors.featuredImage = "L'image est obligatoire";
  return errors;
}

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleDateString("fr-FR");

export default function AdminBlogPage() {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const createMutation = useAdminCreateBlogPost();
  const updateMutation = useAdminUpdateBlogPost();
  const deleteMutation = useAdminDeleteBlogPost();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<BlogPost | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditTarget(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      author: p.author,
      postStatus: p.postStatus,
      tags: p.categoryTags.join(", "),
      publishDate: p.publishDate
        ? new Date(Number(p.publishDate) / 1_000_000)
            .toISOString()
            .split("T")[0]
        : "",
      featuredImage: p.featuredImage,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const handleDelete = async (p: BlogPost) => {
    try {
      await deleteMutation.mutateAsync(p.id);
      toast.success("Article supprimé");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const set = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout title="Blog">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {posts?.length ?? 0} article(s)
        </p>
        <Button onClick={openCreate} data-ocid="add-blog-btn">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel article
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Titre
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Slug
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Statut
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Date pub.
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? ["r0", "r1", "r2", "r3"].map((rk) => (
                    <tr key={rk} className="border-b border-border">
                      {["c0", "c1", "c2", "c3", "c4"].map((ck) => (
                        <td key={ck} className="p-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : posts?.map((p) => (
                    <tr
                      key={p.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-post-${p.id}`}
                    >
                      <td className="p-3 font-medium text-foreground max-w-[200px] truncate">
                        {p.title}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell font-mono text-xs max-w-[140px] truncate">
                        {p.slug}
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Badge
                          variant={
                            p.postStatus === "published"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            p.postStatus === "published"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : ""
                          }
                        >
                          {p.postStatus === "published"
                            ? "Publié"
                            : "Brouillon"}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell text-xs">
                        {p.publishDate ? formatDate(p.publishDate) : "—"}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(p)}
                            aria-label="Modifier"
                            data-ocid="edit-post-btn"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(p)}
                            className="text-destructive hover:text-destructive"
                            aria-label="Supprimer"
                            data-ocid="delete-post-btn"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !posts?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-posts"
                  >
                    Aucun article. Créez-en un !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier l'article" : "Nouvel article"}
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <InputField
                label="Titre"
                required
                value={form.title}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!editTarget) set("slug", slugify(e.target.value));
                }}
                error={errors.title}
              />
            </div>
            <div className="col-span-2">
              <InputField
                label="Slug"
                required
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                error={errors.slug}
                hint="URL de l'article (auto-généré depuis le titre)"
              />
            </div>
            <InputField
              label="Auteur"
              required
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              error={errors.author}
            />
            <SelectField
              label="Statut"
              options={STATUS_OPTIONS}
              value={form.postStatus}
              onChange={(e) => set("postStatus", e.target.value)}
            />
            <div className="col-span-2">
              <TextareaField
                label="Description"
                required
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                error={errors.description}
                rows={2}
                hint="Résumé affiché dans la liste des articles"
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-foreground mb-1.5">
                Contenu <span className="text-destructive">*</span>
              </p>
              <RichTextEditor
                value={form.content}
                onChange={(v) => set("content", v)}
              />
              {errors.content && (
                <p className="text-xs text-destructive mt-1">
                  {errors.content}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <ImageUpload
                label="Image à la une"
                value={form.featuredImage}
                onChange={(blob) => set("featuredImage", blob)}
              />
              {errors.featuredImage && (
                <p className="text-xs text-destructive mt-1">
                  {errors.featuredImage}
                </p>
              )}
            </div>
            <InputField
              label="Tags (séparés par virgule)"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              hint="ex: transport, logistique, sénégal"
            />
            <InputField
              label="Date de publication"
              type="date"
              value={form.publishDate}
              onChange={(e) => set("publishDate", e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createMutation.isPending || updateMutation.isPending}
              data-ocid="save-post-btn"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Enregistrement…"
                : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmer la suppression"
        size="sm"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Supprimer <strong>{deleteConfirm?.title}</strong> ? Cette action est
          irréversible.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setDeleteConfirm(null)}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            disabled={deleteMutation.isPending}
            className="flex-1"
            data-ocid="confirm-delete-btn"
          >
            {deleteMutation.isPending ? "Suppression…" : "Supprimer"}
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
