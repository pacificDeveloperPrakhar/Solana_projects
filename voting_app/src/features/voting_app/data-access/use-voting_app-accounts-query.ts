import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getVotingAppProgramAccounts } from '@project/anchor'
import { useVotingAppAccountsQueryKey } from './use-voting_app-accounts-query-key'

export function useVotingAppAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useVotingAppAccountsQueryKey(),
    queryFn: async () => await getVotingAppProgramAccounts(client.rpc),
  })
}
