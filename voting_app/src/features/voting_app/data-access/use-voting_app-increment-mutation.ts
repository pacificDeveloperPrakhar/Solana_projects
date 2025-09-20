import { VotingAppAccount, getIncrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { useWalletTransactionSignAndSend } from '@/components/solana/use-wallet-transaction-sign-and-send'
import { useVotingAppAccountsInvalidate } from './use-voting_app-accounts-invalidate'

export function useVotingAppIncrementMutation({ voting_app }: { voting_app: VotingAppAccount }) {
  const invalidateAccounts = useVotingAppAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ voting_app: voting_app.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
