#!/usr/bin/env node

/**
 * Cloudflare Zone ID Finder
 * 
 * This script helps you find your Cloudflare Zone ID.
 * 
 * Method 1: Manual (Recommended)
 * 1. Go to https://dash.cloudflare.com
 * 2. Log in to your account
 * 3. Select the domain you want to use for your Evolution AI app
 * 4. In the right sidebar under "API", you'll see "Zone ID"
 * 5. Copy this Zone ID and update your .env file
 * 
 * Method 2: CLI (if you have wrangler installed)
 * Run: wrangler zones list
 * 
 * Method 3: API (if your token has zone:read permissions)
 * This script can attempt to fetch it for you.
 */

const https = require('https')

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

async function findZoneId() {
  if (!API_TOKEN) {
    console.log('❌ No CLOUDFLARE_API_TOKEN found in environment')
    console.log('Please set your API token in the .env file first.')
    return
  }

  console.log('🔍 Searching for Cloudflare zones...')

  const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: '/client/v4/zones',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      try {
        const response = JSON.parse(data)
        
        if (!response.success) {
          console.log('❌ API request failed:')
          console.log(response.errors)
          
          console.log('\n📋 Manual Steps to Find Zone ID:')
          console.log('1. Go to https://dash.cloudflare.com')
          console.log('2. Select your domain')
          console.log('3. Look for "Zone ID" in the right sidebar')
          console.log('4. Update CLOUDFLARE_ZONE_ID in your .env file')
          return
        }

        if (response.result.length === 0) {
          console.log('⚠️  No zones found in your Cloudflare account')
          console.log('\n🆕 To add a domain:')
          console.log('1. Go to https://dash.cloudflare.com')
          console.log('2. Click "Add site"')
          console.log('3. Enter your domain name')
          console.log('4. Follow the setup instructions')
          console.log('5. Come back here to get the Zone ID')
          return
        }

        console.log('✅ Found zones:')
        response.result.forEach((zone, index) => {
          console.log(`\n${index + 1}. Domain: ${zone.name}`)
          console.log(`   Zone ID: ${zone.id}`)
          console.log(`   Status: ${zone.status}`)
          
          if (index === 0) {
            console.log('\n📝 To use this zone, add this to your .env file:')
            console.log(`CLOUDFLARE_ZONE_ID="${zone.id}"`)
          }
        })

      } catch (error) {
        console.log('❌ Error parsing response:', error.message)
        console.log('Raw response:', data)
      }
    })
  })

  req.on('error', (error) => {
    console.log('❌ Request error:', error.message)
  })

  req.end()
}

// Instructions for different scenarios
console.log('🚀 Evolution AI - Cloudflare Zone ID Finder\n')

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: node scripts/find-zone-id.js')
  console.log('\nThis script helps you find your Cloudflare Zone ID.')
  console.log('Make sure you have CLOUDFLARE_API_TOKEN set in your .env file.')
  process.exit(0)
}

findZoneId()