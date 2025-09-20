import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { VotingAppUiButtonInitialize } from './ui/voting_app-ui-button-initialize'
import { VotingAppUiList } from './ui/voting_app-ui-list'
import { VotingAppUiProgramExplorerLink } from './ui/voting_app-ui-program-explorer-link'
import { VotingAppUiProgramGuard } from './ui/voting_app-ui-program-guard'

export default function VotingAppFeature() {
  const { account } = useSolana()

  return (
    <VotingAppUiProgramGuard>
      <AppHero
        title="VotingApp"
        subtitle={
          account
            ? "Initialize a new voting_app onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <VotingAppUiProgramExplorerLink />
        </p>
        {account ? (
          <VotingAppUiButtonInitialize />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <VotingAppUiList /> : null}
    </VotingAppUiProgramGuard>
  )
}
