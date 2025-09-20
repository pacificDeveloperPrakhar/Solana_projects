import { VotingAppAccount } from '@project/anchor'
import { Button } from '@/components/ui/button'

import { useVotingAppDecrementMutation } from '../data-access/use-voting_app-decrement-mutation'

export function VotingAppUiButtonDecrement({ voting_app }: { voting_app: VotingAppAccount }) {
  const decrementMutation = useVotingAppDecrementMutation({ voting_app })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
