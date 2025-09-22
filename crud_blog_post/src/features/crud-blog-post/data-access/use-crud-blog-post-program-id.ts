import { useSolana } from '@/components/solana/use-solana'
import { useMemo } from 'react'
import { getCrudBlogPostProgramId } from '@project/anchor'

export function useCrudBlogPostProgramId() {
  const { cluster } = useSolana()

  return useMemo(() => getCrudBlogPostProgramId(cluster.id), [cluster])
}
