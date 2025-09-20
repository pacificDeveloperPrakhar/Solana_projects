import { useQueryClient } from '@tanstack/react-query'
import { useVotingAppAccountsQueryKey } from './use-voting_app-accounts-query-key'

export function useVotingAppAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useVotingAppAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
