/**
 * Support Hooks
 * React Query hooks for support operations
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import { supportService } from "@/lib/api/services";
import { getErrorMessage } from "@/lib/utils/api-error-handler";
import { ContactSupportRequest } from "@/lib/api/types";

/**
 * Contact support mutation
 */
export function useContactSupport() {
  return useMutation({
    mutationFn: (payload: ContactSupportRequest) =>
      supportService.contactSupport(payload),
    onError: (error) => {
      console.error("Contact support failed:", getErrorMessage(error));
    },
  });
}
