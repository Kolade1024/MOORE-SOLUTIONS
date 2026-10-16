"use client";

import { useMutation } from "@tanstack/react-query";
import { submitLead, type LeadSubmissionError } from "@/lib/api/leads";
import type { LeadFormValues } from "@/lib/schemas/lead";

export function useSubmitLead() {
  return useMutation<void, LeadSubmissionError, LeadFormValues>({
    mutationKey: ["leads", "submit"],
    mutationFn: submitLead,
  });
}
