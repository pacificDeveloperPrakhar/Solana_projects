// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, address, getBase58Decoder, SolanaClient } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { VotingApp, VOTING_APP_DISCRIMINATOR, VOTING_APP_PROGRAM_ADDRESS, getVotingAppDecoder } from './client/js'
import VotingAppIDL from '../target/idl/voting_app.json'

export type VotingAppAccount = Account<VotingApp, string>

// Re-export the generated IDL and type
export { VotingAppIDL }

// This is a helper function to get the program ID for the VotingApp program depending on the cluster.
export function getVotingAppProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the VotingApp program on devnet and testnet.
      return address('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'solana:mainnet':
    default:
      return VOTING_APP_PROGRAM_ADDRESS
  }
}

export * from './client/js'

export function getVotingAppProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getVotingAppDecoder(),
    filter: getBase58Decoder().decode(VOTING_APP_DISCRIMINATOR),
    programAddress: VOTING_APP_PROGRAM_ADDRESS,
  })
}
