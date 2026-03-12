-- schema.sql
-- Run this in your Supabase SQL Editor to create the necessary tables.

-- Enable the uuid-ossp extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the songs table
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Add Row Level Security (RLS) policies
-- For this simple app, we'll allow anonymous read and insert for demonstration purposes.
-- If you want to secure it, consider changing these policies or adding authenticated users.
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access" ON songs
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert access" ON songs
  FOR INSERT WITH CHECK (true);
