# Commands

```sh
# 1 day 100stake lock-tokens command
oppyd tx lockup lock-tokens 200stake --duration="86400s" --from=validator --chain-id=testing --keyring-backend=test --yes

# 5s 100stake lock-tokens command
oppyd tx lockup lock-tokens 100stake --duration="5s" --from=validator --chain-id=testing --keyring-backend=test --yes

# begin unlock tokens, NOTE: add more gas when unlocking more than two locks in a same command
oppyd tx lockup begin-unlock-tokens --from=validator --gas=500000 --chain-id=testing --keyring-backend=test --yes

# unlock tokens, NOTE: add more gas when unlocking more than two locks in a same command
oppyd tx lockup unlock-tokens --from=validator --gas=500000 --chain-id=testing --keyring-backend=test --yes

# unlock specific period lock
oppyd tx lockup unlock-by-id 1 --from=validator --chain-id=testing --keyring-backend=test --yes

# account balance
oppyd query bank balances $(oppyd keys show -a validator --keyring-backend=test)

# query module balance
oppyd query lockup module-balance

# query locked amount
oppyd query lockup module-locked-amount

# query lock by id
oppyd query lockup lock-by-id 1

# query account unlockable coins
oppyd query lockup account-unlockable-coins $(oppyd keys show -a validator --keyring-backend=test)

# query account locks by denom past time
oppyd query lockup account-locked-pasttime-denom $(oppyd keys show -a validator --keyring-backend=test) 1611879610 stake

# query account locks past time
oppyd query lockup account-locked-pasttime $(oppyd keys show -a validator --keyring-backend=test) 1611879610

# query account locks by denom with longer duration
oppyd query lockup account-locked-longer-duration-denom $(oppyd keys show -a validator --keyring-backend=test) 5.1s stake

# query account locks with longer duration
oppyd query lockup account-locked-longer-duration $(oppyd keys show -a validator --keyring-backend=test) 5.1s

# query account locked coins
oppyd query lockup account-locked-coins $(oppyd keys show -a validator --keyring-backend=test)

# query account locks before time
oppyd query lockup account-locked-beforetime $(oppyd keys show -a validator --keyring-backend=test) 1611879610
```
