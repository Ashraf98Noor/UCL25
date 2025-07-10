import Papa from 'papaparse';
import { Player } from '../types/player';

export const loadCSVData = async (): Promise<Player[]> => {
  try {
    console.log('Attempting to fetch CSV data...');
    const response = await fetch(process.env.PUBLIC_URL + '/UCL_24_25_Key_Data - Sheet1.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV data: ${response.status} ${response.statusText}`);
    }
    const csvText = await response.text();
    console.log('CSV data fetched successfully, parsing...');
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transform: (value: string, field: string) => {
          // Convert numeric fields
          const numericFields = [
            'Born', 'MP', 'Starts', 'Min', '90s', 'Gls', 'Ast', 'G+A', 'G-PK', 
            'PK', 'PKatt', 'CrdY', 'CrdR', 'xG', 'npxG', 'xAG', 'npxG+xAG',
            'PrgC', 'PrgP', 'PrgR', 'Gls.1', 'Ast.1', 'G+A.1', 'G-PK.1',
            'G+A-PK', 'xG.1', 'xAG.1', 'xG+xAG', 'npxG.1', 'npxG+xAG.1'
          ] as string[];
          
          if (numericFields.includes(field)) {
            // Remove commas from numbers like "1,222"
            const cleanValue = value.replace(/,/g, '');
            const num = parseFloat(cleanValue);
            return isNaN(num) ? 0 : num;
          }
          
          return value;
        },
        complete: (results: Papa.ParseResult<Player>) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            reject(new Error('Failed to parse CSV data'));
            return;
          }
          resolve(results.data);
        },
        error: (error: Error) => {
          console.error('CSV parsing error:', error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
}; 