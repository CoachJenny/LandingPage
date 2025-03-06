import axios from 'axios';

// Interface for HubSpot contact properties
interface HubSpotContactProperties {
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  [key: string]: any; // For custom properties
}

// Create or update a contact in HubSpot
export const createOrUpdateContact = async (properties: HubSpotContactProperties) => {
  try {
    console.log('Creating/updating HubSpot contact with properties:', properties);
    
    const response = await axios({
      method: 'POST',
      url: '/hubspot-api/crm/v3/objects/contacts',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { properties }
    });
    
    console.log('HubSpot response:', response.data);
    
    return {
      success: true,
      id: response.data.id,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating/updating HubSpot contact:', error);
    return {
      success: false,
      error
    };
  }
};

// Add a contact to a static list
export const addContactToList = async (listId: number, email: string) => {
  try {
    console.log(`Adding contact ${email} to list ${listId}`);
    
    const response = await axios({
      method: 'POST',
      url: `/hubspot-api/contacts/v1/lists/${listId}/add`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        emails: [email]
      }
    });
    
    console.log('HubSpot list addition response:', response.data);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error adding contact to HubSpot list:', error);
    return {
      success: false,
      error
    };
  }
};

// Get all lists
export const getLists = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/hubspot-api/contacts/v1/lists',
    });
    
    return {
      success: true,
      lists: response.data.lists
    };
  } catch (error) {
    console.error('Error getting HubSpot lists:', error);
    return {
      success: false,
      error
    };
  }
};

// Create a new static list
export const createList = async (name: string, dynamic: boolean = false) => {
  try {
    console.log(`Creating new ${dynamic ? 'dynamic' : 'static'} list: ${name}`);
    
    const response = await axios({
      method: 'POST',
      url: '/hubspot-api/contacts/v1/lists',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name,
        dynamic
      }
    });
    
    console.log('HubSpot list creation response:', response.data);
    
    return {
      success: true,
      listId: response.data.listId,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating HubSpot list:', error);
    return {
      success: false,
      error
    };
  }
};