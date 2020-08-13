# KeepNodeWatcher

This bot allows you to both query stats on your ECDSA node and set up custom alerts on collateral ratios of your signing group. 
On the stats querying side, you can query the following commands 

!watcher summary youraddress : various stats about your signing group \
!watcher ethbonded youraddress : Get the balance of ethbonded by your group \
!watcher collateralratio youraddress : collateral ratio of your group \
!watcher coveredbtc youraddress : lotsize covered by your group 

![Capture d’écran 2020-08-12 à 23 14 21](https://user-images.githubusercontent.com/64177189/90090248-88e29080-dcf1-11ea-8c17-4a5f967c6043.png)

On the node monitoring side, you can call with any collateral ratio and the bot, running 24/24 on a VPS, will send you a DM if your collateral ratio ever goes down below the alert you set.

![Capture d’écran 2020-08-12 à 23 15 10](https://user-images.githubusercontent.com/64177189/90090276-9bf56080-dcf1-11ea-812b-e5c151f0fe4e.png)
