# IOTA Balance Finder

Using this tool you can find where your balances are after a snapshot and even send the funds to a new seed if needed.

This is adapted from https://github.com/peterwilli/IOTA-Snapshot-Recovery

The tool is completely secure, you can run it on your own computer without anything being sent to the internet (unless you want to transfer funds)

## How to use?
Ensure you have the following:
- Git which you can download from https://git-scm.com/
- NodeJS which you can download from https://nodejs.org

### Balance finding
Run the following commands in Terminal or PowerShell:
- `git clone https://github.com/rajivshah3/IOTA-Balance-Finder balance-finder`
- `cd balance-finder`
- `npm install`
- `node main.js <seed>` Make sure to remove the < and >!
- Sit back and watch as the tool will find balances that are linked to your seed.
- When you think you have all your balances, simply hit the `i`-key to end the search.

### Balance finding and sending
Run the following commands in Terminal or PowerShell:
- `git clone https://github.com/rajivshah3/IOTA-Balance-Finder balance-finder`
- `cd balance-finder`
- `npm install`
- `node main.js <old-seed> <new-seed>` Make sure to remove the < and >!
- Sit back and watch as the tool will find balances that are linked to your seed.
- When you think you have all your balances, simply hit the `i`-key to end the search and begin sending.

## Did this tool help you?
Please consider donating to help create more tools like this:
`VKOXMJJAWRVXZHNUHLRWCXMRVPRLCUUNLEZQVHWPRLJGLJPZNAFHQTQZ9YWEPTTEFUUQNVOORJAXNMAQZQMHACRLHB`

## How it works

The repository has a snapshot txt file included. The tool will then generate many different addresses based on your seed, and compares locally with the snapshot file. If there is a hit (and assuming no money has been transferred after the snapshot period) the tool will alert you.
