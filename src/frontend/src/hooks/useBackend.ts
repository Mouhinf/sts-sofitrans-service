// src/frontend/src/hooks/useBackend.ts
//
// React Query bindings for the REST API. Every public + admin operation
// previously exposed by the Motoko canister is re-exported here so the
// existing call sites (admin pages, public service pages, etc.) keep
// compiling while now talking to Node + Prisma.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type BlogPage,
  type BlogPost,
  type BlogPostInput,
  type Booking,
  type BookingInput,
  type BookingStatus,
  type CompanySettings,
  type CompanySettingsInput,
  type Message,
  type MessageStatus,
  type NewsletterSubscriber,
  type PostStatus,
  type Property,
  type PropertyFilter,
  type PropertyInput,
  type PropertyType,
  type Quote,
  type QuoteInput,
  type QuoteStatus,
  type Training,
  type TrainingEnrollment,
  type TrainingInput,
  type Vehicle,
  type VehicleFilter,
  type VehicleInput,
  type VehicleType,
} from "@/types";
import { buildQuery, request } from "@/lib/apiClient";

// ── Public queries ─────────────────────────────────────────────

export function useProperties(filter: PropertyFilter = {}) {
  return useQuery<Property[]>({
    queryKey: ["properties", filter],
    queryFn: () =>
      request<Property[]>(
        `/api/properties${buildQuery({
          propertyType: filter.propertyType,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        })}`,
      ),
  });
}

export function useProperty(id: string | undefined) {
  return useQuery<Property>({
    queryKey: ["property", id],
    queryFn: () => request<Property>(`/api/properties/${id}`),
    enabled: Boolean(id),
  });
}

export function useVehicles(filter: VehicleFilter = {}) {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", filter],
    queryFn: () =>
      request<Vehicle[]>(
        `/api/vehicles${buildQuery({
          vehicleType: filter.vehicleType,
          maxPrice: filter.maxPrice,
        })}`,
      ),
  });
}

export function useVehicle(id: string | undefined) {
  return useQuery<Vehicle>({
    queryKey: ["vehicle", id],
    queryFn: () => request<Vehicle>(`/api/vehicles/${id}`),
    enabled: Boolean(id),
  });
}

export function useTrainings() {
  return useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: () => request<Training[]>(`/api/trainings`),
  });
}

export function useTraining(id: string | undefined) {
  return useQuery<Training>({
    queryKey: ["training", id],
    queryFn: () => request<Training>(`/api/trainings/${id}`),
    enabled: Boolean(id),
  });
}

export function useBlogPosts(
  status: PostStatus | "all" = "published",
  page = 1,
  pageSize = 100,
) {
  return useQuery<BlogPage>({
    queryKey: ["blog", status, page, pageSize],
    queryFn: () =>
      request<BlogPage>(
        `/api/blog${buildQuery({
          status: status === "all" ? undefined : status,
          page,
          pageSize,
        })}`,
      ),
  });
}

export function useBlogPostBySlug(slug: string | undefined) {
  return useQuery<BlogPost>({
    queryKey: ["blog", "slug", slug],
    queryFn: () => request<BlogPost>(`/api/blog/by-slug/${slug}`),
    enabled: Boolean(slug),
    retry: 1,
  });
}

export function useCompanySettings() {
  return useQuery<CompanySettings>({
    queryKey: ["settings"],
    queryFn: () => request<CompanySettings>(`/api/settings`),
    staleTime: 5 * 60_000,
  });
}

// ── Admin queries ──────────────────────────────────────────────

export function useAdminProperties() {
  return useQuery<Property[]>({
    queryKey: ["admin", "properties"],
    queryFn: () => request<Property[]>(`/api/properties/admin/list`, { auth: true }),
  });
}

export function useAdminVehicles() {
  return useQuery<Vehicle[]>({
    queryKey: ["admin", "vehicles"],
    queryFn: () => request<Vehicle[]>(`/api/vehicles/admin/list`, { auth: true }),
  });
}

export function useAdminTrainings() {
  return useQuery<Training[]>({
    queryKey: ["admin", "trainings"],
    queryFn: () => request<Training[]>(`/api/trainings/admin/list`, { auth: true }),
  });
}

export function useAdminBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ["admin", "blog"],
    queryFn: () => request<BlogPost[]>(`/api/blog/admin/list`, { auth: true }),
  });
}

export function useAdminEnrollments(trainingId: string | undefined) {
  return useQuery<TrainingEnrollment[]>({
    queryKey: ["admin", "enrollments", trainingId],
    queryFn: () =>
      request<TrainingEnrollment[]>(
        `/api/enrollments/admin/by-training/${trainingId}`,
        { auth: true },
      ),
    enabled: Boolean(trainingId),
  });
}

export function useAdminMessages() {
  return useQuery<Message[]>({
    queryKey: ["admin", "messages"],
    queryFn: () => request<Message[]>(`/api/messages/admin/list`, { auth: true }),
  });
}

export function useAdminQuotes() {
  return useQuery<Quote[]>({
    queryKey: ["admin", "quotes"],
    queryFn: () => request<Quote[]>(`/api/quotes/admin/list`, { auth: true }),
  });
}

export function useAdminBookings() {
  return useQuery<Booking[]>({
    queryKey: ["admin", "bookings"],
    queryFn: () => request<Booking[]>(`/api/bookings/admin/list`, { auth: true }),
  });
}

export function useAdminNewsletterSubscribers() {
  return useQuery<NewsletterSubscriber[]>({
    queryKey: ["admin", "newsletter"],
    queryFn: () =>
      request<NewsletterSubscriber[]>(`/api/newsletter/admin/list`, { auth: true }),
  });
}

export function useAdminNewsletterCount() {
  return useQuery<{ count: number }>({
    queryKey: ["admin", "newsletter", "count"],
    queryFn: () =>
      request<{ count: number }>(`/api/newsletter/admin/count`, { auth: true }),
  });
}

// ── Public mutations (no auth) ─────────────────────────────────

export function useCreateMessage() {
  return useMutation<Message, Error, {
    customerName: string;
    email: string;
    phone: string;
    message: string;
  }>({
    mutationFn: (data) =>
      request<Message>(`/api/messages`, { method: "POST", body: data }),
  });
}

export function useCreateQuote() {
  return useMutation<Quote, Error, QuoteInput>({
    mutationFn: (data) =>
      request<Quote>(`/api/quotes`, { method: "POST", body: data }),
  });
}

export function useCreateBooking() {
  return useMutation<Booking, Error, BookingInput>({
    mutationFn: (data) =>
      request<Booking>(`/api/bookings`, { method: "POST", body: data }),
  });
}

export function useCreateEnrollment() {
  return useMutation<TrainingEnrollment, Error, {
    trainingId: string;
    name: string;
    email: string;
    phone: string;
  }>({
    mutationFn: (data) =>
      request<TrainingEnrollment>(`/api/enrollments`, {
        method: "POST",
        body: data,
      }),
  });
}

export function useSubscribeNewsletter() {
  return useMutation<NewsletterSubscriber, Error, { email: string }>({
    mutationFn: (data) =>
      request<NewsletterSubscriber>(`/api/newsletter/subscribe`, {
        method: "POST",
        body: data,
      }),
  });
}

// ── Admin mutations (require auth) ─────────────────────────────

function adminMutation<TInput, TResult>(
  path: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
  invalidate: string[][] = [],
) {
  return () => {
    const qc = useQueryClient();
    return useMutation<TResult, Error, TInput>({
      mutationFn: (data) =>
        request<TResult>(path, { method, body: data as unknown as object, auth: true }),
      onSuccess: () => {
        for (const key of invalidate) qc.invalidateQueries({ queryKey: key });
      },
    });
  };
}

export function useCreateProperty() {
  const qc = useQueryClient();
  return useMutation<Property, Error, PropertyInput>({
    mutationFn: (data) =>
      request<Property>(`/api/properties/admin`, {
        method: "POST",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["admin", "properties"] });
    },
  });
}

export function useUpdatePropertyById() {
  const qc = useQueryClient();
  return useMutation<Property, Error, { id: string } & Partial<PropertyInput>>({
    mutationFn: ({ id, ...data }) =>
      request<Property>(`/api/properties/admin/${id}`, {
        method: "PUT",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["admin", "properties"] });
    },
  });
}

export function useDeleteProperty() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      request<void>(`/api/properties/admin/${id}`, { method: "DELETE", auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["admin", "properties"] });
    },
  });
}

export function useUpdateVehicleById() {
  const qc = useQueryClient();
  return useMutation<Vehicle, Error, { id: string } & Partial<VehicleInput>>({
    mutationFn: ({ id, ...data }) =>
      request<Vehicle>(`/api/vehicles/admin/${id}`, {
        method: "PUT",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      qc.invalidateQueries({ queryKey: ["admin", "vehicles"] });
    },
  });
}

export function useCreateVehicle() {
  const qc = useQueryClient();
  return useMutation<Vehicle, Error, VehicleInput>({
    mutationFn: (data) =>
      request<Vehicle>(`/api/vehicles/admin`, {
        method: "POST",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      qc.invalidateQueries({ queryKey: ["admin", "vehicles"] });
    },
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      request<void>(`/api/vehicles/admin/${id}`, { method: "DELETE", auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      qc.invalidateQueries({ queryKey: ["admin", "vehicles"] });
    },
  });
}

export function useCreateTraining() {
  const qc = useQueryClient();
  return useMutation<Training, Error, TrainingInput>({
    mutationFn: (data) =>
      request<Training>(`/api/trainings/admin`, { method: "POST", body: data, auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trainings"] });
      qc.invalidateQueries({ queryKey: ["admin", "trainings"] });
    },
  });
}

export function useUpdateTraining() {
  const qc = useQueryClient();
  return useMutation<Training, Error, { id: string } & Partial<TrainingInput>>({
    mutationFn: ({ id, ...data }) =>
      request<Training>(`/api/trainings/admin/${id}`, {
        method: "PUT",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trainings"] });
      qc.invalidateQueries({ queryKey: ["admin", "trainings"] });
    },
  });
}

export function useDeleteTraining() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      request<void>(`/api/trainings/admin/${id}`, { method: "DELETE", auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trainings"] });
      qc.invalidateQueries({ queryKey: ["admin", "trainings"] });
    },
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation<BlogPost, Error, BlogPostInput>({
    mutationFn: (data) =>
      request<BlogPost>(`/api/blog/admin`, { method: "POST", body: data, auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog"] });
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation<BlogPost, Error, { id: string } & Partial<BlogPostInput>>({
    mutationFn: ({ id, ...data }) =>
      request<BlogPost>(`/api/blog/admin/${id}`, {
        method: "PUT",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog"] });
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      request<void>(`/api/blog/admin/${id}`, { method: "DELETE", auth: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog"] });
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useUpdateMessageStatus() {
  const qc = useQueryClient();
  return useMutation<Message, Error, { id: string; status: MessageStatus }>({
    mutationFn: ({ id, status }) =>
      request<Message>(`/api/messages/admin/${id}/status`, {
        method: "PUT",
        body: { status },
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "messages"] });
    },
  });
}

export function useUpdateQuoteStatus() {
  const qc = useQueryClient();
  return useMutation<Quote, Error, { id: string; status: QuoteStatus }>({
    mutationFn: ({ id, status }) =>
      request<Quote>(`/api/quotes/admin/${id}/status`, {
        method: "PUT",
        body: { status },
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "quotes"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation<Booking, Error, { id: string; status: BookingStatus }>({
    mutationFn: ({ id, status }) =>
      request<Booking>(`/api/bookings/admin/${id}/status`, {
        method: "PUT",
        body: { status },
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "bookings"] });
    },
  });
}

export function useUpdateCompanySettings() {
  const qc = useQueryClient();
  return useMutation<CompanySettings, Error, CompanySettingsInput>({
    mutationFn: (data) =>
      request<CompanySettings>(`/api/settings`, {
        method: "PUT",
        body: data,
        auth: true,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

// ── Upload helper (admin) ──────────────────────────────────────

export function useUploadImage() {
  return useMutation<{ url: string; publicId?: string }, Error, File>({
    mutationFn: async (file) => {
      const form = new FormData();
      form.append("file", file);
      return request<{ url: string; publicId?: string }>(`/api/upload`, {
        method: "POST",
        body: form,
        auth: true,
      });
    },
  });
}

// ── Re-exports kept for legacy callers ─────────────────────────

export type {
  BlogPage,
  BlogPost,
  BlogPostInput,
  Booking,
  BookingInput,
  BookingStatus,
  CompanySettings,
  CompanySettingsInput,
  Message,
  MessageStatus,
  NewsletterSubscriber,
  PostStatus,
  Property,
  PropertyFilter,
  PropertyInput,
  PropertyType,
  Quote,
  QuoteInput,
  QuoteStatus,
  Training,
  TrainingEnrollment,
  TrainingInput,
  Vehicle,
  VehicleFilter,
  VehicleInput,
  VehicleType,
};

// ── Dashboard stats ────────────────────────────────────────────

export interface DashboardStats {
  totalProperties: number;
  totalVehicles: number;
  totalTrainings: number;
  totalBlogPosts: number;
  totalMessages: number;
  unreadMessages: number;
  totalBookings: number;
  pendingBookings: number;
  totalQuotes: number;
  pendingQuotes: number;
  totalSubscribers: number;
}

export function useAdminDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["admin", "stats"],
    queryFn: () => request<DashboardStats>(`/api/manage/stats`, { auth: true }),
    staleTime: 30_000,
  });
}

// ── Legacy aliases (admin + service pages still use the old naming) ────
// These wrappers exist so existing call sites (`useAdminCreateProperty()`)
// keep working without forcing every page to rename the hook.

export function useAdminCreateProperty() {
  return useCreateProperty();
}
export function useAdminUpdateProperty() {
  return useUpdatePropertyById();
}
export function useAdminDeleteProperty() {
  return useDeleteProperty();
}
export function useAdminCreateVehicle() {
  return useCreateVehicle();
}
export function useAdminUpdateVehicle() {
  return useUpdateVehicleById();
}
export function useAdminDeleteVehicle() {
  return useDeleteVehicle();
}
export function useAdminCreateTraining() {
  return useCreateTraining();
}
export function useAdminUpdateTraining() {
  return useUpdateTraining();
}
export function useAdminDeleteTraining() {
  return useDeleteTraining();
}
export function useAdminCreateBlogPost() {
  return useCreateBlogPost();
}
export function useAdminUpdateBlogPost() {
  return useUpdateBlogPost();
}
export function useAdminDeleteBlogPost() {
  return useDeleteBlogPost();
}
export function useAdminUpdateMessageStatus() {
  return useUpdateMessageStatus();
}
export function useAdminUpdateCompanySettings() {
  return useUpdateCompanySettings();
}
export function useAdminUpdateQuoteStatus() {
  return useUpdateQuoteStatus();
}
export function useAdminUpdateBookingStatus() {
  return useUpdateBookingStatus();
}

// Public mutation aliases matching the original useBackend names
export function useSubmitMessage() {
  return useCreateMessage();
}
export function useSubmitQuote() {
  return useCreateQuote();
}
export function useSubmitBooking() {
  return useCreateBooking();
}
export function useEnrollInTraining() {
  return useCreateEnrollment();
}
