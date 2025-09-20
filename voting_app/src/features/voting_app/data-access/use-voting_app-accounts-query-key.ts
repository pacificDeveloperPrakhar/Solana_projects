import { useSolana } from '@/components/solana/use-solana'

export function useVotingAppAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['voting_app', 'accounts', { cluster }]
}
