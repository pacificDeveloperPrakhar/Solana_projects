use anchor_lang::prelude::*;
// blog account to store the state of the user account
#[account]
#[derive(InitSpace)]
pub struct UserAccount
{
 #[max_len(50)]
 pub name:String,
 pub blog_count:u64,
 #[max_len(200)]
 pub image:String
}
//now the blog account 
//since we are updaing it we would have to manually calculate the space hence we are not using the InitSpace
#[account]
pub struct Blog
{
 pub description:String,
 pub id:u64,
 pub image:String,
 pub title:String,
 pub create_at:u128,
 pub updated_at:u128
}
