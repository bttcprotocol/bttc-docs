# Technical FAQ

### 1. Are the private keys same for delivery and bttc keystore?

Yes, the private key used for generating validator keys and bttc keystore is the same.

### 2. List of Common Commands

We currently have an easy to dive-in list for you for the Linux packages. We will keep updating this list regularly for more convenience.

For Linux packages

#### A. Start delivery

`$ deliveryd start`

#### B. Start delivery rest-server

`$ deliveryd rest-server`

#### C. Build bttc

`$ make bttc`

### 3. How to use developer API?

The BitTorrent Chain Developer APIs are provided as a community service and without warranty, so please use what you need and no more. We support both GET/POST requests and there is a rate limit of 5 calls per sec/IP.

Note: Source attribution via a link back or mention that your app is "Powered by https://bttcscan.com APIs" is required except for personal/private usage.

### 4. How many validators can be active concurrently?

There are now 12 active validators. There is limited space for accepting new validators. New validators can only join the active set when a currently active validator unbonds.

A new auction process for validator replacement will be rolled out.





