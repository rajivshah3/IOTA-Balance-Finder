# IOTA Balance Finder

Using this tool you can find where your balances are after a snapshot and choose the appropriate action (reclaim, generate addresses, etc).

#### Please note that this tool will not work if you did not transition.

This is adapted from https://github.com/peterwilli/IOTA-Snapshot-Recovery

The tool is completely secure, you can run it on your own computer without anything being sent to the internet

## How to use?
Ensure you have the following:
- Git which you can download from https://git-scm.com/
- NodeJS which you can download from https://nodejs.org

Run the following commands in Terminal or PowerShell:
- `git clone --recursive https://github.com/rajivshah3/IOTA-Balance-Finder balance-finder`
- `cd balance-finder`
- `npm install`
- `node main.js <seed>` Make sure to remove the < and >!
- Sit back and watch as the tool will find balances that are linked to your seed.
- When you think you have all your balances, simply hit the `i`-key.

For Searching pre-Transitioned Addresses add a second parameter "p":
- `node main.js <seed> p`

## What to do next
- If the tool says `The balance is currently in the address` to all addresses found, see the snapshot recovery instructions below.

- If the tool says `CURL_UNUSED`, `CURL_NOT_TRANSITIONED`, `KEY_REUSE`, or `KEY_REUSE_OCT` you must use the reclaim tool

## Snapshot recovery
Run these commands to transfer your balance to a new seed. Ensure that you are not in the "balance-finder" directory. If you are, run `cd ..` first.
- `git clone https://github.com/peterwilli/IOTA-Snapshot-Recovery.git snapshot-recovery`
- `cd snapshot-recovery`
- `git checkout d850c2b33b96be0f42df8c715bc05588e245753d`
- `npm install`
- `node main.js <old seed> <new seed>` make sure to remove the arrows!
- When you think you have all your balances, simply hit the `i` -key and the balance will be transferred.

## Did this tool help you?
Please consider donating to help create more tools like this:
`RAJQDPHWBXSSSCLXLCUAIALSILPNBFCDRYLKZWWKVCLWXSLPTKAAN9XM9BNDPCDVJMQHLDWVYRYSYSLZCMUTATRK9D`

## How it works

The repository has a snapshot txt file in itself, this snapshot, at the time of writing, is the latest. If there is a newer snapshot you should replace the file on this repo with the newest.

The tool will then generate many different addresses based on your seed, and compares locally with the snapshot file. If there is a hit (and assuming no money has been transferred after the snapshot period) the tool will alert you.
