import { VotingAppAccount, getCloseInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { useWalletTransactionSignAndSend } from '@/components/solana/use-wallet-transaction-sign-and-send'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { toastTx } from '@/components/toast-tx'
import { useVotingAppAccountsInvalidate } from './use-voting_app-accounts-invalidate'

export function useVotingAppCloseMutation({ voting_app }: { voting_app: VotingAppAccount }) {
  const invalidateAccounts = useVotingAppAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getCloseInstruction({ payer: signer, voting_app: voting_app.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
