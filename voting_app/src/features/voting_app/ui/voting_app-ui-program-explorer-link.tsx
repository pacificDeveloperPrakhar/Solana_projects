import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

import { useVotingAppProgramId } from '@/features/voting_app/data-access/use-voting_app-program-id'

export function VotingAppUiProgramExplorerLink() {
  const programId = useVotingAppProgramId()

  return <AppExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
}
