# Guide to Setting Up HubSpot Integration

This guide will walk you through the process of connecting your coaching website to HubSpot CRM.

## Current Setup

Your website is now configured to work with HubSpot using the API key you provided:

```
pat-na1-dc9c69e5-2f6c-4a6f-932e-ccdf7a4bb667
```

The integration is now in "live mode" which means:
- All form submissions will be sent to your HubSpot account
- Contacts will be created in your HubSpot CRM
- Quiz responses will be stored as custom properties

## Setting Up HubSpot Lists

To organize leads from your quiz and contact forms, you should create static lists in HubSpot:

1. **Create a static list for Quiz Leads**
   - Go to Contacts > Lists
   - Click "Create list"
   - Choose "Static list"
   - Name it "Quiz Leads"
   - Save the list

2. **Create a static list for Contact Form Leads**
   - Follow the same steps but name it "Website Contact Form Leads"

3. **Get the List IDs**
   - After creating each list, the ID will be in the URL
   - Example: `https://app.hubspot.com/contacts/{portal-id}/lists/{list-id}/`
   - Copy the `{list-id}` number for each list

4. **Update the CRM integration**
   - Open `src/lib/crm.ts`
   - Find the line with `"listId": 1,` (around line 79)
   - Replace `1` with your actual list ID for the Quiz Leads list

## Creating Custom Properties in HubSpot

To properly store quiz responses and other custom data, create these custom properties in HubSpot:

1. **Go to Settings > Properties**

2. **Create a "quiz_responses" property**
   - Click "Create property"
   - Group: Contact information
   - Label: Quiz Responses
   - Field type: Multi-line text
   - Description: Responses from the website quiz

3. **Create a "recommended_offer" property**
   - Click "Create property"
   - Group: Contact information
   - Label: Recommended Offer
   - Field type: Single-line text
   - Description: Recommended coaching offer based on quiz results

4. **Create a "source" property** (if it doesn't already exist)
   - Click "Create property"
   - Group: Contact information
   - Label: Source
   - Field type: Single-line text
   - Description: Source of the contact (Quiz, Contact Form, etc.)

## Testing the Integration

After setting up your HubSpot integration:

1. **Submit a test form**
   - Fill out the contact form or quiz on your website
   - Submit the form

2. **Check HubSpot**
   - Log in to HubSpot
   - Go to Contacts
   - You should see the new contact with all the information submitted
   - Check that the custom properties are populated correctly

## Creating a Workflow for Follow-up

To automatically follow up with new leads:

1. **Go to Automation > Workflows**

2. **Create a new workflow**
   - Click "Create workflow"
   - Choose "Start from scratch"
   - Select "Contact-based" workflow

3. **Set enrollment triggers**
   - Choose "List membership" as the trigger
   - Select your "Quiz Leads" list

4. **Add actions**
   - Add an email action to send a follow-up email
   - Add a task action to remind you to call the lead
   - Add a delay action before sending additional follow-ups

5. **Activate the workflow**
   - Review your workflow
   - Click "Turn on" to activate it

## Troubleshooting

If you encounter issues:

1. **Check the browser console**
   - Open your browser's developer tools (F12)
   - Look for any error messages in the console

2. **Verify API key**
   - Make sure your API key is correctly copied to the .env file
   - There should be no spaces or extra characters

3. **Check HubSpot API limits**
   - HubSpot has API rate limits that may affect your integration
   - For high-volume sites, consider implementing a queue system

4. **Test with mock mode**
   - If needed, you can switch back to mock mode by setting `VITE_USE_MOCK_CRM=true` in your .env file

## Need More Help?

If you need additional assistance:

1. **HubSpot Developer Documentation**
   - Visit [developers.hubspot.com](https://developers.hubspot.com/)

2. **Contact HubSpot Support**
   - Available through your HubSpot account