import { VotingAppAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { useWalletTransactionSignAndSend } from '@/components/solana/use-wallet-transaction-sign-and-send'
import { toastTx } from '@/components/toast-tx'
import { useVotingAppAccountsInvalidate } from './use-voting_app-accounts-invalidate'

export function useVotingAppDecrementMutation({ voting_app }: { voting_app: VotingAppAccount }) {
  const invalidateAccounts = useVotingAppAccountsInvalidate()
  const signer = useWalletUiSigner()
  const signAndSend = useWalletTransactionSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ voting_app: voting_app.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
