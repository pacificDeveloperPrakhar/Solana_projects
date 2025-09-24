use anchor_lang::prelude::*;
pub mod states;
pub use states::*; 
declare_id!("FGTh7ctrHYRTTarC1SVRcbXDQP2YoQWfdLM9NP1LZGDJ");
#[program]
pub mod crud_blog_post
{
    use super::*;

    pub fn create_user(ctx:Context<InitilaizeUserAccount>,name:String)->Result<()>
    {
        let user_account=& mut ctx.accounts.user_account;
        user_account.blog_count=0;
        user_account.name=name;

        msg!("wrritten user account to the chain user named:{}",&user_account.name);
        return Result::Ok(());
    }
    // creating the blog account
    pub fn create_blog(ctx:Context<InitilaizeBlog>,id:u64,title:String,description:String,image:String)->Result<()>
    {
        let user_account=& mut ctx.accounts.user_account;
        let blog=& mut ctx.accounts.blog;
        blog.title=title;
        blog.description=description;
        blog.id=id;
        blog.image=image;
        let clock = Clock::get()?;
        blog.create_at=clock.unix_timestamp as u64;
        blog.updated_at=clock.unix_timestamp as u64;
        // now increase the count of user blog_count by 1
        user_account.blog_count=1+user_account.blog_count;
        return Ok(())
    }

    pub fn update_blog(ctx:Context<UpdateBlog>,id:u64,title:String,description:String,image:String)->Result<()>
    {
        let blog=& mut ctx.accounts.blog;
        blog.title=title;
        blog.description=description;
        blog.image=image;
        let clock = Clock::get()?;
        blog.updated_at=clock.unix_timestamp as u64;
        return Ok(());
    }

    pub fn delete_blog(_ctx:Context<DeleteBlog>,_id:u64)->Result<()>
    {
        return Ok(())
    }
}
// all the context instructions
#[derive(Accounts)]
#[instruction(name:String)]
pub struct InitilaizeUserAccount<'info>
{   #[account(mut)]
    pub authority:Signer<'info>,
    #[account(
        init_if_needed,
        payer=authority,
        space=8+UserAccount::INIT_SPACE,
        seeds=[b"blog account",name.as_bytes()],
        bump
    )]
   pub user_account:Box<Account<'info,UserAccount>>,
   pub system_program:Program<'info,System>
}

// blog creating context 
#[derive(Accounts)]
#[instruction(id:u64,title:String,description:String,image:String)]
pub struct InitilaizeBlog<'info>
{
    #[account(mut)]
    pub authority:Signer<'info>,
    #[account(
        init_if_needed,
        payer=authority,
        seeds=[user_account.key().as_ref(),id.to_le_bytes().as_ref()],
        space=8 + 8+ (4 + title.len()) + (4 + description.len()) + (4 + image.len()) + 8 + 8,
        bump
    )]
   pub blog:Account<'info,Blog>,
   #[account(mut)]
   pub user_account:Account<'info,UserAccount>,
   pub system_program:Program<'info,System>
}

//updating the blog
// # apparently we would have to manually calculate the size of account
#[derive(Accounts)]
#[instruction(id:u64,title:String,description:String,image:String)]
pub struct UpdateBlog<'info>
{
    #[account(mut)]
    pub authority:Signer<'info,>,
    #[account(
        mut,
        seeds=[user_account.key().as_ref(),id.to_le_bytes().as_ref()],
        realloc=8 + 8+ (4 + title.len()) + (4 + description.len()) + (4 + image.len()) + 8 + 8,
        realloc::payer=authority,
        realloc::zero=true,
        bump
    )]
   pub blog:Account<'info,Blog>,
   pub user_account:Box<Account<'info,UserAccount>>,
   pub system_program:Program<'info,System>
}

// delete the account 
#[derive(Accounts)]
#[instruction(id:u64)]
pub struct DeleteBlog<'info>
{
    #[account(mut)]
    pub authority:Signer<'info>,
    #[account(
        mut,
        seeds=[user_account.key().as_ref(),id.to_le_bytes().as_ref()],
        close=authority,
        bump
    )]
    pub blog:Account<'info,Blog>,
   #[account(mut)]
   pub user_account:Box<Account<'info,UserAccount>>,
   pub system_program:Program<'info,System>
}