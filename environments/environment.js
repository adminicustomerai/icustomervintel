/**
 * Production environment configuration
 */

export default {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ic_visitor_management',
  port: process.env.DB_PORT || 5432,
  ograph_database: process.env.OGRAPH_DB_NAME || 'ic_visitor_management_ograph'
};

// FingerprintJS API key
export const FPJS_PRIVATE_API_KEY = process.env.FPJS_PRIVATE_API_KEY || '';
