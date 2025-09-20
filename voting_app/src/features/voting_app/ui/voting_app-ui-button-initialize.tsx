import { Button } from '@/components/ui/button'

import { useVotingAppInitializeMutation } from '@/features/voting_app/data-access/use-voting_app-initialize-mutation'

export function VotingAppUiButtonInitialize() {
  const mutationInitialize = useVotingAppInitializeMutation()

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize VotingApp {mutationInitialize.isPending && '...'}
    </Button>
  )
}
