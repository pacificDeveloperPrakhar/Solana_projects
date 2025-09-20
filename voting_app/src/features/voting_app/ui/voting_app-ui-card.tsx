import { VotingAppAccount } from '@project/anchor'
import { ellipsify } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { VotingAppUiButtonClose } from './voting_app-ui-button-close'
import { VotingAppUiButtonDecrement } from './voting_app-ui-button-decrement'
import { VotingAppUiButtonIncrement } from './voting_app-ui-button-increment'
import { VotingAppUiButtonSet } from './voting_app-ui-button-set'

export function VotingAppUiCard({ voting_app }: { voting_app: VotingAppAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VotingApp: {voting_app.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={voting_app.address} label={ellipsify(voting_app.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <VotingAppUiButtonIncrement voting_app={voting_app} />
          <VotingAppUiButtonSet voting_app={voting_app} />
          <VotingAppUiButtonDecrement voting_app={voting_app} />
          <VotingAppUiButtonClose voting_app={voting_app} />
        </div>
      </CardContent>
    </Card>
  )
}
