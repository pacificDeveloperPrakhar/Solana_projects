import { ReactNode } from 'react'

import { useVotingAppProgram } from '@/features/voting_app/data-access/use-voting_app-program'

export function VotingAppUiProgramGuard({ children }: { children: ReactNode }) {
  const programAccountQuery = useVotingAppProgram()

  if (programAccountQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!programAccountQuery.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }

  return children
}
