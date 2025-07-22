const API_KEY = '579b464db66ec23bdd0000010aded62fdcbd408c5b4524bf8098b0a3';
const BASE_URL = 'https://api.data.gov.in/resource';

// Add a timeout helper
const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timer);
        resolve(res);
      },
      err => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
};

const healthEndpoints = {
  // Health and Wellness Centres (HWC)
  wellnessCenters: '/cc81fb9f-934d-4e0c-9b96-c5d9139f4d8e',
  // PMJAY Empanelled Health Care Facilities
  pmjayFacilities: '/a0bfb611-18e9-41b1-83c6-f59d6503d36b',
  // Jan Aushadhi Kendra (PMBJP) Stores
  pmbjpStores: '/32dd2f54-3359-4e91-90dd-195267900680',
  // AYUSH Hospitals and Beds
  ayushHospitals: '/8eede3a2-1652-49eb-bd7f-48ae3ea7a11e',
  // Health Infrastructure
  healthInfrastructure: '/bee12d81-2002-4732-a352-92a82395f7a6'
};

export const getHealthData = async (endpointKey, params = {}) => {
  try {
    const endpoint = healthEndpoints[endpointKey];
    if (!endpoint) {
      throw new Error('Invalid endpoint key');
    }

    let url = `${BASE_URL}${endpoint}?api-key=${API_KEY}&format=json`;
    
    // Add additional parameters if any
    Object.entries(params).forEach(([key, value]) => {
      if (value) {  // Only add parameter if value is not null/undefined/empty
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    console.log('API Request URL:', url);
    
    // Add timeout to the fetch request (10 seconds)
    const response = await timeout(10000, fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }));
    
    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
        console.error('API Error Response:', errorText);
      } catch (e) {
        errorText = 'No error details available';
      }
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response Data:', JSON.stringify(data, null, 2));
    
    // Some endpoints return data directly, others have a 'records' property
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.records)) {
      return data.records;
    } else if (data && data.data && Array.isArray(data.data.records)) {
      return data.data.records;
    }
    
    console.warn('Unexpected API response format:', data);
    return [];
  } catch (error) {
    console.error('Error in getHealthData:', {
      endpointKey,
      params,
      error: error.message,
      stack: error.stack
    });
    
    // Provide a more user-friendly error message
    let errorMessage = 'Failed to fetch data. ';
    if (error.message.includes('Network request failed')) {
      errorMessage += 'Please check your internet connection.';
    } else if (error.message.includes('timed out')) {
      errorMessage += 'The request timed out. Please try again.';
    } else {
      errorMessage += 'Please try again later.';
    }
    
    const customError = new Error(errorMessage);
    customError.originalError = error;
    throw customError;
  }
};

export const healthDataServices = {
  // Get wellness centers
  getWellnessCenters: async (state = 'Maharashtra', limit = 100) => {
    const params = {
      'filters[state_name]': state,
      limit: limit,
      'fields[]': ['hwc_name', 'state_name', 'district_name', 'block_name', 'pincode', 'contact_number', 'email', 'website']
    };
    return getHealthData('wellnessCenters', params);
  },

  // Get PMJAY facilities
  getPmjayFacilities: async (state = '', district = '') => {
    const params = {};
    if (state) params['filters[state]'] = state;
    if (district) params['filters[district]'] = district;
    return getHealthData('pmjayFacilities', params);
  },

  // Get PMBJP (Jan Aushadhi) stores
  getPmbjpStores: async (state = '', district = '') => {
    const params = {};
    if (state) params['filters[state]'] = state;
    if (district) params['filters[district]'] = district;
    return getHealthData('pmbjpStores', params);
  },

  // Get AYUSH hospitals
  getAyushHospitals: async (state = '', district = '') => {
    const params = {};
    if (state) params['filters[state]'] = state;
    if (district) params['filters[district]'] = district;
    return getHealthData('ayushHospitals', params);
  },
  
  // Get Health Infrastructure data
  getHealthInfrastructure: async (state = '') => {
    const params = {};
    if (state) params['filters[state]'] = state;
    return getHealthData('healthInfrastructure', params);
  }
};
