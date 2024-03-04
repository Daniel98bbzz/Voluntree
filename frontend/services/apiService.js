import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/opportunities';

async function getOpportunities() {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }
}

async function getSupply(supplyName) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${supplyName}`);
    return response.data;
  } catch (error) {        
    console.error('Error fetching supply:', error);
    throw error;
  }
}

async function addSupply(newSupply) {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, newSupply);
    return response.data;
  } catch (error) {
    console.error('Error adding new supply:', error);
    throw error;
  }
}

async function updateSupply(supplyName, updatedSupply) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${supplyName}`, updatedSupply);
    return response.data;
  } catch (error) {
    console.error('Error updating supply:', error);
    throw error;
  }
}

async function deleteSupply(supplyName) {
  try {
    await axios.delete(`${API_BASE_URL}/${supplyName}`);
  } catch (error) {
    console.error('Error deleting supply:', error);
    throw error;
  }
}

export { getOpportunities, getSupply, addSupply, updateSupply, deleteSupply };
