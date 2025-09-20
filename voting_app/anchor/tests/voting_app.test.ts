import {startAnchor} from "solana-bankrun";
import {BankrunProvider} from "anchor-bankrun"
import type {VotingApp} from "../target/types/voting_app"
import {PublicKey} from "@solana/web3.js";
import {BN,Program} from "@coral-xyz/anchor";
import {assert,expect}  from "chai";

import IDL from "/home/prakhar/Desktop/prakhar/Solana_bootcamp/voting_app/anchor/target/idl/voting_app.json"
import test from "node:test";

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
    
    // now we create the pda

    const poll_id=new Uint8Array([1]);
    const poll_data=Buffer.from("who is the best person");
    const poll_start=2345;
    const poll_end=3455
    // creating the pda
    const [pda,bump]=PublicKey.findProgramAddressSync([poll_data,poll_id],program_id);
    const pollId = 1;
const pollData = "who is the best person";

// For pollStart and pollEnd, use BN.
// For example, you can use the current time for a simple test.
const now = Date.now() / 1000; // Get current time in seconds
const pollStart = new BN(now);
const pollEnd = new BN(now + 3600); // Poll ends in one hour

await program.methods.createPoll(
    pollId,
    pollData,
    pollStart,
    pollEnd
).rpc();


const data=await program.account.poll.fetch(pda);
console.log(data)
// check all the data fields are properly filled
assert.equal(data.pollId,1)
assert.equal(data.data,"who is the best person")

expect(Number(data.startPoll)).to.lessThan(Number(data.endPoll))
})


// now we will test for creating the candidate we will create three candidates for now

test("creating candidates",async()=>{
    
})
})