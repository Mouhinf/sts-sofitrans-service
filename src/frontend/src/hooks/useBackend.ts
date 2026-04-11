import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  BlogPostInput,
  BookingInput,
  BookingStatus,
  CompanySettings,
  EnrollmentInput,
  Id,
  MessageInput,
  MessageStatus,
  PostStatus,
  PropertyFilter,
  PropertyInput,
  QuoteInput,
  QuoteStatus,
  TrainingInput,
  VehicleFilter,
  VehicleInput,
} from "../types";

function useBackendActor() {
  return useActor(createActor);
}

// === PUBLIC QUERIES ===

export function useProperties(filter: PropertyFilter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["properties", filter],
    queryFn: () => actor!.listProperties(filter),
    enabled: !!actor && !isFetching,
  });
}

export function useProperty(id: Id | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["property", id?.toString()],
    queryFn: () => actor!.getProperty(id!),
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useVehicles(filter: VehicleFilter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vehicles", filter],
    queryFn: () => actor!.listVehicles(filter),
    enabled: !!actor && !isFetching,
  });
}

export function useVehicle(id: Id | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vehicle", id?.toString()],
    queryFn: () => actor!.getVehicle(id!),
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useTrainings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["trainings"],
    queryFn: () => actor!.listTrainings(),
    enabled: !!actor && !isFetching,
  });
}

export function useTraining(id: Id | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["training", id?.toString()],
    queryFn: () => actor!.getTraining(id!),
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useBlogPosts(page = 1n, pageSize = 9n) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blogPosts", page.toString(), pageSize.toString()],
    queryFn: () => actor!.listBlogPosts(page, pageSize),
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPostBySlug(slug: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => actor!.getBlogPostBySlug(slug!),
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useCompanySettings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["companySettings"],
    queryFn: () => actor!.getCompanySettings(),
    enabled: !!actor && !isFetching,
  });
}

// === PUBLIC MUTATIONS ===

export function useSubmitMessage() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input: MessageInput) => actor!.submitMessage(input),
  });
}

export function useSubmitQuote() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input: QuoteInput) => actor!.submitQuote(input),
  });
}

export function useSubmitBooking() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input: BookingInput) => actor!.submitBooking(input),
  });
}

export function useEnrollInTraining() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (input: EnrollmentInput) => actor!.enrollInTraining(input),
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: (email: string) => actor!.subscribeNewsletter(email),
  });
}

// === ADMIN QUERIES ===

export function useAdminDashboardStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: () => actor!.adminGetDashboardStats(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminProperties() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminProperties"],
    queryFn: () => actor!.adminListProperties(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminVehicles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminVehicles"],
    queryFn: () => actor!.adminListVehicles(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminTrainings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminTrainings"],
    queryFn: () => actor!.adminListTrainings(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminBlogPosts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminBlogPosts"],
    queryFn: () => actor!.adminListBlogPosts(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminMessages() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminMessages"],
    queryFn: () => actor!.adminListMessages(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminBookings"],
    queryFn: () => actor!.adminListBookings(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminQuotes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminQuotes"],
    queryFn: () => actor!.adminListQuotes(),
    enabled: !!actor && !isFetching,
  });
}

export function useAdminSubscribers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminSubscribers"],
    queryFn: () => actor!.adminListSubscribers(),
    enabled: !!actor && !isFetching,
  });
}

// === ADMIN MUTATIONS ===

export function useAdminCreateProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: PropertyInput) => actor!.adminCreateProperty(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] }),
  });
}

export function useAdminUpdateProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: Id; input: PropertyInput }) =>
      actor!.adminUpdateProperty(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] }),
  });
}

export function useAdminDeleteProperty() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => actor!.adminDeleteProperty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProperties"] }),
  });
}

export function useAdminCreateVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: VehicleInput) => actor!.adminCreateVehicle(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] }),
  });
}

export function useAdminUpdateVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: Id; input: VehicleInput }) =>
      actor!.adminUpdateVehicle(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] }),
  });
}

export function useAdminDeleteVehicle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => actor!.adminDeleteVehicle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminVehicles"] }),
  });
}

export function useAdminCreateTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TrainingInput) => actor!.adminCreateTraining(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] }),
  });
}

export function useAdminUpdateTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: Id; input: TrainingInput }) =>
      actor!.adminUpdateTraining(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] }),
  });
}

export function useAdminDeleteTraining() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => actor!.adminDeleteTraining(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminTrainings"] }),
  });
}

export function useAdminCreateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: BlogPostInput) => actor!.adminCreateBlogPost(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] }),
  });
}

export function useAdminUpdateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: Id; input: BlogPostInput }) =>
      actor!.adminUpdateBlogPost(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] }),
  });
}

export function useAdminDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: Id) => actor!.adminDeleteBlogPost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogPosts"] }),
  });
}

export function useAdminUpdateMessageStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: Id; status: MessageStatus }) =>
      actor!.adminUpdateMessageStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminMessages"] }),
  });
}

export function useAdminUpdateBookingStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: Id; status: BookingStatus }) =>
      actor!.adminUpdateBookingStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBookings"] }),
  });
}

export function useAdminUpdateQuoteStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: Id; status: QuoteStatus }) =>
      actor!.adminUpdateQuoteStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminQuotes"] }),
  });
}

export function useAdminUpdateCompanySettings() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: CompanySettings) =>
      actor!.adminUpdateCompanySettings(settings),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["companySettings"] }),
  });
}

export function useAdminBlogPostsByStatus(status?: PostStatus) {
  const { data: posts, ...rest } = useAdminBlogPosts();
  return {
    ...rest,
    data: status ? posts?.filter((p) => p.postStatus === status) : posts,
  };
}
