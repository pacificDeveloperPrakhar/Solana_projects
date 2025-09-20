import { VotingAppAccount } from '@project/anchor'
import { Button } from '@/components/ui/button'

import { useVotingAppCloseMutation } from '@/features/voting_app/data-access/use-voting_app-close-mutation'

export function VotingAppUiButtonClose({ voting_app }: { voting_app: VotingAppAccount }) {
  const closeMutation = useVotingAppCloseMutation({ voting_app })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
