import { ImageUpload } from "@/components/ui/ImageUpload";
import { InputField } from "@/components/ui/InputField";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import type { ExternalBlob, PostStatus } from "@/types";

export interface BlogFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  postStatus: PostStatus;
  tags: string;
  publishDate: string;
  featuredImage: ExternalBlob | null;
}

export const POST_STATUS_OPTIONS = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publié" },
] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface BlogFormProps {
  value: BlogFormState;
  onChange: (next: BlogFormState) => void;
  errors?: Partial<Record<keyof BlogFormState, string>>;
}

export function BlogForm({ value, onChange, errors = {} }: BlogFormProps) {
  function set<K extends keyof BlogFormState>(key: K, val: BlogFormState[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <InputField
          label="Titre"
          required
          value={value.title}
          onChange={(e) => {
            const title = e.target.value;
            const next = { ...value, title };
            if (!value.slug || value.slug === slugify(value.title)) {
              next.slug = slugify(title);
            }
            onChange(next);
          }}
          error={errors.title}
        />
      </div>
      <InputField
        label="Slug"
        required
        value={value.slug}
        onChange={(e) => set("slug", e.target.value)}
        error={errors.slug}
        hint="URL-friendly, ex: mon-article-2024"
      />
      <InputField
        label="Auteur"
        required
        value={value.author}
        onChange={(e) => set("author", e.target.value)}
        error={errors.author}
      />
      <SelectField
        label="Statut"
        options={[...POST_STATUS_OPTIONS]}
        value={value.postStatus}
        onChange={(e) => set("postStatus", e.target.value as PostStatus)}
      />
      <InputField
        label="Date de publication"
        type="date"
        value={value.publishDate}
        onChange={(e) => set("publishDate", e.target.value)}
      />
      <div className="col-span-2">
        <TextareaField
          label="Description (extrait)"
          required
          value={value.description}
          onChange={(e) => set("description", e.target.value)}
          error={errors.description}
          rows={2}
        />
      </div>
      <InputField
        label="Tags (séparés par des virgules)"
        value={value.tags}
        onChange={(e) => set("tags", e.target.value)}
        placeholder="Transport, Logistique, Sénégal"
      />
      <div className="col-span-2">
        <p className="text-sm font-medium text-foreground mb-2">Contenu</p>
        <RichTextEditor
          value={value.content}
          onChange={(html) => set("content", html)}
        />
        {errors.content ? (
          <p className="text-xs text-destructive mt-1" role="alert">
            {errors.content}
          </p>
        ) : null}
      </div>
      <div className="col-span-2">
        <p className="text-sm font-medium text-foreground mb-2">
          Image mise en avant
        </p>
        <ImageUpload
          value={value.featuredImage}
          onChange={(blob) => set("featuredImage", blob)}
        />
        {errors.featuredImage ? (
          <p className="text-xs text-destructive mt-1" role="alert">
            {errors.featuredImage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
