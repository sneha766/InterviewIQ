import { useMutation, useQuery } from "@tanstack/react-query";
import * as BillingService from "../services/billing.service";

export function useBilling() {
  const usage = useQuery({
    queryKey: ["billing"],
    queryFn: BillingService.getUsage,
  });

  const checkout = useMutation({
    mutationFn: BillingService.createCheckout,

    onSuccess: (url) => {
      window.location.href = url;
    },
  });

  return {
    usage,
    checkout,
  };
}