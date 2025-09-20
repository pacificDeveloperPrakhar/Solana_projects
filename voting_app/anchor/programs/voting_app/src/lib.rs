#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

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

// #[derive(Accounts)]
// #[instruction(poll_id: u8, poll_data: String)]
// pub struct InitializePoll<'info> {
//     #[account(mut)]
//     pub user: Signer<'info>,
    
//     #[account(
//         init,
//         payer = user,
//         space = 8 + Poll::INIT_SPACE,
//         seeds = [
//             poll_data.as_ref(),
//             poll_id.to_le_bytes().as_ref() 
//         ],
//         bump
//     )]
//     pub poll: Account<'info, Poll>,
    
//     pub system_program: Program<'info, System>,
// }
