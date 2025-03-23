import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameIds = searchParams.get("gameIds");
  
  if (!gameIds) {
    return NextResponse.json({ error: "Missing gameIds parameter" }, { status: 400 });
  }
  
  try {
    // First, convert gameIds to universeIds using Roblox API
    const gameArray = gameIds.split(',');
    const universeIds = [];
    
    // Process each gameId to get its universeId
    for (const gameId of gameArray) {
      const universeResponse = await fetch(`https://apis.roblox.com/universes/v1/places/${gameId}/universe`);
      
      if (universeResponse.ok) {
        const universeData = await universeResponse.json();
        universeIds.push(universeData.universeId);
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
    return NextResponse.json({
      details: detailsData,
      thumbnails: thumbnailData
    });
  } catch (error) {
    console.error("Error fetching from Roblox API:", error);
    return NextResponse.json({ error: "Failed to fetch data from Roblox API" }, { status: 500 });
  }
} 