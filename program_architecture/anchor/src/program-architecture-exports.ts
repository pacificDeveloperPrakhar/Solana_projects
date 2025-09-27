// Here we export some useful types and functions for interacting with the Anchor program.
import ProgramArchitectureIDL from '../target/idl/program-architecture.json'

// Re-export the generated IDL and type
export { ProgramArchitectureIDL }

export * from './client/js'
