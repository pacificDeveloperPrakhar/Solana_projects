import { VotingAppUiCard } from './voting_app-ui-card'
import { useVotingAppAccountsQuery } from '@/features/voting_app/data-access/use-voting_app-accounts-query'

export function VotingAppUiList() {
  const voting_appAccountsQuery = useVotingAppAccountsQuery()

  if (voting_appAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!voting_appAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {voting_appAccountsQuery.data?.map((voting_app) => (
        <VotingAppUiCard key={voting_app.address} voting_app={voting_app} />
      ))}
    </div>
  )
}
