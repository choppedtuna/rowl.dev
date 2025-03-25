import { NextResponse } from "next/server";

// Simple in-memory cache with expiration
const cache = new Map();
const CACHE_TTL = 30; // 1 hour cache time

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameIds = searchParams.get("gameIds");
  
  if (!gameIds) {
    return NextResponse.json({ error: "Missing gameIds parameter" }, { status: 400 });
  }
  
  // Check cache first
  const cacheKey = `games-${gameIds}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData && cachedData.expiry > Date.now()) {
    console.log(`Using cached data for gameIds: ${gameIds}`);
    return NextResponse.json(cachedData.data);
  }
  
  try {
    // First, convert gameIds to universeIds using Roblox API
    const gameArray = gameIds.split(',');
    const universeIds = [];
    
    // Process each gameId to get its universeId
    for (const gameId of gameArray) {
      // Check for cached universeId
      const universeIdCacheKey = `universe-${gameId}`;
      const cachedUniverseId = cache.get(universeIdCacheKey);
      
      if (cachedUniverseId && cachedUniverseId.expiry > Date.now()) {
        universeIds.push(cachedUniverseId.data);
        continue;
      }
      
      // Add delay between requests to avoid rate limiting
      if (universeIds.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const universeResponse = await fetch(`https://apis.roblox.com/universes/v1/places/${gameId}/universe`);
      
      if (universeResponse.ok) {
        const universeData = await universeResponse.json();
        universeIds.push(universeData.universeId);
        
        // Cache the universeId
        cache.set(universeIdCacheKey, {
          data: universeData.universeId,
          expiry: Date.now() + CACHE_TTL
        });
      } else {
        console.error(`Failed to get universeId for gameId ${gameId}`);
      }
    }
    
    if (universeIds.length === 0) {
      return NextResponse.json({ error: "Failed to retrieve any valid universeIds" }, { status: 404 });
    }
    
    const universeIdsParam = universeIds.join(',');
    
    // Fetch game details from Roblox API
    const detailsResponse = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIdsParam}`);
    const detailsData = await detailsResponse.json();
    
    // Fetch thumbnails from Roblox API
    const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIdsParam}&size=512x512&format=Png`);
    const thumbnailData = await thumbnailResponse.json();
    
    // Combine the data
    const responseData = {
      details: detailsData,
      thumbnails: thumbnailData
    };
    
    // Cache the response
    cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + CACHE_TTL
    });
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching from Roblox API:", error);
    return NextResponse.json({ error: "Failed to fetch data from Roblox API" }, { status: 500 });
  }
} 