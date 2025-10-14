-- Create Report and Organization Management System
--
-- This migration creates a comprehensive system for managing reports of violence 
-- against women and children with organization registration and case tracking.
--
-- Tables:
-- 1. organizations - Organizations that handle reports (police, govt, NGO)
-- 2. reports - Individual case reports with full tracking
-- 3. report_progress - Progress timeline for each report
--
-- Security: RLS enabled on all tables with appropriate policies

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_bangla text NOT NULL,
  type text NOT NULL CHECK (type IN ('police', 'govt', 'ngo')),
  contact_number text NOT NULL,
  alternative_contact text,
  email text,
  address text NOT NULL,
  district text NOT NULL,
  service_areas text[] DEFAULT '{}',
  representative_name text,
  representative_contact text,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_number text UNIQUE NOT NULL,
  reporter_name text NOT NULL,
  reporter_contact text NOT NULL,
  reporter_email text,
  victim_name text,
  victim_age integer,
  incident_type text NOT NULL,
  incident_description text NOT NULL,
  incident_date date NOT NULL,
  incident_location text NOT NULL,
  district text NOT NULL,
  assigned_organization_id uuid REFERENCES organizations(id),
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'received', 'investigating', 'action_taken', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create report_progress table
CREATE TABLE IF NOT EXISTS report_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  status text NOT NULL,
  description text NOT NULL,
  updated_by text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_district ON reports(district);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_report_progress_report_id ON report_progress(report_id);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_district ON organizations(district);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Organizations are viewable by everyone"
  ON organizations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update organizations"
  ON organizations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for reports
CREATE POLICY "Reports are viewable by everyone"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create reports"
  ON reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for report_progress
CREATE POLICY "Report progress is viewable by everyone"
  ON report_progress FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create progress entries"
  ON report_progress FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to generate report number
CREATE OR REPLACE FUNCTION generate_report_number()
RETURNS text AS $$
DECLARE
  new_number text;
  date_part text;
  sequence_part text;
  counter integer;
BEGIN
  date_part := to_char(now(), 'YYYYMMDD');
  
  SELECT COUNT(*) + 1 INTO counter
  FROM reports
  WHERE report_number LIKE 'RPT-' || date_part || '-%';
  
  sequence_part := lpad(counter::text, 4, '0');
  new_number := 'RPT-' || date_part || '-' || sequence_part;
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate report number
CREATE OR REPLACE FUNCTION set_report_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.report_number IS NULL OR NEW.report_number = '' THEN
    NEW.report_number := generate_report_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_report_number
  BEFORE INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION set_report_number();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reports_timestamp
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_organizations_timestamp
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();