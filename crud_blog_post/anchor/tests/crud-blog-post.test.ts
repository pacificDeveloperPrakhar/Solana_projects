import {ProgramTestContext,startAnchor} from "solana-bankrun";
import {BankrunProvider} from "anchor-bankrun";
import {PublicKey} from "@solana/web3.js";
import {BN,Program} from "@coral-xyz/anchor"
import IDL from "/home/prakhar/Desktop/prakhar/Solana_bootcamp/crud_blog_post/anchor/target/idl/crud_blog_post.json"
import {CrudBlogPost,} from "/home/prakhar/Desktop/prakhar/Solana_bootcamp/crud_blog_post/anchor/target/types/crud_blog_post.ts"
import {assert,expect}  from "chai";
describe("checking the crud_blog_post",async function()
{
  let program_id:PublicKey;
    let context:ProgramTestContext;
    let provider:BankrunProvider;
    let program:Program<CrudBlogPost>;
    let userAccount:any;
    let blogAccount:any;

    beforeAll(async function(){

      program_id=new PublicKey(IDL.address);
      context=await startAnchor("",[{name:"crud_blog_post",programId:program_id}],[]);

      provider=new BankrunProvider(context);

      program=new Program<CrudBlogPost>(IDL as CrudBlogPost,provider)
    })

    it("creating user account",async function()
  {
    const name:string="Jonathan";
    const [user_pda]=PublicKey.findProgramAddressSync([Buffer.from("blog account"),Buffer.from(name)],program_id)

    await program.methods.createUser(name).rpc();

    const data=await program.account.userAccount.fetch(user_pda);

    assert.equal(data.name,name);
    assert.equal(data.blogCount,0);
    userAccount=user_pda
    console.log(typeof(user_pda))

  })

  // now add the post
it("creating our first blog post",async function()
{
  // {
  //   "name": "sunset_lake.jpg",
  //   "title": "Golden Sunset Over the Lake",
  //   "description": "A calm lake reflecting the warm hues of a golden sunset with silhouettes of trees in the background."
       //"image":"http://23"
  // }
const title="Nice ";
const image='http';
const id=new BN(2);
const description='a'.repeat(300);

const [blog_pda]=PublicKey.findProgramAddressSync([userAccount.toBuffer(),id.toArrayLike(Buffer, "le", 8) ],program_id)
blogAccount=blog_pda;
await program.methods.createBlog(id,title, description, image).accounts({
  userAccount
}).rpc();

})


// now updating the post 
it("update the post",async function()
{
  const title="Nice ";
  const image='http';
  const id=new BN(2);
  const description="hello how are you";

  await program.methods.updateBlog(id,title, description, image).accounts({
    userAccount,
    blog:blogAccount
  }).rpc();
  

  const blog=await program.account.blog.fetch(blogAccount)
  assert.equal(blog.description,description)
})

it("deleting the blog and checking if it the lamorts are being returned",async function()
{
  try{

    const id=new BN(2);
    const blog=await program.methods.deleteBlog(id).accounts({blog:blogAccount,userAccount}).rpc()
    
    
    const acc=await program.account.blog.fetch(blogAccount);
    expect.fail('The transaction should have thrown an error');
  }
  catch(err)
  {
    expect(err.message).to.include('Could not find'); 
  }

})
})