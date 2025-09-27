/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/program_architecture.json`.
 */
export type ProgramArchitecture = {
  "address": "75118tphCsWuJCyDTfbrXs7GcJCdt3SpXGJgCYEvEWnU",
  "metadata": {
    "name": "programArchitecture",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "greet",
      "discriminator": [
        203,
        194,
        3,
        150,
        228,
        58,
        181,
        62
      ],
      "accounts": [
        {
          "name": "someBigData"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "someBigDataStruct",
      "discriminator": [
        56,
        154,
        218,
        25,
        211,
        59,
        134,
        230
      ]
    }
  ],
  "types": [
    {
      "name": "someBigDataStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bigData",
            "type": {
              "array": [
                "u8",
                50
              ]
            }
          }
        ]
      }
    }
  ]
};
