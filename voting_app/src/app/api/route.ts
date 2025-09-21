
import {ActionGetResponse, ACTIONS_CORS_HEADERS, MEMO_PROGRAM_ID} from "@solana/actions"
import {clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction,TransactionInstruction} from "@solana/web3.js"
import { NextResponse } from "next/server";
import fs from "fs";

export async function GET(req:Request) {
    const response:ActionGetResponse={
     title:"write a memo on the chain",
     description:"this is a dummy action to write on the chain",
     icon:   "http://localhost:3000/lookup_deciding.png",
     label:"writet the action"
    }
  

  console.log(ACTIONS_CORS_HEADERS)
  return NextResponse.json(response,
    {
        headers:ACTIONS_CORS_HEADERS,
        status:200,
    }
  )

    
}
// this OPTIONS just triggers when it wants to send the preflight response for the cors now for the preflight response we are using the
// same  GET but the browser will take only extract the header for the cors
export const OPTIONS=GET;
export const POST=async function(req:Request)
{
 try{
  let user:PublicKey;


    const pubkey=await req.text();
    user=new PublicKey(pubkey)
 
  const transaction=new Transaction()

  const instruction=SystemProgram.transfer(
    {
      fromPubkey:new PublicKey("DwetVxD2exkgAZJkPfFa884pwSXCXua8w9EjwPZoSTwM"),
      toPubkey:user,
      lamports:900,
    }
  )
  // now create the transaction and also lets create a memo instruction as well 
  // while solana does not allow a transaction with only memo instruction

  const memoInstruction=new TransactionInstruction({
    programId:new PublicKey(MEMO_PROGRAM_ID),
    data:Buffer.from("this is an action","utf-8"),
    // keys are empty because right now there is nothing to write into or read from
    keys:[]
  })
  // adding the instructions to th transaction
   transaction.add(instruction);
  //  adding the memo instruction to the transaction
  transaction.add(memoInstruction);
  
  const connection:Connection=new Connection(clusterApiUrl("devnet"));


  // read the key pair of the sender
  const privateKey=Uint8Array.from(JSON.parse(fs.readFileSync("/home/prakhar/Desktop/prakhar/Solana_bootcamp/voting_app/src/app/api/sender_id.json")));
// now exctracting the key pair from the secreet key
const myKeyPair=Keypair.fromSecretKey(privateKey);
  console.log(myKeyPair)
  const transactionId=await sendAndConfirmTransaction(connection,transaction,[myKeyPair])
  return NextResponse.json({
    id:transactionId
  })

}
 catch(err)
 {
  console.log(err)
  return NextResponse.json(err,{
    status:200
  })
 }
}