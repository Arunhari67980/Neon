-- Categories (Planets)
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  color text not null,
  orbit_radius float not null,
  rotation_speed float not null
);

-- Tasks (Orbiting Objects)
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete cascade,
  title text not null,
  completed boolean default false,
  daily_streak int default 0,
  created_at timestamp with time zone default now()
);

-- Sample Data
insert into categories (name, color, orbit_radius, rotation_speed) values
('Health', '#4ade80', 5, 0.5),
('Career', '#60a5fa', 8, 0.3),
('Personal', '#f472b6', 12, 0.2);
