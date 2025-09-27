# Voting App

### Anchor
* so anchor uses something called avm anchor version manager
* to update or switch to different version of anchor
* anchor uses rust pre built macro ,many of it s macro are built on the top of it

*we are targetting the ebpf so for that we tell the llvm to convert our code into the epbf code
see this for how the epbf works and why solana uses it 
[here is the epbf md from my previous work,i kept notes of ](https://github.com/pacificDeveloperPrakhar/Blockchain_fundamentals/blob/main/ePBF/epbf.md)

***To see how u can target a custom deploy target in rust and i have done that already where i did target the x86_64 architecture cisc ,basically executed the freestanding binary***
[creating os using rust](https://github.com/pacificDeveloperPrakhar/OS_using_rust/blob/main/os_using_rust.md#3-compiling-for-a-different-environment)


# create-solana-dapp


# NOTES WHILE CREATING THE PROJECT
#Voting App

* so the voting app uses pnpm 

### Note 

* i have used the devnet for action and blinks 
* i have used the solana-bankrun for the im meory cluster it was used during the testing of the smart contract

## ERROR (Which i had a hard time fixing)

```
[
  'Program CHCCMPxkFw4RpQHAaHWwcudkfxcK6LCcUcAj2gZwUi7f invoke [1]',
  'Program log: AnchorError occurred. Error Code: DeclaredProgramIdMismatch. Error Number: 4100. Error Message: The declared program id does not match the actual program id.',
  'Program CHCCMPxkFw4RpQHAaHWwcudkfxcK6LCcUcAj2gZwUi7f consumed 2461 of 200000 compute units',
  'Program CHCCMPxkFw4RpQHAaHWwcudkfxcK6LCcUcAj2gZwUi7f failed: custom program error: 0x1004'
]
```

* so basically even after ensuring that prgram key matched with all the defined key in the other places like
idl and target/types

* still i was encountering the error 

* it was due to the fact that the anchor was assuming that i am using the validator and it was looking for the (program id) on the local cluster and in my defined anchor.toml it was prevoulsy
like 
program.localnet



