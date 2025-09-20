import { VotingAppAccount } from '@project/anchor'
import { Button } from '@/components/ui/button'
import { useVotingAppIncrementMutation } from '../data-access/use-voting_app-increment-mutation'

export function VotingAppUiButtonIncrement({ voting_app }: { voting_app: VotingAppAccount }) {
  const incrementMutation = useVotingAppIncrementMutation({ voting_app })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
