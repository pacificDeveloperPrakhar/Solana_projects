import { PROGRAM_ARCHITECTURE_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function ProgramArchitectureUiProgramExplorerLink() {
  return <AppExplorerLink address={PROGRAM_ARCHITECTURE_PROGRAM_ADDRESS} label={ellipsify(PROGRAM_ARCHITECTURE_PROGRAM_ADDRESS)} />
}
