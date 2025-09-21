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
