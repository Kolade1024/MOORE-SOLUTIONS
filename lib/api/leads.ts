import type { LeadApiResponse, LeadFieldErrors, LeadFormValues } from "@/lib/schemas/lead";

export class LeadSubmissionError extends Error {
  readonly status: number;
  readonly fieldErrors?: LeadFieldErrors;

  constructor(message: string, status: number, fieldErrors?: LeadFieldErrors) {
    super(message);
    this.name = "LeadSubmissionError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

/** Fetcher used by `useSubmitLead` (TanStack Query `useMutation`). */
export async function submitLead(values: LeadFormValues): Promise<void> {
  let response: Response;

  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    throw new LeadSubmissionError(
      "We couldn't reach our server. Please check your connection and try again.",
      0,
    );
  }

  const data = (await response.json().catch(() => null)) as LeadApiResponse | null;

  if (!response.ok || !data?.ok) {
    const message =
      data && !data.ok ? data.error : "Something went wrong on our side. Please try again in a moment.";
    const fieldErrors = data && !data.ok ? data.fieldErrors : undefined;
    throw new LeadSubmissionError(message, response.status, fieldErrors);
  }
}
