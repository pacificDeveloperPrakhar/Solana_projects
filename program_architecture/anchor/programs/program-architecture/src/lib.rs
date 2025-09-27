use anchor_lang::prelude::*;

declare_id!("75118tphCsWuJCyDTfbrXs7GcJCdt3SpXGJgCYEvEWnU");

#[program]
pub mod program_architecture {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[account]
pub struct SomeBigDataStruct {
    pub big_data: [u8; 50],
}
// wrap it around the Box if u want to allocate the account to the heap
#[derive(Accounts)]
pub struct Initialize<'info> {
    pub some_big_data: Box<Account<'info, SomeBigDataStruct>>,
}