import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universeIds = searchParams.get("universeIds");
  
  if (!universeIds) {
    return NextResponse.json({ error: "Missing universeIds parameter" }, { status: 400 });
  }
  
  try {
    // Fetch game details from Roblox API
    const detailsResponse = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`);
    const detailsData = await detailsResponse.json();
    
    // Fetch thumbnails from Roblox API
    const thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=512x512&format=Png`);
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