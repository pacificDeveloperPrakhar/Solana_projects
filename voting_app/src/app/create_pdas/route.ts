import { ActionGetResponse, ACTIONS_CORS_HEADERS,LinkedAction } from "@solana/actions";
import {clusterApiUrl, Connection, PublicKey,Keypair, Transaction, sendAndConfirmTransaction, SystemProgram} from "@solana/web3.js"
import { NextResponse } from "next/server";
import {Program,BN} from "@coral-xyz/anchor"
import fs from "fs";

import IDL from "../../../anchor/target/idl/voting_app.json";
import {VotingApp} from "../../../anchor/target/types/voting_app"

export const POST=async function(req:Request)
{
    const connection=new Connection(clusterApiUrl("devnet"),"confirmed");

    const program:Program<VotingApp>=new Program<VotingApp>(IDL as VotingApp,{connection});


// now get the key pairs
const keypair =Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync("/home/prakhar/Desktop/prakhar/Solana_bootcamp/voting_app/src/app/api/sender_id.json"))))
    const pollId = 1;
const pollData = "who is the best person";

// For pollStart and pollEnd, use BN.
// For example, you can use the current time for a simple test.
const now = Date.now() / 1000; // Get current time in seconds
const pollStart = new BN(now);
const pollEnd = new BN(now + 3600); 

const create_poll_instruction=await program.methods.createPoll(
    pollId,
    pollData,
    pollStart,
    pollEnd
)
.accounts
(
  {
    user:keypair.publicKey,
  }
).
instruction()


const poll_id=new Uint8Array([1]);
const poll_data=Buffer.from("who is the best person");
// creating the pda
const [pda,bump]=PublicKey.findProgramAddressSync([poll_data,poll_id],program.programId);



//=================================================================================================================
// now create candidates for the poll and add them
// now call the instruction handler createCandidate to create the candidate
  const create_candidate_instruction=await program.methods.createCandidate(1,"John ").accounts({pollAccount:pda,user:keypair.publicKey}).instruction();
  const create_another_candidate_instruction=await program.methods.createCandidate(1,"Jacobs").accounts({pollAccount:pda,user:keypair.publicKey}).instruction();
//   get the blockhash response
  console.log(create_poll_instruction)
  const transaction=new Transaction();

  transaction.add(create_poll_instruction)


    const data_poll=await sendAndConfirmTransaction(connection,transaction,[keypair])



  const transaction2=new Transaction();

  transaction2.add(create_candidate_instruction);
  transaction2.add(create_another_candidate_instruction);

  const data_candidate=await sendAndConfirmTransaction(connection,transaction2,[keypair])

  return NextResponse.json({
    candidate:data_candidate,
    poll:data_poll
  },{
    status:200
  })
}