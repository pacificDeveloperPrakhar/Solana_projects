#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("CHCCMPxkFw4RpQHAaHWwcudkfxcK6LCcUcAj2gZwUi7f");

#[program]
pub mod voting_app {
    use super::*;
    pub fn create_poll(ctx: Context<InitializePoll>,poll_id:u8,poll_data:String,poll_start:u128,poll_end:u128)->Result<()>
    {
        let poll=& mut ctx.accounts.poll;
        poll.poll_id=poll_id;
        poll.data=poll_data;
        poll.bump=ctx.bumps.poll;
        poll.start_poll=poll_start;
        poll.end_poll=poll_end;
        return Ok(())
    }

    // now create the instruction handler to crete the candidate
    pub fn create_candidate(ctx:Context<InitializeCandidate>,poll_id:u8,candidate_name:String)->Result<()>
    {
        let candidate=& mut ctx.accounts.candidate;
        candidate.candidate_name=candidate_name;
        candidate.poll_id=poll_id;
        return Ok(());
    }

    pub fn vote(ctx:Context<InitializeVote>)->Result<()>
    {
     
        let candidate=& mut ctx.accounts.candidate;
        let poll=&  ctx.accounts.poll;
        // get the poll and the candidate that we are voting for
        candidate.vote_count=candidate.vote_count+1;
        return Ok(());

    }
}


// now create the struct for the Poll
#[account]
#[derive(InitSpace)]
pub struct Poll{
    pub poll_id:u8,
    #[max_len(64)]
    pub data:String,
    pub start_poll:u128,
    pub end_poll:u128,
    pub bump: u8,
}

// now create the initialization for the poll creation
#[derive(Accounts)]
#[instruction(poll_id: u8, poll_data: String)]
pub struct InitializePoll<'info>
{
 #[account( mut)]
 pub user:Signer<'info,>,
#[account(
    init_if_needed,
    payer=user,
    space=8+Poll::INIT_SPACE,
    seeds=[
       poll_data.as_bytes(),
       poll_id.to_le_bytes().as_ref()
    ],
    bump)]
pub poll:Account<'info,Poll>,

pub system_program:Program<'info,System>
}
// instruction handler struct to define what accounts awe expecting when the  user tries to call the create cnadidate handler
#[derive(Accounts)]
#[instruction(poll_id:u8,candidate_name:String)]
pub struct InitializeCandidate<'info>
{
  #[account(mut)]
  pub user:Signer<'info>,
  pub poll_account:Account<'info,Poll>,
  #[account(
    init_if_needed,
    payer=user,
    space=8+Candidate::INIT_SPACE,
    seeds=[poll_id.to_le_bytes().as_ref(),candidate_name.as_bytes()],
    bump
  )]
  pub candidate:Account<'info,Candidate>,
  pub system_program:Program<'info,System>
}

#[account]
#[derive(InitSpace)]
pub struct Candidate
{ #[max_len(64)]
  pub candidate_name:String,
  pub poll_id:u8,
  pub vote_count:u64

}


#[derive(Accounts)]
pub struct InitializeVote<'info>
{   #[account(mut)]
    pub candidate:Account<'info,Candidate>,
    pub poll:Account<'info,Poll>
}