import { type Property, getAllProperties, getPropertyById } from "@/lib/properties";

export type PropertyInput = Omit<Property, "id" | "latitude" | "longitude" | "imageUrl" | "createdAt"> & {
  imageUrl?: string;
};

const seedProperties: Property[] = [
  {
    id: "simone-karin-home",
    name: "Simone & Karin Home",
    address: "145 Cedar Lane",
    city: "San Francisco",
    state: "California",
    country: "USA",
    latitude: 37.7749,
    longitude: -122.4194,
    propertyType: "Residential",
    description: "Modern residential property with bright open spaces, a quiet courtyard, and effortless indoor-outdoor flow.",
    bedrooms: 3,
    bathrooms: 2,
    size: 2100,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-14T12:00:00.000Z",
  },
  {
    id: "harbor-view-lofts",
    name: "Harbor View Lofts",
    address: "88 Pier Avenue",
    city: "Seattle",
    state: "Washington",
    country: "USA",
    latitude: 47.6062,
    longitude: -122.3321,
    propertyType: "Residential",
    description: "A refined urban residence with panoramic water views and curated design details.",
    bedrooms: 2,
    bathrooms: 2,
    size: 1800,
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-10T09:00:00.000Z",
  },
  {
    id: "sunset-village",
    name: "Sunset Village",
    address: "22 Palm Boulevard",
    city: "Miami",
    state: "Florida",
    country: "USA",
    latitude: 25.7617,
    longitude: -80.1918,
    propertyType: "Residential",
    description: "A lush tropical residence designed for family living with expansive outdoor amenities.",
    bedrooms: 4,
    bathrooms: 3,
    size: 2600,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-01-06T16:00:00.000Z",
  },
];

let propertyStore: Property[] = [...seedProperties];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "property";
}

function geocodeAddress(address: string, city: string, state: string, country: string) {
  const raw = `${address}${city}${state}${country}`;
  let hash = 0;

  for (let index = 0; index < raw.length; index += 1) {
    hash = raw.charCodeAt(index) + ((hash << 5) - hash);
  }

  const mod = (value: number) => Math.abs(hash % value);

  const latitude = 34 + mod(1400) / 100;
  const longitude = -125 - mod(1500) / 100;

  return {
    latitude: Number(latitude.toFixed(4)),
    longitude: Number(longitude.toFixed(4)),
  };
}

export function getAllProperties() {
  return propertyStore;
}

export function getPropertyById(id: string) {
  return propertyStore.find((property) => property.id === id);
}

export function createProperty(input: PropertyInput): Property {
  const normalized = {
    name: input.name.trim(),
    address: input.address.trim(),
    city: input.city.trim(),
    state: input.state.trim(),
    country: input.country.trim(),
    propertyType: input.propertyType || "Residential",
    description: input.description.trim(),
    bedrooms: Number(input.bedrooms) || 0,
    bathrooms: Number(input.bathrooms) || 0,
    size: Number(input.size) || 0,
  };

  if (!normalized.name || !normalized.address || !normalized.city || !normalized.state || !normalized.country) {
    throw new Error("Name, address, city, state, and country are required.");
  }

  const coordinates = geocodeAddress(normalized.address, normalized.city, normalized.state, normalized.country);
  const id = `${slugify(normalized.name)}-${Math.random().toString(36).slice(2, 8)}`;

  const property: Property = {
    id,
    name: normalized.name,
    address: normalized.address,
    city: normalized.city,
    state: normalized.state,
    country: normalized.country,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    propertyType: normalized.propertyType,
    description: normalized.description,
    bedrooms: normalized.bedrooms,
    bathrooms: normalized.bathrooms,
    size: normalized.size,
    imageUrl: input.imageUrl || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  };

  propertyStore = [property, ...propertyStore];
  return property;
}
