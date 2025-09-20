import { useSolana } from '@/components/solana/use-solana'
import { useMemo } from 'react'
import { getVotingAppProgramId } from '@project/anchor'

export function useVotingAppProgramId() {
  const { cluster } = useSolana()
  return useMemo(() => getVotingAppProgramId(cluster.id), [cluster])
}
