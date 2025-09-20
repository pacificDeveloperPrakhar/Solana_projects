import { VotingAppAccount } from '@project/anchor'
import { Button } from '@/components/ui/button'

import { useVotingAppSetMutation } from '@/features/voting_app/data-access/use-voting_app-set-mutation'

export function VotingAppUiButtonSet({ voting_app }: { voting_app: VotingAppAccount }) {
  const setMutation = useVotingAppSetMutation({ voting_app })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', voting_app.data.count.toString() ?? '0')
        if (!value || parseInt(value) === voting_app.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
