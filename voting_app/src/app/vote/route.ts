import { ActionGetResponse, ACTIONS_CORS_HEADERS,LinkedAction } from "@solana/actions";
import {clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Keypair,Transaction, TransactionInstruction} from "@solana/web3.js"
import { NextResponse } from "next/server";
import {Program} from "@coral-xyz/anchor"
import fs from "fs";

import IDL from "../../../anchor/target/idl/voting_app.json";
import {VotingApp} from "../../../anchor/target/types/voting_app"
export const GET=async function (req:Request) {
    
    const actions:LinkedAction[]=[
        {   type:"transaction",
            href:"http://localhost:3000/vote?candidate=john",
            label: 'Vote John',
        },
        {   type:"transaction",
            href:"http://localhost:3000/vote?candidate=jacobs",
            label:"vote Jacobs"
        }
    ]
    const response:ActionGetResponse={
        title:"vote for the person",
        label:"voting",
        icon:"http://localhost:3000/voting_campaign.jpg",
        description:"who do u think is the best candidate john or jacobs",
        links:{
            actions
        } 
    }
    return NextResponse.json(response,
{
    status:200,
    headers:ACTIONS_CORS_HEADERS
})
}


export const POST=async function (req:Request) {
    const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
    const transaction=new Transaction();
    
    // now verify the input from the client or user
    const url = new URL(req.url);
    const vote = url.searchParams.get('candidate') as string;

    if (vote !== 'John' && vote !== 'Jacobs') {
    return Response.json({error: 'You voted for the wrong candidate'}, {status: 400, headers: ACTIONS_CORS_HEADERS});
    }

    const program:Program<VotingApp>=new Program<VotingApp>(IDL as VotingApp,{connection});


    const [jacobs]=PublicKey.findProgramAddressSync([new Uint8Array([1]),Buffer.from("Jacobs")],new PublicKey(IDL.address))
    const [john]=PublicKey.findProgramAddressSync([new Uint8Array([1]),Buffer.from("John")],new PublicKey(IDL.address))

    const poll_id=new Uint8Array([1]);
    const poll_data=Buffer.from("who is the best person");
    // creating the pda
    const [poll_pda]=PublicKey.findProgramAddressSync([poll_data,poll_id],new PublicKey(IDL.address));
    let instruction:TransactionInstruction;
 
    if(vote=="Jacobs")
    instruction=await program.methods.vote().accounts({
     poll:poll_pda,
     candidate:jacobs
    }).instruction()
    else if(vote=="John")
    {
        instruction=await program.methods.vote().accounts({
            poll:poll_pda,
            candidate:jacobs
           }).instruction();
    }
    const tx=new Transaction();

    tx.add(instruction)


    // extract the keypair from my keypair json file
    const keypair =Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync("/home/prakhar/Desktop/prakhar/Solana_bootcamp/voting_app/src/app/api/sender_id.json"))))

    const tx_id=await sendAndConfirmTransaction(connection,tx,[keypair])
    return NextResponse.json({id:tx_id},
        {
            status:200,
            headers:ACTIONS_CORS_HEADERS
        }
    )

}

export const OPTIONS=GET