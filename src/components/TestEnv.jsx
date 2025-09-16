import React from 'react'

function TestEnv() {
    console.log("API_KEY", import.meta.env.VITE_AIRTABLE_API_KEY)
    console.log("BASE_ID", import.meta.env.VITE_AIRTABLE_BASE_ID)
    console.log("TABLE_NAME", import.meta.env.VITE_AIRTABLE_TABLE)
}
  

export default TestEnv