import {startAnchor} from "solana-bankrun";
import {BankrunProvider} from "anchor-bankrun"
import type {VotingApp} from "../target/types/voting_app"
import {PublicKey} from "@solana/web3.js";
import {BN,Program} from "@coral-xyz/anchor";


import IDL from "/home/prakhar/Desktop/prakhar/Solana_bootcamp/voting_app/anchor/target/idl/voting_app.json"
describe("voting",function()
{
    test("creating the poll",async ()=>{
        const program_id=new PublicKey("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");
        // create the context 
        /*
 * startAnchor() function arguments:
 *
 * programName (string): The name of the program being tested.
 *   - In this case, the empty string `""` likely signifies testing a local
 *     or temporary program, or a test configuration where the program is
 *     defined elsewhere.
 *
 * programs (array): An array of objects defining the on-chain programs to
 *   be loaded into the simulated bank environment.
 *   - `name` (string): The program's name. Must match the program's `.so`
 *     (shared object) file in the `fixtures` directory.
 *   - `programId` (PublicKey): The on-chain public key for the program. Used
 *     by the framework to identify and invoke the program during tests.
 *
 * accounts (array): An array of accounts to pre-load into the test environment.
 *   - Allows setting up specific initial conditions for tests.
 *   - In this example, the empty array `[]` means no additional accounts are
 *     pre-loaded.
 */

       const context=await startAnchor("",[{name:"voting_app",programId:program_id}],[]);
    //    this creates in memory client and server to mimic the cluster
       const provider=new BankrunProvider(context);
    // now create the program object  that basically correspond to our smart contract
    // https://www.anchor-lang.com/docs/clients/typescript
    const program=new Program<VotingApp>(IDL as VotingApp,provider)
    })

    
})