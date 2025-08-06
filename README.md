# Marktplaats Scraper Bot

## Description

This bot scrapes new listings from [Marktplaats.nl](https://www.marktplaats.nl) and posts them in a designated discord channel. You set the search text via command on discord and it'll post new listings relating to that.

![sample](https://github.com/bilal-the-dev/Marktplaats-Listing-Scraper-Discord-Bot/blob/main/click.PNG)

It uses the api that their client uses.

## Features:

- Scrapes new listings from **Marktplaats.nl**.
- Customizable search bar to filter listings.
- Scalable and easy to configure.
- Real-time notifications to designated channels.
- Easy-to-manage `.env` configuration for channel IDs, and other settings.

## Prerequisites

### Node.js:

Ensure that **Node.js** is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Dependencies:

```bash
npm install
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bilal-the-dev/Marktplaats-Listing-Scraper-Discord-Bot bot
cd bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory of the project and add the following:

```
TOKEN=XXX.XXXXXXXXXXXXXXXXXXXX
LISTING_CHANNEL_ID='111'
LOGS_CHANNEL_ID='111'

MARKTPLAATS_BASE_URL='https://www.marktplaats.nl'
NODE_ENV='production'
USER_AGENT='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
```

- **TOKEN**: Your bot token.
- **LISTING_CHANNEL_ID**: Discord channel ID where listings will be posted.
- **LOGS_CHANNEL_ID**: Discord channel ID where logs are sent.
- **MARKTPLAATS_BASE_URL**: Base URL for Marktplaats (default is already set).
- **NODE_ENV**: Set to `'production'` for deployment.
- **USER_AGENT**: Set the User-Agent string to avoid detection.

### 4. Configure Search Criteria via Discord Commands

The bot provides built-in Discord commands to manage the text it searches for on Marktplaats:

#### 🛠 `/edit_search_bar`

Update the text the bot uses to search for listings.

Example:

```
/edit_search_bar text:Volkswagen Polo
```

#### 🔍 `/view_search_bar`

View the current search criteria the bot is using.

Example:

```
/view_search_bar
```

#### 🔍 `/stop`

Bot will stop scraping. Run edit command to restart

Example:

```
/stop
```

---

### 5. Run the Bot

```bash
npm start
```

This will start the bot, which will then begin scraping and posting listings to the designated **LISTING_CHANNEL_ID** in your Discord server.

## Bot Operations

### 1. Scraping Listings

The bot scrapes listings from Marktplaats based on the search criteria defined in the search bar. It will run periodically and post any new listings found in the **LISTING_CHANNEL_ID**.

### 2. Logging

Any important events, errors, or actions will be logged to the **LOGS_CHANNEL_ID** for easy tracking.

### 3. Scalability

This bot is built to be scalable. If you want to add more functionality, you can adjust the search bar, modify how listings are posted, or configure more Discord channels for different types of notifications.

## Notes

- If you encounter issues, check the logs in the **LOGS_CHANNEL_ID** for troubleshooting.
- You can adjust the bot's behavior by editing the search criteria and observing how the bot posts updates.
